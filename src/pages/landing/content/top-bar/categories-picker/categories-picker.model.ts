import { combine, createEvent, forward, restore, sample, split } from "effector-root"
import { $categoriesList as $categories } from "@/feature/categories/categories.store"
import { addSearchPageQuery, removeSearchPageQuery } from "@/pages/search/coaches-search.model"

export const toggleCategorySelection = createEvent<number>()
export const setSelectedCategories = createEvent<number[]>()

const $selectedCategories = restore(setSelectedCategories, [])

export const $categoriesList = combine([$categories, $selectedCategories], ([categories, selectedIds]) =>
  categories.map(cat => ({ ...cat, checked: selectedIds.includes(cat.id) }))
)

export const changeCategoriesPickerVisibility = createEvent<boolean>()
export const $categoriesPickerVisibility = restore(changeCategoriesPickerVisibility, false)

const { remove, add } = split(
  sample({
    source: $selectedCategories,
    clock: toggleCategorySelection,
    fn: (categories, catId) => {
      if (categories.includes(catId)) return categories.filter(id => id !== catId)

      return [...categories, catId]
    },
  }),
  {
    remove: categories => categories.length === 0,
    add: categories => categories.length > 0,
  }
)

forward({
  from: add.map(categories => ({ categories: categories.join(",") })),
  to: addSearchPageQuery,
})

forward({
  from: remove.map<["categories"]>(_ => ["categories"]),
  to: removeSearchPageQuery,
})

/*sample({
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
})*/
