import { CoachSessionsBlockTitle as Title } from "@/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionsContainer as Container } from "@/pages/coach/home/sessions/common/CoachSessionsContainer"
import { useList } from "effector-react"
import { $todaySessionsList } from "@/pages/coach/home/sessions/content/today/today-sessions.model"
import * as React from "react"
import { SessionCardListItem } from "@/pages/coach/home/sessions/content/common/SessionCardListItem"

export const TodaySessions = () => (
  <Container>
    <Title>Ближайшие сессии</Title>
    {useList($todaySessionsList, session => (
      <SessionCardListItem {...session} />
    ))}
  </Container>
)
