import { combine, createEffect, createEvent, createStore, guard, sample, Store } from "effector-root"
import { Pagination } from "@/lib/api/interfaces/utils.interface"

export type PaginationRequest = {
  page: number
  pageSize: number
}

export type PaginationModelConfigTypes<T> = {
  fetchMethod: (params: PaginationRequest) => Promise<Pagination<T>>
}

export type CreatePaginationType<ItemTypes> = {
  data: {
    $itemsCount: Store<number>
    $list: Store<ItemTypes[]>
    $loadFailed: Store<boolean>
    $currentPage: Store<number>
    $hasMore: Store<boolean>
  }
  useCases: {
    loadMore: any
  }
}

export const createPagination = <ListItemType>(
  config: PaginationModelConfigTypes<ListItemType>
): CreatePaginationType<ListItemType> => {
  const loadMoreFx = createEffect({
    handler: ({ page }: { page: number }) => config.fetchMethod({ page, pageSize: 12 }),
  })

  const $itemsCount = createStore<number>(100).on(loadMoreFx.doneData, (state, payload) => payload.count)

  const $list = createStore<ListItemType[]>([]).on(loadMoreFx.doneData, (state, payload) => [
    ...state,
    ...payload.results,
  ])

  const $loadFailed = createStore(false).on(loadMoreFx.fail, () => true)

  const $hasMore = combine({ count: $itemsCount, list: $list, isFailed: $loadFailed }, ({ count, list, isFailed }) => {
    return !isFailed && count !== list.length
  })

  const loadMore = createEvent()

  const guardedLoadMore = guard({
    source: loadMore,
    filter: loadMoreFx.pending.map(pending => !pending),
  })

  const $currentPage = createStore(0).on(loadMoreFx.done, (_, payload) => payload.params.page)

  sample({
    source: $currentPage,
    clock: guardedLoadMore,
    fn: source => ({ page: source + 1 }),
    target: loadMoreFx,
  })

  return {
    data: {
      $itemsCount,
      $list,
      $loadFailed,
      $currentPage,
      $hasMore,
    },
    useCases: {
      loadMore,
    },
  }
}
