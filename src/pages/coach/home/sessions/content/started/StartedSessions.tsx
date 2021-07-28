import { CoachSessionsBlockTitle as Title } from "@/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionsContainer as Container } from "@/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useList } from "effector-react"
import { $startedSessionsList } from "@/pages/coach/home/sessions/content/started/started-sessions.model"
import * as React from "react"
import { SessionCardListItem } from "@/pages/coach/home/sessions/content/common/SessionCardListItem"

export const StartedSessions = () => (
  <Container>
    <Title>Сессия уже началась!</Title>
    {useList($startedSessionsList, session => (
      <SessionCardListItem {...session} />
    ))}
  </Container>
)
