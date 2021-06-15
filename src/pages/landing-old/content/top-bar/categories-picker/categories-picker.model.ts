import { combine, createEvent, forward, restore, sample, Event } from "effector-root"
import { $categoriesList as $categories } from "@/feature/categories/categories.store"
import { addSearchPageQuery, removeSearchPageQuery } from "@/pages/search/coaches-search.model"
import { splitMap } from "patronum"

export const toggleCategorySelection = createEvent<number>()
export const setSelectedCategories = createEvent<number[]>()

const $selectedCategories = restore(setSelectedCategories, [])

export const $categoriesList = combine([$categories, $selectedCategories], ([categories, selectedIds]) =>
  categories.map(cat => ({ ...cat, checked: selectedIds.includes(cat.id) }))
)

export const changeCategoriesPickerVisibility = createEvent<boolean>()
export const $categoriesPickerVisibility = restore(changeCategoriesPickerVisibility, false)

const { remove, add } = splitMap({
  source: sample({
    source: $selectedCategories,
    clock: toggleCategorySelection,
    fn: (categories, catId) => {
      if (categories.includes(catId)) return categories.filter(id => id !== catId)

      return [...categories, catId]
    },
  }) as Event<any>,
  cases: {
    remove: (categories: number[]) => (categories.length === 0 ? (["categories"] as ["categories"]) : undefined),
    add: (categories: number[]) => (categories.length > 0 ? { categories: categories.join(",") } : undefined),
  },
})

forward({
  from: add,
  to: addSearchPageQuery,
})

forward({
  from: remove,
  to: removeSearchPageQuery,
})
