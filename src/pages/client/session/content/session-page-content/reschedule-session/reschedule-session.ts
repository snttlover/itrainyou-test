import { combine, createEffect, createEvent, forward, restore, sample } from "effector-root"
import { Coach, getCoach } from "@/lib/api/coach"
import { clientSessionPage } from "@/pages/client/session/client-session-page"
import { CoachSession, DurationType, getCoachSessions } from "@/lib/api/coach-sessions"
import { date } from "@/lib/formatting/date"
import { createClientSessionRequest } from "@/lib/api/client/create-client-session-request"
import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"

export const resetRescheduleDialog = createEvent()

const loadCoachFx = createEffect({
  handler: getCoach,
})

const changeCoach = createEvent<Coach | null>()
export const $rescheduleCoach = restore<Coach | null>(changeCoach, null)
  .on(loadCoachFx.doneData, (_, coach) => coach)
  .reset(resetRescheduleDialog)

forward({
  from: clientSessionPage.modules.sessionInfo.events.sessionLoaded.map(session => ({ id: session.coach.id })),
  to: loadCoachFx,
})

const loadCoachSessionsFx = createEffect({
  handler: ({ id, durationType }: { id: number; durationType: DurationType }) =>
    getCoachSessions(id, { duration_type: durationType }),
})

const changeRescheduleSessions = createEvent<CoachSession[]>()
const $sessions = restore<CoachSession[]>(changeRescheduleSessions, [])
  .on(loadCoachSessionsFx.doneData, (_, sessions) => sessions)
  .reset(resetRescheduleDialog)

export const changeRescheduleDate = createEvent<Date | null>()
export const $rescheduleDate = restore(changeRescheduleDate, null).reset(resetRescheduleDialog)

export const $rescheduleSessionsDates = combine(
  $sessions,
  clientSessionPage.modules.sessionInfo.data.$info,
  (sessions, info) => {
    return sessions.filter(session => session.id !== info.id).map(session => session.startDatetime)
  }
)

const dateFormatter = "DDMMYYYY"

export const changePickedRescheduleSession = createEvent<number>()
export const $pickedRescheduleSession = restore(changePickedRescheduleSession, 0).reset(resetRescheduleDialog)

export const $rescheduleSelectedSessions = combine(
  $rescheduleDate,
  $sessions,
  $pickedRescheduleSession,
  (day, sessions, pickedId) => {
    return sessions
      .filter(session => !!day && date(session.startDatetime).format(dateFormatter) === date(day).format(dateFormatter))
      .map(session => ({
        time: date(session.startDatetime).format("HH:mm"),
        id: session.id,
        active: pickedId === session.id,
      }))
  }
)

export const $formattedPickedRescheduleSession = combine($sessions, $pickedRescheduleSession, (sessions, pickedId) => {
  const session = sessions.find(session => session.id === pickedId)

  if (session) {
    return {
      date: date(session.startDatetime).format("DD.MM.YY"),
      time: date(session.startDatetime).format("HH:mm"),
    }
  }

  return session
})

export const changeRescheduleVisibility = createEvent<boolean>()
export const $rescheduleVisibility = restore(changeRescheduleVisibility, false).reset(resetRescheduleDialog)

export const rescheduleSessionFx = createEffect({
  handler: createClientSessionRequest,
})
export const rescheduleSession = createEvent()

sample({
  // @ts-ignore
  source: combine(
    $pickedRescheduleSession,
    clientSessionPage.modules.sessionInfo.data.$info,
    (pickedSession, currentSession) => ({
      type: "RESCHEDULE",
      session: currentSession.id,
      rescheduleSession: pickedSession,
    })
  ),
  clock: rescheduleSession,
  target: rescheduleSessionFx,
})

forward({
  from: rescheduleSessionFx.doneData.map(() => {}),
  to: resetRescheduleDialog,
})

// @ts-ignore
clientSessionPage.modules.sessionInfo.data.$session.on(rescheduleSessionFx.doneData, session => ({
  ...session,
  hasAwaitingRescheduleRequests: true,
}))

const successToast: Toast = { type: "info", text: "Запрос на перенос сессии отправлен" }
forward({
  from: rescheduleSessionFx.doneData,
  to: [toasts.remove.prepend(() => successToast), toasts.add.prepend(() => successToast)],
})

const errorToast: Toast = { type: "info", text: "Запрос на перенос сессии не отправлен, попробуйте позже" }
forward({
  from: rescheduleSessionFx.failData,
  to: [toasts.remove.prepend(() => errorToast), toasts.add.prepend(() => errorToast)],
})

forward({
  from: clientSessionPage.modules.sessionInfo.events.sessionLoaded.map(session => ({
    id: session.coach.id,
    durationType: session.durationType,
  })),
  to: loadCoachSessionsFx,
})

export const $rescheduleInitLoading = combine(loadCoachSessionsFx.pending, loadCoachFx.pending, (s, c) => s || c)
