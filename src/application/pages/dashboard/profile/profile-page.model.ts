import { getMyClient, Client } from "@/application/lib/api/client"
import dayjs from "dayjs"
import { combine, createEffect, createEvent, createStore, forward } from "effector-next"
import { $categoriesList, fetchCategoriesListFx } from "@/application/feature/categories/categories.store"

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

forward({
  from: mounted,
  to: [fetchCategoriesListFx, loadProfileFx],
})
