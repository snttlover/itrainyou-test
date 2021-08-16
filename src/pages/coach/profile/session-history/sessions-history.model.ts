import { getMyTransactionsCoach, SessionTransaction } from "@/lib/api/transactions/client/list-transaction"
import { date } from "@/lib/formatting/date"
import { createGate } from "@/scope"
import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-root"

export const SessionsHistoryGate = createGate()

export const loadProfileSessionsFx = createEffect({
  handler: ({ page }: { page: number }) => getMyTransactionsCoach({ page, pageSize: 15 }),
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

    let price = transaction.amount

    if (+price < 1) price = `${+price}`
    else price = `+${+price}`

    let name = "Пополнение кошелька"

    if (transaction.enrolledClient) {
      name = `${transaction.enrolledClient.firstName} ${transaction.enrolledClient.lastName}`
    } else if (transaction.type === "SESSION_CANCELLATION") {
      name = "Сессия отменена"
    }

    let avatar = null
    if (transaction.enrolledClient?.avatar) {
      avatar = transaction.enrolledClient?.avatar
    }

    return {
      avatar: avatar,
      name: name,
      price: price,
      time: date(session.startDatetime).format("HH:mm"),
      date: date(session.startDatetime).format("DD.MM.YYYY"),
      status: transaction.status,
    }
  })
)

forward({
  from: SessionsHistoryGate.open,
  to: loadMoreProfileSessions,
})
