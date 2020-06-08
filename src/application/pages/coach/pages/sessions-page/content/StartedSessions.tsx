import { CoachSessionsBlockTitle as Title } from "@/application/pages/coach/pages/sessions-page/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/application/pages/coach/pages/sessions-page/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/application/pages/coach/pages/sessions-page/common/CoachSessionsContainer"

export const StartedSessions = () => (
  <Container>
    <Title>Сессия уже началась!</Title>
    <Card />
    <Card />
    <Card />
  </Container>
)
