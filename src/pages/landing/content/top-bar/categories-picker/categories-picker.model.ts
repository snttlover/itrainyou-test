import { SessionCategory, getCategories } from "@/lib/api/categories"
import { serverStarted } from "@/store"
import { createEffect, createEvent, createStore, forward, sample } from "effector-root"
import {
  $searchPageQuery,
  addSearchPageQuery,
  removeSearchPageQuery,
  setSearchPageQuery,
} from "@/pages/search/coaches-search.model"

interface PickerCategory extends SessionCategory {
  checked: boolean
}

export const fetchCategoriesListFx = createEffect<void, PickerCategory[]>().use(() => getCategories())

export const toggleCategorySelection = createEvent<number>()
export const resetCategories = createEvent()

export const $categoriesList = createStore<PickerCategory[]>([])
  .on(setSearchPageQuery, (state, query) => {
    const categories = query.categories ? query.categories.split(",").map(id => +id) : []
    return state.map(item => ({ ...item, checked: categories.includes(item.id) }))
  })
  .on(fetchCategoriesListFx.done, (state, payload) => {
    const query = $searchPageQuery.getState()
    const categories = query.categories ? query.categories.split(",").map(id => +id) : []

    return payload.result.map(item => ({ ...item, checked: categories.includes(item.id) }))
  })
  .on(resetCategories, state =>
    state.map(category => ({
      ...category,
      checked: false,
    }))
  )
  .on(toggleCategorySelection, (list, id: number) => {
    return list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        }
      }
      return item
    })
  })

const navigateWithFilters = createEffect({
  handler() {
    updatePickerQuery()
  },
})

sample({
  clock: toggleCategorySelection,
  source: $categoriesList,
  target: navigateWithFilters,
})

export const changeCategoriesPickerVisibility = createEvent<boolean>()
export const $categoriesPickerVisibility = createStore(false).on(
  changeCategoriesPickerVisibility,

  (_, status) => status
)

export const updatePickerQuery = createEvent()

updatePickerQuery.watch(() => {
  const query = $searchPageQuery.getState()
  const selectedCategoriesIds = $categoriesList
    .getState()
    .filter(category => category.checked)
    .map(category => category.id)

  if (selectedCategoriesIds.length) {
    if (selectedCategoriesIds.join(`,`) !== query.categories) {
      addSearchPageQuery({
        categories: selectedCategoriesIds.join(","),
      })
    }
  } else {
    if (query.categories) {
      removeSearchPageQuery([`categories`])
    }
  }
})

forward({
  from: serverStarted,
  to: fetchCategoriesListFx,
})
