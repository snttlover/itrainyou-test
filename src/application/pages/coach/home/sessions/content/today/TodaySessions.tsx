import { CoachSessionsBlockTitle as Title } from "@/application/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/application/pages/coach/home/sessions/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/application/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useList } from "effector-react"
import { $todaySessionsList } from "@/application/pages/coach/home/sessions/content/today/today-sessions.model"

export const TodaySessions = () => (
  <Container>
    <Title>Сессия уже началась!</Title>
    {useList($todaySessionsList, session => (
      <Card {...session} />
    ))}
  </Container>
)
