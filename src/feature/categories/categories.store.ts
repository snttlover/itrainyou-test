import { SessionCategory, getCategories } from "@/lib/api/categories"
import { createEffect, createEvent, forward } from "effector-root"
import { createStore } from "effector-root"

export type Category = SessionCategory & {
  color: string
}

export const getCategoryColorById = (id: number) => {
  const map = {
    1: "#0AA7FF",
    2: "#FF4A00",
    3: "#A8D600",
    4: "#FF7F00",
    5: "#00B3AF",
    6: "#D73EAF",
  } as { [key: number]: string }

  return map[id] || "#000"
}

export const fetchCategoriesList = createEvent()

export const fetchCategoriesListFx = createEffect({
  handler: getCategories,
})

export const $categoriesList = createStore<Category[]>([]).on(
  fetchCategoriesListFx.doneData,
  (state, payload: Category[]) => payload.map(category => ({ ...category, color: getCategoryColorById(category.id) }))
)

forward({
  from: fetchCategoriesList,
  to: fetchCategoriesListFx,
})
