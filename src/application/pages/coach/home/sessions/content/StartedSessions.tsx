import { CoachSessionsBlockTitle as Title } from "@/application/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/application/pages/coach/home/sessions/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/application/pages/coach/home/sessions/common/CoachSessionsContainer"

export const StartedSessions = () => (
  <Container>
    <Title>Сессия уже началась!</Title>
    <Card />
    <Card />
    <Card />
  </Container>
)
