import { getMyClient, Client } from "@/application/lib/api/client"
import dayjs from "dayjs"
import { combine, createEffect, createEvent, createStore, forward } from "effector-next"
import { $categoriesList, fetchCategoriesListFx } from "@/application/feature/categories/categories.store"
import { getMyTransactions, SessionTransaction } from "@/application/lib/api/transactions/client/list-transaction"

export const loadProfileFx = createEffect({
  handler: getMyClient,
})

export const mounted = createEvent()

const $profile = createStore<Partial<Client>>({}).on(loadProfileFx.doneData, (state, payload) => payload)

export const $pageProfile = $profile.map(profile => ({
  ...profile,
  avatar: profile.avatar || null,
  age: dayjs(+new Date())
    .subtract(dayjs(profile?.birthDate).get("year"), "year")
    .get(`year`),
}))

export const $profileCategories = combine($categoriesList, $profile, (categories, profile) =>
  categories.map(category => ({
    ...category,
    selected: !!profile.categories?.find(profileCategory => profileCategory.id === category.id),
  }))
)

export const loadProfileTransactionsFx = createEffect({
  handler: getMyTransactions,
})

const $sessionsTransactions = createStore<SessionTransaction[]>([]).on(
  loadProfileTransactionsFx.done,
  (state, payload) => payload.result
)

export const $profilePageSessions = $sessionsTransactions.map(transactions => transactions.map(transaction => {
  const session = transaction.session
  return {
    avatar: session.coach.avatar,
    name: `${session.coach.firstName} ${session.coach.lastName}`,
    price: `${+session.clientPrice > 0 ? `+` : `-`} ${session.clientPrice}`,
    time: dayjs(session.startDatetime).format(`hh:mm`),
    date: dayjs(session.startDatetime).format(`DD.MM.YYYY`),
    isCanceled: transaction.type === `SESSION_CANCELLATION`
  }
}))

forward({
  from: mounted,
  to: [fetchCategoriesListFx, loadProfileFx, loadProfileTransactionsFx],
})
