import { Combinable, combine, createEffect, createEvent, createStore, guard, sample, Store } from "effector-root"
import { Pagination } from "@/lib/api/interfaces/utils.interface"

export type PaginationRequest = {
  page: number
  pageSize: number
} | any

export type PaginationFetchMethod<T> = (params: PaginationRequest) => Promise<Pagination<T>>

export type PaginationModelConfigTypes<T> = {
  fetchMethod: PaginationFetchMethod<T>
  $query?: Store<any>
}

export type CreatePaginationType<ItemTypes> = {
  data: {
    $itemsCount: Store<number>
    $list: Store<ItemTypes[]>
    $loadFailed: Store<boolean>
    $currentPage: Store<number>
    $hasMore: Store<boolean>
    $listIsEmpty: Store<boolean>
  }
  methods: {
    loadMore: any
  }
}

export const createPagination = <ListItemType>(
  config: PaginationModelConfigTypes<ListItemType>
): CreatePaginationType<ListItemType> => {
  const loadMoreFx = createEffect({
    handler: ({ page, query }: { page: number, query: any }) => config.fetchMethod({ page, pageSize: 12, ...query }),
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
    filter: combine(loadMoreFx.pending, $hasMore, (pending, hasMore) => !pending && hasMore),
  })

  const $currentPage = createStore(0).on(loadMoreFx.done, (_, payload) => payload.params.page)

  const $listIsEmpty = combine(loadMoreFx.pending, $list, (pending, list) => !pending && !list.length)

  const $query = config.$query || createStore({})

  sample({
    source: combine($query, $currentPage, (query: any, page: number) => ({query, page})),
    clock: guardedLoadMore,
    fn: ({ page, query }) => ({ page: page + 1, query }),
    target: loadMoreFx,
  })

  return {
    data: {
      $itemsCount,
      $list,
      $loadFailed,
      $currentPage,
      $hasMore,
      $listIsEmpty,
    },
    methods: {
      loadMore,
    },
  }
}
