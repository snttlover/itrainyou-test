import { CoachSessionsBlockTitle as Title } from "@/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/pages/coach/home/sessions/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useList } from "effector-react/ssr"
import { $startedSessionsList } from "@/pages/coach/home/sessions/content/started/started-sessions.model"

export const StartedSessions = () => (
  <Container>
    <Title>Сессия уже началась!</Title>
    {useList($startedSessionsList, session => (
      <Card {...session} />
    ))}
  </Container>
)
