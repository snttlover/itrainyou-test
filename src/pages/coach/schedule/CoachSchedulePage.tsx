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

const Container = styled(ContentContainer)`
  margin-top: 16px;
`

const StyledTabs = styled(Tabs)`
  display: flex;
  position: relative;
  margin-bottom: 16px;  
`

const StyledTab = styled(Tab)`
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2px;
  background: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  max-width: 120px;  
  &[data-active="true"] {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    background: transparent;
  }
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-weight: 700;  
  margin-bottom: 12px;
  font-size: 20px;
  line-height: 28px;
  color: #424242;
  ${MediaRange.lessThan("mobile")`
      margin-bottom: 34px;
      margin-top: 10px;
  `}
`

const StyledInput = styled(InputComponent)`
`

export const CoachSchedulePage = () => {
  const coachAccess = useStore($coachAccess)

    const [value,setValue] = useState("")

    const test = (e) => {
      console.log("test", e)
    }
  return (
    <CoachDashboardLayout>
        <Header>Расписание</Header>
        <StyledTabs>
            <StyledTab value='images'>Календарь</StyledTab>
            <StyledTab value='documents'>Настройки расписания</StyledTab>
            <StyledTab value='documents'>Google-календарь</StyledTab>
        </StyledTabs>
        <StyledInput placeholder={"test"} maxWidth={"400px"} label='Текст' error={"Неверный вариант"} required value={value} onChange={setValue} />

      <Container>{coachAccess.isApproved ? <Schedule /> : <CoachSchedulePlaceholder />}</Container>
    </CoachDashboardLayout>
  )
}

export default CoachSchedulePage
