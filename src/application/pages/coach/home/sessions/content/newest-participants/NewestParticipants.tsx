import { CoachSessionsBlockTitle as Title } from "@/application/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/application/pages/coach/home/sessions/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/application/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useList, useStore } from "effector-react"
import {Loader} from "@/application/components/spinner/Spinner"
import {
  $isHasMoreParticipants,
  $newestParticipants,
  loadMoreParticipants
} from "@/application/pages/coach/home/sessions/coach-sessions-page.model"
import { $newestParticipantsList } from "@/application/pages/coach/home/sessions/content/newest-participants/newest-participants.model"
import InfiniteScroll from "react-infinite-scroll-component"

export const NewestParticipants = () => {
  const hasMore = useStore($isHasMoreParticipants)
  const participants = useStore($newestParticipants)

  return (
    <Container>
      <Title>На ваши занятия записались</Title>

      <InfiniteScroll
        loader={<Loader />}
        next={loadMoreParticipants as any}
        hasMore={hasMore}
        dataLength={participants.length}
      >
        {useList($newestParticipantsList, session => (
          <Card {...session} />
        ))}
      </InfiniteScroll>
    </Container>
  )
}
