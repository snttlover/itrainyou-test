import { Store } from "effector-root"
import { useStore } from "effector-react"

type UseSplitStoreConfig<T> = {
  store: Store<Array<T>>
  splitter: (item: T) => string
}

export const useSplittedStore = <T>({ store, splitter }: UseSplitStoreConfig<T>) => {
  const items = useStore(store)

  const keys = [...new Set(items.map(splitter))]

  return {
    keys,
    splitted(filterKey: unknown) {
      return items.filter(item => splitter(item) === filterKey)
    },
    items,
  }
}
