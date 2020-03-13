import { Category, getCategories } from "@/application/lib/api/categories"
import { forward } from "effector"
import { appDomain } from "@/application/store"

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
  .on(fetchCategoriesListFx.done, (state, payload) => payload.result.map(item => ({ ...item, checked: false })))
  .on(toggleCategorySelection, (list, id: number) =>
    list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked
        }
      }
      return item
    })
  )

forward({
  from: loadCategories,
  to: fetchCategoriesListFx
})
