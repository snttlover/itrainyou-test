import { CoachSessionsBlockTitle as Title } from "@/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionsContainer as Container } from "@/pages/coach/home/sessions/common/CoachSessionsContainer"
import { newestParticipants } from "@/pages/coach/home/sessions/coach-sessions-page.model"
import { $newestParticipantsList } from "@/pages/coach/home/sessions/content/newest-participants/newest-participants.model"
import * as React from "react"
import { createInfinityScroll } from "@/feature/pagination"
import { SessionCardListItem } from "@/pages/coach/home/sessions/content/common/SessionCardListItem"
import { useSplittedStore } from "@/lib/effector/use-split-store"
import { date } from "@/lib/formatting/date"

const InfinityScroll = createInfinityScroll(newestParticipants)

export const NewestParticipants = () => {
  const sessions = useSplittedStore({
    store: $newestParticipantsList,
    splitter: session =>
      date().isSame(session.startDatetime, "d") ? "Сегодня" : date(session.startDatetime).format("DD MMMM"),
  })

  return (
    <Container>
      <InfinityScroll>
        {sessions.keys.map(day => (
          <>
            <Title>{day}</Title>
            {sessions.splitted(day).map(session => (
              <SessionCardListItem {...session} key={session.id} />
            ))}
          </>
        ))}
      </InfinityScroll>
    </Container>
  )
}
