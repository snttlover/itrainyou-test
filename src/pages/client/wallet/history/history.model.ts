import { getClientTransactionsList, Transaction } from "@/lib/api/wallet/client/get-list-transactions"
import { date } from "@/lib/formatting/date"
import WalletTransactionImage from "@/pages/client/wallet/history/images/wallet.svg"
import { createGate } from "@/scope"
import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-root"

export const WalletHistoryPageGate = createGate()

export const loadTransactionsFx = createEffect({
  handler: ({ page }: { page: number }) => getClientTransactionsList({ page, pageSize: 10 }),
})

export const $transactionsCount = createStore<number>(100)
  .on(loadTransactionsFx.doneData, (state, payload) => payload.count)
  .reset(WalletHistoryPageGate.open)

export const $transactions = createStore<Transaction[]>([])
  .on(loadTransactionsFx.doneData, (state, payload) => [...state, ...payload.results])
  .reset(WalletHistoryPageGate.open)

const $isTransactionsLoadFailed = createStore(false)
  .on(loadTransactionsFx.fail, () => true)
  .reset(WalletHistoryPageGate.open)

export const $isHasMoreProfileSessions = combine(
  { count: $transactionsCount, ProfileSessions: $transactions, isFailed: $isTransactionsLoadFailed },
  ({ count, ProfileSessions, isFailed }) => {
    return !isFailed && count !== ProfileSessions.length
  }
)

export const loadMoreTransactions = createEvent()

const guardedTransactionsLoadMore = guard({
  source: loadMoreTransactions,
  filter: loadTransactionsFx.pending.map(pending => !pending),
})

const $participantsCurrentPage = createStore(0)
  .on(loadTransactionsFx.done, (_, payload) => payload.params.page)
  .reset(WalletHistoryPageGate.open)

sample({
  source: $participantsCurrentPage,
  clock: guardedTransactionsLoadMore,
  fn: source => ({ page: source + 1 }),
  target: loadTransactionsFx,
})

export const $transactionsList = $transactions.map(transactions =>
  transactions.map(transaction => {
    const session = transaction.session

    let price = transaction.amount

    if (transaction.type === "TOP_UP" || transaction.type === "TRANSFER_TO_CLIENT_WALLET") price = `+${price}`
    else price = `${price}`

    let name = "Пополнение кошелька"
    if (transaction.type === "TRANSFER_TO_CLIENT_WALLET") name = "Перевод с кошелька коуча"
    else if (session) name = `${session.coach.firstName} ${session.coach.lastName}`

    let avatar = null
    if (transaction.type === "TOP_UP" || transaction.type === "TRANSFER_TO_CLIENT_WALLET") {
      avatar = WalletTransactionImage
    } else if (session?.coach.avatar) {
      avatar = session.coach.avatar
    }

    return {
      avatar: avatar,
      name: name,
      price: price,
      time: date(transaction.creationDatetime).format("HH:mm"),
      date: date(transaction.creationDatetime).format("DD.MM.YYYY"),
      isCanceled: transaction.type === "SESSION_CANCELLATION",
    }
  })
)

forward({
  from: WalletHistoryPageGate.open,
  to: loadMoreTransactions,
})
