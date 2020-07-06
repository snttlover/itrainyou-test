import { getCoachSessions } from "@/lib/api/coach-sessions"
import { createEffect } from "effector-root"

type LoadSessionsParams = {
  from: string
  to: string
}

export const loadSessionsFx = createEffect({
  handler: ({ from, to }: LoadSessionsParams) => getCoachSessions("me", { start_date__gte: from, start_date__lte: to }),
})
