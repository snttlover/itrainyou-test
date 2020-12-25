import { ClientSelfData, getMyClient } from "@/lib/api/client/clientInfo"
import { date } from "@/lib/formatting/date"
import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-root"
import { $categoriesList, fetchCategoriesList, fetchCategoriesListFx } from "@/feature/categories/categories.store"
import { getMyTransactions, SessionTransaction } from "@/lib/api/transactions/client/list-transaction"
import { UpdateClientRequest, updateMyClient } from "@/lib/api/client/update"
import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { createGate } from "@/scope"

export const loadProfileFx = createEffect({
  handler: getMyClient,
})

export const toggleInterestCategory = createEvent<number>()
export const toggleDeleteCardModalDialog = createEvent<void>()

export const ClientProfileGate = createGate()
export const $showDeleteCardModalDialog = createStore(false)
  .on(toggleDeleteCardModalDialog, (state, payload) => !state)
  .reset(ClientProfileGate.open)

const updateProfile = createEffect<UpdateClientRequest, ClientSelfData>({
  handler: updateMyClient,
})

const successToast: Toast = {
  type: "info",
  text: "Данные сохранены",
}

forward({
  from: updateProfile.doneData.map(_ => successToast),
  to: [toasts.remove, toasts.add],
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
  age: date(+new Date())
    .subtract(date(profile?.birthDate).get("year"), "year")
    .get("year"),
}))

export const $profileCategories = combine($categoriesList, $profile, (categories, profile) =>
  categories.map(category => ({
    ...category,
    selected: !!(profile?.categories || [])?.find(profileCategory => profileCategory.id === category.id),
  }))
)

export const loadProfileSessionsFx = createEffect({
  handler: ({ page }: { page: number }) => getMyTransactions({ page, pageSize: 5 }),
})

export const $ProfileSessionsCount = createStore<number>(100).on(
  loadProfileSessionsFx.doneData,
  (state, payload) => payload.count
)

export const $ProfileSessions = createStore<SessionTransaction[]>([]).on(
  loadProfileSessionsFx.doneData,
  (state, payload) => [...state, ...payload.results]
)

const $ProfileSessionsLoadFailed = createStore(false).on(loadProfileSessionsFx.fail, () => true)

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

const $participantsCurrentPage = createStore(0).on(loadProfileSessionsFx.done, (_, payload) => payload.params.page)

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
      price: `${+session.clientPrice > 0 ? "+" : "-"} ${session.clientPrice}`,
      time: date(session.startDatetime).format("HH:mm"),
      date: date(session.startDatetime).format("DD.MM.YYYY"),
      status: transaction.status,
    }
  })
)

export const $profilePageSessionsCount = $profilePageSessions.map(sessions => !!sessions.length)

export const $profilePageLoading = combine(
  $profile,
  loadProfileFx.pending,
  fetchCategoriesListFx.pending,
  $profilePageSessionsCount,
  loadProfileSessionsFx.pending,
  (profile, profileLoading, categoriesLoading, sessionsCount, loadSessions) =>
    !profile || profileLoading || categoriesLoading || (loadSessions && !sessionsCount)
)

forward({
  from: ClientProfileGate.open,
  to: [fetchCategoriesList, loadProfileFx, loadMoreProfileSessions],
})