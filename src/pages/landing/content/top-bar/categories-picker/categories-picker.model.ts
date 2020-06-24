import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/routes"
import { combine, createEvent, createStore, restore, sample } from "effector-root"
import { $categoriesList as $categories } from "@/feature/categories/categories.store"

export const toggleCategorySelection = createEvent<number>()
export const resetCategories = createEvent()

const $selectedCategories = createStore<number[]>([])
  .on(toggleCategorySelection, (categories, catId) => {
    if (categories.includes(catId)) return categories.filter(id => id !== catId)
    else return [...categories, catId]
  })
  .reset(resetCategories)

export const $categoriesList = combine([$categories, $selectedCategories], ([categories, selectedIds]) =>
  categories.map(cat => ({ ...cat, checked: selectedIds.includes(cat.id) }))
)

export const changeCategoriesPickerVisibility = createEvent<boolean>()
export const $categoriesPickerVisibility = restore(changeCategoriesPickerVisibility, false)

sample({
  source: $selectedCategories,
  fn: categories => ({
    url: routeNames.search(),
    query: {
      categories,
    },
  }),
  target: navigatePush,
})
