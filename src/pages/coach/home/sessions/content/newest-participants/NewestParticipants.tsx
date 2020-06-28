import { CoachSessionsBlockTitle as Title } from "@/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/pages/coach/home/sessions/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useEvent, useList, useStore } from "effector-react/ssr"
import { Loader } from "@/components/spinner/Spinner"
import {
  $isHasMoreParticipants,
  $newestParticipants,
  loadMoreParticipants,
} from "@/pages/coach/home/sessions/coach-sessions-page.model"
import { $newestParticipantsList } from "@/pages/coach/home/sessions/content/newest-participants/newest-participants.model"
import InfiniteScroll from "react-infinite-scroll-component"
import * as React from "react"

export const NewestParticipants = () => {
  const hasMore = useStore($isHasMoreParticipants)
  const participants = useStore($newestParticipants)
  const loadMore = useEvent(loadMoreParticipants)

  return (
    <Container>
      <Title>На ваши занятия записались</Title>
      <InfiniteScroll
        loader={<Loader />}
        next={loadMore as any}
        hasMore={hasMore}
        scrollableTarget='page-wrapper'
        style={{overflow: `hidden`}}
        dataLength={participants.length}
      >
        {useList($newestParticipantsList, session => (
          <Card {...session} />
        ))}
      </InfiniteScroll>
    </Container>
  )
}
