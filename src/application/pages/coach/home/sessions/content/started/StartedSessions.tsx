import { CoachSessionsBlockTitle as Title } from "@/application/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/application/pages/coach/home/sessions/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/application/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useList } from "effector-react"
import { $startedSessionsList } from "@/application/pages/coach/home/sessions/content/started/started-sessions.model"

export const StartedSessions = () => (
  <Container>
    <Title>Сессия уже началась!</Title>
    {useList($startedSessionsList, session => (
      <Card {...session} />
    ))}
  </Container>
)
