import { useEvent, useStore } from "effector-react"
import { Loader } from "#/components/spinner/Spinner"
import * as React from "react"
import styled from "styled-components"
import { CreateInfinityScrollType, InfinityScrollPropsTypes } from "#/feature/pagination/view/InfinityScroll"
import { useEffect } from "react"

const Container = styled.div`
  display: block;
`

type ReverseInfiniteScrollTypes = {
  children: React.ReactNode | React.ReactNode[]
  loader: React.ReactChild
  next: () => any
  hasMore: boolean
  scrollableTarget: string
}

const ReverseInfiniteScroll = (props: ReverseInfiniteScrollTypes) => {

  useEffect(() => {
    const el = document.getElementById(props.scrollableTarget)

    const scrollHandler = () => {
      if (el && el.scrollTop < 100 && props.hasMore) {
        props.next()
      }
    }

    if (el) {
      el.addEventListener(`scroll`, scrollHandler)
    }
    return () => {
      if (el) {
        el.removeEventListener(`scroll`, scrollHandler)
      }
    }
  })

  return (
    <Container>
      {props.hasMore && props.loader}
      {props.children}
    </Container>
  )
}

export const createReverseInfinityScroll = ($paginationModel: CreateInfinityScrollType<any>) => (
  props: InfinityScrollPropsTypes
) => {
  const loadMore = useEvent($paginationModel.methods.loadMore)
  const hasMore = useStore($paginationModel.data.$hasMore)

  return (
    <ReverseInfiniteScroll
      loader={<Loader />}
      next={loadMore as any}
      hasMore={hasMore}
      scrollableTarget={props.scrollableTarget || 'page-wrapper'}
    >
      {props.children}
    </ReverseInfiniteScroll>
  )
}
