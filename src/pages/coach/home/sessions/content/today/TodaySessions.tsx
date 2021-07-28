import { CoachSessionsBlockTitle as Title } from "@/pages/coach/home/sessions/common/CoachSessionsBlockTitle"
import { CoachSessionsContainer as Container } from "@/pages/coach/home/sessions/common/CoachSessionsContainer"
import { $todaySessionsList } from "@/pages/coach/home/sessions/content/today/today-sessions.model"
import * as React from "react"
import { SessionCardListItem } from "@/pages/coach/home/sessions/content/common/SessionCardListItem"
import { useSplittedStore } from "@/lib/effector/use-split-store"
import { date } from "@/lib/formatting/date"

export const TodaySessions = () => {
  const todaySessions = useSplittedStore({
    store: $todaySessionsList,
    splitter: session =>
      date().isSame(session.startDatetime, "d") ? "Сегодня" : date(session.startDatetime).format("DD MMMM"),
  })

  return (
    <Container>
      <Title>Ближайшие сессии</Title>
      {todaySessions.keys.map(day => (
        <>
          <Title>{day}</Title>
          {todaySessions.splitted(day).map(session => (
            <SessionCardListItem {...session} key={session.id} />
          ))}
        </>
      ))}
    </Container>
  )
}
