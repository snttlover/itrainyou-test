import { getMyClient, ClientSelfData } from "@/application/lib/api/client/clientInfo"
import dayjs from "dayjs"
import { combine, createEffect, createEvent, createStore, forward, sample } from "effector"
import { $categoriesList, fetchCategoriesListFx } from "@/application/feature/categories/categories.store"
import { getMyTransactions, SessionTransaction } from "@/application/lib/api/transactions/client/list-transaction"
import { UpdateClientRequest, updateMyClient } from "@/application/lib/api/client/update"
import { Toast, toasts } from "@/application/components/layouts/behaviors/dashboards/common/toasts/toasts"

export const loadProfileFx = createEffect({
  handler: getMyClient,
})

export const mounted = createEvent()

export const toggleInterestCategory = createEvent<number>()

const updateProfile = createEffect<UpdateClientRequest, ClientSelfData>({
  handler: updateMyClient,
})

const successToast: Toast = {
  type: `info`,
  text: `Данные сохранены`,
}

const profileIsSaved = createEffect({
  handler: () => {
    toasts.remove(successToast)
    toasts.add(successToast)
  },
})

forward({
  from: updateProfile.doneData,
  to: profileIsSaved,
})

const $profile = createStore<ClientSelfData | null>(null).on(
  [loadProfileFx.doneData, updateProfile.doneData],
  (state, payload) => payload
)

sample({
  clock: toggleInterestCategory,
  source: { profile: $profile },
  target: updateProfile,
  fn: ({ profile }, categoryId) => {
    let categories = profile ? profile.categories.map(category => category.id) : []

    if (categories.includes(categoryId)) {
      categories = categories.filter(id => id !== categoryId)
    } else {
      categories.push(categoryId)
    }

    return {
      ...(profile as ClientSelfData),
      categories,
    }
  },
})

export const $pageProfile = $profile.map(profile => ({
  ...(profile as ClientSelfData),
  avatar: profile?.avatar || null,
  age: dayjs(+new Date())
    .subtract(dayjs(profile?.birthDate).get("year"), "year")
    .get(`year`),
}))

export const $profileCategories = combine($categoriesList, $profile, (categories, profile) =>
  categories.map(category => ({
    ...category,
    selected: !!(profile?.categories || [])?.find(profileCategory => profileCategory.id === category.id),
  }))
)

export const loadProfileTransactionsFx = createEffect({
  handler: getMyTransactions,
})

const $sessionsTransactions = createStore<SessionTransaction[]>([]).on(
  loadProfileTransactionsFx.done,
  (state, payload) => payload.result
)

export const $profilePageSessions = $sessionsTransactions.map(transactions =>
  transactions.map(transaction => {
    const session = transaction.session
    return {
      avatar: session.coach.avatar,
      name: `${session.coach.firstName} ${session.coach.lastName}`,
      price: `${+session.clientPrice > 0 ? `+` : `-`} ${session.clientPrice}`,
      time: dayjs(session.startDatetime).format(`hh:mm`),
      date: dayjs(session.startDatetime).format(`DD.MM.YYYY`),
      isCanceled: transaction.type === `SESSION_CANCELLATION`,
    }
  })
)

export const $profilePageSessionsCount = $profilePageSessions.map(sessions => !!sessions.length)

export const $profilePageLoading = combine(
  $profile,
  loadProfileFx.pending,
  fetchCategoriesListFx.pending,
  $profilePageSessionsCount,
  loadProfileTransactionsFx.pending,
  (profile, profileLoading, categoriesLoading, sessionsCount, loadSessions) =>
    !profile || profileLoading || categoriesLoading || (loadSessions && !sessionsCount)
)

forward({
  from: mounted,
  to: [fetchCategoriesListFx, loadProfileFx, loadProfileTransactionsFx],
})
