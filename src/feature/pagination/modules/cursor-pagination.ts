import { combine, createEffect, createEvent, createStore, guard, sample, Store, Event } from "effector"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"
import { getUrlParamByName } from "@/lib/helpers/get-url-param-by-name"
import { keysToSnake } from "@/lib/network/casing"

export type CursorPaginationFetchMethod<T> = (params: CursorPaginationRequest) => Promise<CursorPagination<T>>

export type CursorPaginationModelConfigTypes<T> = {
  fetchMethod: CursorPaginationFetchMethod<T>
}

type Next = null | string | boolean

export type CreateCursorPaginationType<ItemTypes> = {
  data: {
    $list: Store<ItemTypes[]>
    $hasMore: Store<boolean>
    $listIsEmpty: Store<boolean>
    $loading: Store<boolean>
  }
  methods: {
    loadMore: any
    reset: Event<void>
  }
}

export const createCursorPagination = <ListItemType>(
  config: CursorPaginationModelConfigTypes<ListItemType>
): CreateCursorPaginationType<ListItemType> => {
  const loadMoreFx = createEffect({
    handler: (cursor: Next) => {
      const params: CursorPaginationRequest = { pageSize: 30 }
      if (typeof cursor === "string") {
        params.cursor = cursor
      }
      return config.fetchMethod(keysToSnake(params))
    },
  })

  const reset = createEvent()

  const $list = createStore<ListItemType[]>([])
    .on(loadMoreFx.doneData, (state, payload) => [...state, ...payload.results])
    .reset(reset)

  const $next = createStore<Next>(true)
    .on(loadMoreFx.doneData, (_, list) => getUrlParamByName("cursor", list.next) || false)
    .reset(reset)

  const $loadFailed = createStore(false).on(loadMoreFx.fail, () => true)

  const $hasMore = combine({ next: $next, isFailed: $loadFailed }, ({ next, isFailed }) => {
    return !isFailed && next !== false
  })

  const loadMore = createEvent()

  const guardedLoadMore = guard({
    source: loadMore,
    filter: combine(loadMoreFx.pending, $hasMore, (pending, hasMore) => !pending && hasMore),
  })

  const $listIsEmpty = combine(loadMoreFx.pending, $list, (pending, list) => !pending && !list.length)

  const $loading = loadMoreFx.pending

  sample({
    source: $next,
    clock: guardedLoadMore,
    target: loadMoreFx,
  })

  return {
    data: {
      $list,
      $hasMore,
      $listIsEmpty,
      $loading,
    },
    methods: {
      loadMore,
      reset,
    },
  }
}
