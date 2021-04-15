import { CoachDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { $coachAccess } from "@/feature/user/user.model"
import { CoachSchedulePlaceholder } from "@/pages/coach/schedule/CoachSchedulePlaceholder"
import { useStore } from "effector-react"
import * as React from "react"
import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import styled from "styled-components"
import { Schedule } from "./Schedule"
import { Tab, Tabs } from "@/oldcomponents/tabs/Tabs"
import { MediaRange } from "@/lib/responsive/media"
import { InputComponent } from "@/newcomponents/input/Input"
import { Input } from "@/oldcomponents/input/Input"
import { useState } from "react"
import { GoogleCalendar } from "@/pages/coach/schedule/GoogleCalendar"
import { CalendarPart } from "@/pages/coach/schedule/components/CalendarPart"

const Container = styled(ContentContainer)`
  margin-top: 16px;
  background: #FFFFFF;  
`

const StyledTabs = styled(Tabs)`
  display: flex;
  position: relative;
  margin-bottom: 24px;  
`

const StyledTab = styled(Tab)`
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2px;
  background: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  max-width: 200px;  
  &[data-active="true"] {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    background: transparent;
  }
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-weight: 700;  
  margin-bottom: 12px;
  font-size: 24px;
  line-height: 32px;
  color: #424242;
  ${MediaRange.lessThan("mobile")`
      margin-bottom: 34px;
      margin-top: 10px;
  `}
`

const StyledInput = styled(InputComponent)`
`

const TabsWrapper = styled.div<{ materials: "images" | "documents"}>`
  display: flex;
  flex-wrap: ${({ materials,theme }) => materials === "images" ? "wrap" : "nowrap"};
  width: ${({ materials,theme }) => materials === "images" ? "unset" : "100%"};
  flex-direction: ${({ materials,theme }) => materials === "images" ? "unset" : "column"};  
`

export const CoachSchedulePage = () => {
  const coachAccess = useStore($coachAccess)

    const [tab,changeTab] = useState<"calendar" | "schedule" | "google_calendar">("calendar")

  return (
    <CoachDashboardLayout>
        {/*
        <StyledInput
        placeholder={"test"}
        maxWidth={"400px"}
        label='Текст'
        error={"Неверный вариант"}
        required value={value} onChange={setValue} />*/}
      <Container>
          <Header>Расписание</Header>
          <StyledTabs value={tab} onChange={changeTab}>
              <StyledTab value='calendar'>Календарь</StyledTab>
              <StyledTab value='schedule'>Настройки расписания</StyledTab>
              <StyledTab value='google_calendar'>Google-календарь</StyledTab>
          </StyledTabs>
          {tab === "schedule" ? (coachAccess.isApproved ? <Schedule /> : <CoachSchedulePlaceholder />) : null}
          {tab === "google_calendar" ? (<GoogleCalendar />) : null}
          {tab === "calendar" ? (<CalendarPart />) : null}
      </Container>
    </CoachDashboardLayout>
  )
}

export default CoachSchedulePage
