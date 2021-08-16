import { Combinable, combine, createEffect, createEvent, createStore, guard, sample, Store } from "effector-root"
import { Pagination } from "@/lib/api/interfaces/utils.interface"

export type PaginationRequest =
  | {
      page: number
      pageSize: number
    }
  | any

export type PaginationFetchMethod<T> = (params: PaginationRequest) => Promise<Pagination<T>>

export type PaginationModelConfigTypes<T> = {
  fetchMethod: PaginationFetchMethod<T>
  $query?: Store<any>
  pageSize?: number
}

export type CreatePaginationType<ItemTypes> = {
  data: {
    $itemsCount: Store<number>
    $list: Store<ItemTypes[]>
    $loadFailed: Store<boolean>
    $currentPage: Store<number>
    $hasMore: Store<boolean>
    $listIsEmpty: Store<boolean>
    $loading: Store<boolean>
  }
  methods: {
    loadMore: any
    reset: any
  }
}

export const createPagination = <ListItemType>(
  config: PaginationModelConfigTypes<ListItemType>
): CreatePaginationType<ListItemType> => {
  const reset = createEvent()

  const loadMoreFx = createEffect({
    handler: ({ page, query }: { page: number; query: any }) =>
      config.fetchMethod({ page, pageSize: config.pageSize || 15, ...query }),
  })

  const $itemsCount = createStore<number>(Infinity)
    .on(loadMoreFx.doneData, (state, payload) => payload.count)
    .reset(reset)

  const $list = createStore<ListItemType[]>([])
    .on(loadMoreFx.doneData, (state, payload) => [...state, ...payload.results])
    .reset(reset)

  const $loadFailed = createStore(false)
    .on(loadMoreFx.fail, () => true)
    .reset(reset)

  const $hasMore = combine({ count: $itemsCount, list: $list, isFailed: $loadFailed }, ({ count, list, isFailed }) => {
    return !isFailed && count !== list.length
  })

  const loadMore = createEvent()

  const guardedLoadMore = guard({
    source: loadMore,
    filter: combine(loadMoreFx.pending, $hasMore, (pending, hasMore) => !pending && hasMore),
  })

  const $currentPage = createStore(0)
    .on(loadMoreFx.done, (_, payload) => payload.params.page)
    .reset(reset)

  const $listIsEmpty = combine(loadMoreFx.pending, $list, (pending, list) => !pending && !list.length)

  const $query = config.$query || createStore({})

  sample({
    source: combine($query, $currentPage, (query: any, page: number) => ({ query, page })),
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
      $loading: loadMoreFx.pending,
    },
    methods: {
      loadMore,
      reset,
    },
  }
}
