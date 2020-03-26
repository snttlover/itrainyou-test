import { Category, getCategories } from "@/application/lib/api/categories"
import { createEffect, createEvent, forward } from "effector"
import {
  $searchPageQuery,
  addSearchPageQuery,
  removeSearchPageQuery,
  setSearchPageQuery
} from "@/application/pages/search/coaches-search.model"
import { createUniversalStore } from "@/store"

interface PickerCategory extends Category {
  checked: boolean
}

export const fetchCategoriesListFx = createEffect<void, PickerCategory[]>()
  .use(() => getCategories())

export const loadCategories = createEvent()

export const toggleCategorySelection = createEvent<number>()

export const resetCategories = createEvent()

export const $categoriesList = createUniversalStore<PickerCategory[]>([])
  .on(setSearchPageQuery, (state, query) => {
    const categories = query.categories ? query.categories.split(',').map(id => +id) : []
    return state.map(item => ({ ...item, checked: categories.includes(item.id) }))
  })
  .on(fetchCategoriesListFx.done, (state, payload) => {
    const query = $searchPageQuery.getState()
    const categories = query.categories ? query.categories.split(',').map(id => +id) : []

    return payload.result.map(item => ({ ...item, checked: categories.includes(item.id) }))
  })
  .on(resetCategories, state =>
    state.map(category => ({
      ...category,
      checked: false
    }))
  )
  .on(toggleCategorySelection, (list, id: number) => {
    const newCategories = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked
        }
      }
      return item
    })
    const selectedCategoriesIds = newCategories.filter(category => category.checked).map(category => category.id)
    if (selectedCategoriesIds.length) {
      addSearchPageQuery({
        categories: selectedCategoriesIds.join(',')
      })
    } else {
      removeSearchPageQuery([`categories`])
    }
    return newCategories
  })

forward({
  from: loadCategories,
  to: fetchCategoriesListFx
})
