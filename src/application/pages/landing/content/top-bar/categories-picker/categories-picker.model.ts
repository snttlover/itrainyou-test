import { Category, getCategories } from "@/application/lib/api/categories"
import { forward } from "effector"
import { appDomain } from "@/application/store"
import { $searchPageQuery, addSearchPageQuery } from "@app/pages/search/coaches-search.model"

interface PickerCategory extends Category {
  checked: boolean
}

const categoriesPickerDomain = appDomain.createDomain()

export const fetchCategoriesListFx = categoriesPickerDomain
  .createEffect<void, PickerCategory[]>()
  .use(() => getCategories())

export const loadCategories = categoriesPickerDomain.createEvent()

export const toggleCategorySelection = appDomain.createEvent<number>()

export const $categoriesList = categoriesPickerDomain
  .createStore<PickerCategory[]>([])
  .on(fetchCategoriesListFx.done, (state, payload) => {
    const query = $searchPageQuery.getState()
    const categories = query.categories ? query.categories.split(`,`).map(id => +id) : []

    return payload.result.map(item => ({ ...item, checked: categories.includes(item.id) }))
  })
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
    addSearchPageQuery({
      categories: newCategories
        .filter(category => category.checked)
        .map(category => category.id)
        .join(`,`)
    })
    return newCategories
  })

forward({
  from: loadCategories,
  to: fetchCategoriesListFx
})
