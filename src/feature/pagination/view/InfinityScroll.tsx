import { createPagination } from "@/feature/pagination"
import { Loader } from "@/components/spinner/Spinner"
import { useEvent, useStore } from "effector-react/ssr"
import InfiniteScroll from "react-infinite-scroll-component"
import * as React from "react"
import { CreatePaginationType } from "@/feature/pagination/modules/pagination"

type InfinityScrollPropsTypes = {
  children: React.ReactNode | React.ReactNode[]
}

export const createInfinityScroll = ($paginationModel: CreatePaginationType<any>) => (
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
      scrollableTarget='page-wrapper'
      style={{ overflow: `hidden` }}
      dataLength={items.length}
    >
      {props.children}
    </InfiniteScroll>
  )
}
