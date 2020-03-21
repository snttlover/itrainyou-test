import { CoachSession, getCoachSessions } from "@/application/lib/api/coach-sessions"
import { appDomain } from "@/application/store"
import { forward } from "effector"

export const genCoachSessions = (id: number) => {
  const coachSession = appDomain.createDomain()

  const fetchCoachSessionsListFx = coachSession.createEffect<void, CoachSession[]>().use(() => getCoachSessions(id, {}))

  const loadCoachSessions = coachSession.createEvent()

  const $coachSessionsList = coachSession
    .createStore<CoachSession[]>([])
    .on(fetchCoachSessionsListFx.done, (state, payload) => payload.result)

  forward({
    from: loadCoachSessions,
    to: fetchCoachSessionsListFx
  })

  return {
    store: $coachSessionsList,
    loadData: loadCoachSessions
  }
}
