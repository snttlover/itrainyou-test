import { createEffect, createEvent, createStore, forward, Event, sample, combine, restore, guard } from "effector-root"
import { SessionInfo } from "@/lib/api/coach/get-session"
import { date } from "@/lib/formatting/date"
import { AxiosError } from "axios"
import { SessionRequestParams } from "@/lib/api/coach/create-session-request"
import { SessionRequest } from "@/lib/api/coach/get-sessions-requests"
import { toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"

const durations = {
  D30: "30мин",
  D45: "45мин",
  D60: "60мин",
  D90: "90мин",
}

type CreateSessionInfoModuleConfig = {
  type: "coach" | "client"
  fetchSession: (id: number) => Promise<SessionInfo>
  writeToUser: Event<number | null>
  createSessionRequest: (params: SessionRequestParams) => Promise<SessionRequest>
}

export const createSessionInfoModule = (config: CreateSessionInfoModuleConfig) => {
  const reset = createEvent()

  const cancelSession = createEvent()
  const cancelSessionFx = createEffect({
    handler: (session: number) =>
      config.createSessionRequest({
        type: "CANCEL",
        session,
      }),
  })

  const loadSessionFx = createEffect({
    handler: config.fetchSession,
  })

  guard({
    source: loadSessionFx.failData.map((error: any) => error?.response.data.corresponding_coach_chat),
    filter: (id) => !!id,
    target: navigatePush.prepend((id: number) => ({ url: routeNames.clientChat(id.toString()) }))
  })

  const $notFound = createStore<boolean>(false)
    .on(loadSessionFx.failData, (_, error) => (error as AxiosError)?.response?.status === 404)
    .reset(reset)

  const $session = createStore<SessionInfo | null>(null)
    .on(loadSessionFx.doneData, (_, session) => session)
    .reset(reset)

  const loadSession = createEvent<number>()

  const $info = $session.map(session => {
    const user = config.type === "client" ? session?.coach : session?.clients[0]

    return {
      id: session?.id,
      dashboardType: config.type,
      userId: user?.id || null,
      userAvatar: user?.avatar || null,
      userName: `${user?.firstName} ${user?.lastName}`,
      userLink: config.type === "coach" ? routeNames.coachClientProfile(`${user?.id}`) : routeNames.searchCoachPage(`${user?.id}`),
      rating: user?.rating ? (user?.rating).toString().replace(/\./gm, ",") : null,
      sessionsCount: 0,

      duration: durations[session?.durationType || "D30"],
      cost: session?.clientPrice || 0,
      date: date(session?.startDatetime).format("DD MMM в HH:mm"),
      isOver: date().isAfter(date(session?.startDatetime)),

      sessionStartDatetime: session?.startDatetime,
      hasUser: !!user,
    }
  })

  const $coach = $session.map(session => session?.coach)

  forward({
    from: loadSession,
    to: loadSessionFx,
  })

  sample({
    source: $session.map(session => session?.id || 0),
    clock: cancelSessionFx.doneData,
    target: loadSession,
  })

  sample({
    source: $session.map(session => session?.id || 0),
    clock: cancelSession,
    target: cancelSessionFx,
  })

  const successCancelFx = createEffect({
    handler: () =>
      toasts.add({
        type: "info",
        text: "Запрос на отмену сессии успешно отправлен",
      }),
  })
    
  const failureCancelFx = createEffect({
    handler: () =>
      toasts.add({
        type: "error",
        text: "Запрос на отмену сессии не отправлен",
      }),
  })

  const changeCancelVisibility = createEvent<boolean>()
  const $showCancelButton = restore(changeCancelVisibility, true).reset(reset)
    
  forward({
    from: cancelSessionFx.failData,
    to: failureCancelFx,
  })
    
  forward({
    from: cancelSessionFx.done,
    to: [successCancelFx, changeCancelVisibility.prepend(() => false)],
  })

  const $cancelVisibility = combine(
    $showCancelButton,
    $session,
    (visibility, session) => visibility && date(session?.endDatetime).isAfter(date())
  )

  return {
    data: {
      $session,
      $info,
      isFetching: combine(loadSessionFx.pending, cancelSessionFx.pending, (load, cancel) => load || cancel),
      $notFound,
      $cancelButtonVisibility: $cancelVisibility,
      $coach,
    },
    methods: {
      loadSession,
      reset,
      write: config.writeToUser,
      cancelSession,
    },
    events: {
      sessionLoaded: loadSessionFx.doneData,
      sessionCanceled: cancelSessionFx.doneData,
      sessionNotCanceled: cancelSessionFx.failData,
    },
  }
}
