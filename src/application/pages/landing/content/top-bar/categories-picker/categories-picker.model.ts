import { Category, getCategories } from "@/application/lib/api/categories"
import { forward } from "effector"
import { appDomain } from "@/application/store"
import {
  $searchPageQuery,
  addSearchPageQuery,
  removeSearchPageQuery,
  setSearchPageQuery
} from "@app/pages/search/coaches-search.model"

interface PickerCategory extends Category {
  checked: boolean
}

const categoriesPickerDomain = appDomain.createDomain()

export const fetchCategoriesListFx = categoriesPickerDomain
  .createEffect<void, PickerCategory[]>()
  .use(() => getCategories())

export const loadCategories = categoriesPickerDomain.createEvent()

export const toggleCategorySelection = appDomain.createEvent<number>()

export const resetCategories = appDomain.createEvent()

export const $categoriesList = categoriesPickerDomain
  .createStore<PickerCategory[]>([])
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
