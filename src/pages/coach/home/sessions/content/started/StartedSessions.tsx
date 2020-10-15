import { CoachSessionsBlockTitle as Title } from "@/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/pages/coach/home/sessions/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useList } from "effector-react"
import { $startedSessionsList } from "@/pages/coach/home/sessions/content/started/started-sessions.model"
import * as React from "react"

export const StartedSessions = () => (
  <Container>
    <Title>Сессия уже началась!</Title>
    {useList($startedSessionsList, session => (
      <Card {...session} />
    ))}
  </Container>
)
