import { CoachDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { $coachAccess } from "@/feature/user/user.model"
import { CoachSchedulePlaceholder } from "@/pages/coach/schedule/CoachSchedulePlaceholder"
import { useStore, useGate } from "effector-react"
import * as React from "react"
import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import styled from "styled-components"
import { Schedule } from "./Schedule"
import { Tab, Tabs } from "@/oldcomponents/tabs/Tabs"
import { MediaRange } from "@/lib/responsive/media"
import { useState } from "react"
import { GoogleCalendar } from "@/pages/coach/schedule/GoogleCalendar"
import { CalendarPart } from "@/pages/coach/schedule/components/CalendarPart"
import { Prices } from "@/pages/coach/schedule/Prices"
import { ScheduleGate } from "@/pages/coach/schedule/models/schedule/units"
import { Icon } from "@/oldcomponents/icon/Icon"
import { OnBoardingFreeSessions } from "@/pages/coach/schedule/components/OnBoarding/OnBoarding"

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
  flex: 0 2;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2px 12px;
  background: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  white-space: nowrap;
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

const HorizontalOverflowScrollContainer = styled.div`
  overflow-y: auto;
`

export const Title = styled.div`
    font-family: Roboto Slab;
    font-weight: 700;
    margin-bottom: 8px;
    font-size: 20px;
    line-height: 28px;
    color: #424242;
`

export const Description = styled.div`
  margin-top: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #5b6670;
  max-width: 552px;  
`

const InstructionContainer = styled.div`
  position: absolute;
  top: 28px;
  right: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const InstructionText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.primary};
`

const QuestionIcon = styled(Icon).attrs({ name: "question-mark" })`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

export const CoachSchedulePage = () => {
  const coachAccess = useStore($coachAccess)

  useGate(ScheduleGate)

  const [tab, changeTab] = useState<"calendar" | "schedule" | "google_calendar" | "prices">("calendar")

  return (
    <CoachDashboardLayout>
      <Container>
        {coachAccess.isApproved ?
          <>
            <Header>Расписание</Header>
            <InstructionContainer>
              <QuestionIcon />
              <InstructionText>Инструкция</InstructionText>
            </InstructionContainer>
            <HorizontalOverflowScrollContainer>
              <StyledTabs value={tab} onChange={changeTab}>
                <StyledTab value='calendar'>Календарь</StyledTab>
                <StyledTab value='schedule'>Настройки расписания</StyledTab>
                <StyledTab value='google_calendar'>Google-календарь</StyledTab>
                <StyledTab value='prices'>Цены</StyledTab>
              </StyledTabs>
            </HorizontalOverflowScrollContainer>
            {tab === "schedule" ? (<Schedule />) : null}
            {tab === "google_calendar" ? (<GoogleCalendar />) : null}
            {tab === "calendar" ? (<CalendarPart />) : null}
            {tab === "prices" ? (<Prices />) : null}
            <OnBoardingFreeSessions />
          </>
          : <CoachSchedulePlaceholder />
        }
      </Container>
    </CoachDashboardLayout>
  )
}

export default CoachSchedulePage
