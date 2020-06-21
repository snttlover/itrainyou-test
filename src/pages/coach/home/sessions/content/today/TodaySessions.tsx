import { CoachSessionsBlockTitle as Title } from "@/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionCard as Card } from "@/pages/coach/home/sessions/common/CoachSessionCard"
import { CoachSessionsContainer as Container } from "@/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useList } from "effector-react/ssr"
import { $todaySessionsList } from "@/pages/coach/home/sessions/content/today/today-sessions.model"

export const TodaySessions = () => (
  <Container>
    <Title>У вас сегодня</Title>
    {useList($todaySessionsList, session => (
      <Card {...session} />
    ))}
  </Container>
)
