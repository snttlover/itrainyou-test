import { CoachSessionsBlockTitle as Title } from "@/application/pages/coach/home/home/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/application/pages/coach/home/home/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/application/pages/coach/home/home/common/CoachSessionsContainer"

export const StartedSessions = () => (
  <Container>
    <Title>Сессия уже началась!</Title>
    <Card />
    <Card />
    <Card />
  </Container>
)
