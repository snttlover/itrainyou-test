import { Loader } from "@/components/spinner/Spinner"
import { useEvent, useStore } from "effector-react"
import InfiniteScroll from "react-infinite-scroll-component"
import * as React from "react"
import { Store } from "effector-root"

export type InfinityScrollPropsTypes = {
  children: React.ReactNode | React.ReactNode[]
  scrollableTarget?: string
}

export type CreateInfinityScrollType<T> = {
  data: {
    $list: Store<T>,
    $hasMore: Store<boolean>
  }
  methods: {
    loadMore: any
  }
}

export const createInfinityScroll = ($paginationModel: CreateInfinityScrollType<any>) => (
  props: InfinityScrollPropsTypes
) => {
  const loadMore = useEvent($paginationModel.methods.loadMore)
  const hasMore = useStore($paginationModel.data.$hasMore)
  const items = useStore($paginationModel.data.$list)

  return (
    <InfiniteScroll
      loader={<Loader />}
      next={loadMore as any}
      hasMore={hasMore}
      scrollableTarget={props.scrollableTarget || "page-wrapper"}
      style={{ overflow: "hidden" }}
      dataLength={items.length}
    >
      {props.children}
    </InfiniteScroll>
  )
}
