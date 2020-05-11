import { CategoryResponse, getCategories } from "@/application/lib/api/categories"
import { createEffect } from "effector-next"
import { createStore } from "effector-next"

export type Category = CategoryResponse & {
  color: string
}

export const getCategoryColorById = (id: number) => {
  const map = {
    1: "#0AA7FF",
    2: "#FF4A00",
    3: "#A8D600",
    4: "#FF7F00",
    5: "#00B3AF",
    6: "#D73EAF"
  } as { [key: number]: string }

  return map[id] || "#000"
}

export const fetchCategoriesListFx = createEffect({
  handler: getCategories
})

export const $categoriesList = createStore<Category[]>([]).on(
  fetchCategoriesListFx.doneData,
  (state, payload: CategoryResponse[]) =>
    payload.map(category => ({ ...category, color: getCategoryColorById(category.id) }))
)
