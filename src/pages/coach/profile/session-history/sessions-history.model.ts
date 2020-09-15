import { getMyTransactionsCoach, SessionTransaction } from "@/lib/api/transactions/client/list-transaction"
import { date } from "@/lib/formatting/date"
import { createGate } from "@/scope"
import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-root"

export const SessionsHistoryGate = createGate()

export const loadProfileSessionsFx = createEffect({
  handler: ({ page }: { page: number }) => getMyTransactionsCoach({ page, pageSize: 5 }),
})

export const $ProfileSessionsCount = createStore<number>(100)
  .on(loadProfileSessionsFx.doneData, (state, payload) => payload.count)
  .reset(SessionsHistoryGate.open)

export const $ProfileSessions = createStore<SessionTransaction[]>([])
  .on(loadProfileSessionsFx.doneData, (state, payload) => [...state, ...payload.results])
  .reset(SessionsHistoryGate.open)

const $ProfileSessionsLoadFailed = createStore(false)
  .on(loadProfileSessionsFx.fail, () => true)
  .reset(SessionsHistoryGate.open)

export const $isHasMoreProfileSessions = combine(
  { count: $ProfileSessionsCount, ProfileSessions: $ProfileSessions, isFailed: $ProfileSessionsLoadFailed },
  ({ count, ProfileSessions, isFailed }) => {
    return !isFailed && count !== ProfileSessions.length
  }
)

export const loadMoreProfileSessions = createEvent()

const guardedProfileSessionsLoadMore = guard({
  source: loadMoreProfileSessions,
  filter: loadProfileSessionsFx.pending.map(pending => !pending),
})

const $participantsCurrentPage = createStore(0)
  .on(loadProfileSessionsFx.done, (_, payload) => payload.params.page)
  .reset(SessionsHistoryGate.open)

sample({
  source: $participantsCurrentPage,
  clock: guardedProfileSessionsLoadMore,
  fn: source => ({ page: source + 1 }),
  target: loadProfileSessionsFx,
})

export const $profilePageSessions = $ProfileSessions.map(transactions =>
  transactions.map(transaction => {
    const session = transaction.session
    return {
      avatar: session.coach.avatar,
      name: `${session.coach.firstName} ${session.coach.lastName}`,
      price: `${+session.clientPrice > 0 && transaction.type !== `SESSION_CANCELLATION` ? `+` : `-`} ${
        session.clientPrice
      }`,
      time: date(session.startDatetime).format(`HH:mm`),
      date: date(session.startDatetime).format(`DD.MM.YYYY`),
      isCanceled: transaction.type === `SESSION_CANCELLATION`,
    }
  })
)

forward({
  from: SessionsHistoryGate.open,
  to: loadMoreProfileSessions,
})
