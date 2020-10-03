import { CoachSessionsBlockTitle as Title } from "#/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "#/pages/coach/home/sessions/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "#/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useList } from "effector-react/ssr"
import { newestParticipants } from "#/pages/coach/home/sessions/coach-sessions-page.model"
import { $newestParticipantsList } from "#/pages/coach/home/sessions/content/newest-participants/newest-participants.model"
import * as React from "react"
import { createInfinityScroll } from "#/feature/pagination"

const InfinityScroll = createInfinityScroll(newestParticipants)

export const NewestParticipants = () => {
  return (
    <Container>
      <Title>На ваши занятия записались</Title>
      <InfinityScroll>
        {useList($newestParticipantsList, session => (
          <Card {...session} />
        ))}
      </InfinityScroll>
    </Container>
  )
}
