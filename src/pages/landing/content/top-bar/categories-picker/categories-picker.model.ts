import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/routes"
import { combine, createEvent, restore, sample } from "effector-root"
import { $categoriesList as $categories } from "@/feature/categories/categories.store"

export const toggleCategorySelection = createEvent<number>()
export const setSelectedCategories = createEvent<number[]>()

const $selectedCategories = restore(setSelectedCategories, [])

export const $categoriesList = combine([$categories, $selectedCategories], ([categories, selectedIds]) =>
  categories.map(cat => ({ ...cat, checked: selectedIds.includes(cat.id) }))
)

export const changeCategoriesPickerVisibility = createEvent<boolean>()
export const $categoriesPickerVisibility = restore(changeCategoriesPickerVisibility, false)

sample({
  source: $selectedCategories,
  clock: toggleCategorySelection,
  fn: (categories, catId) => {
    let newCategories
    if (categories.includes(catId)) newCategories = categories.filter(id => id !== catId)
    else newCategories = [...categories, catId]

    return {
      url: routeNames.search(),
      query: {
        categories: newCategories,
      },
    }
  },
  target: navigatePush,
})
