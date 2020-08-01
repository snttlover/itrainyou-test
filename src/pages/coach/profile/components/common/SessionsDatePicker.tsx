import { IsAuthed } from "@/feature/user/IsAuthed"
import { IsGuest } from "@/feature/user/IsGuest"
import { date } from "@/lib/formatting/date"
import { routeNames } from "@/pages/route-names"
import { useMemo, useState } from "react"
import * as React from "react"
import styled, { css } from "styled-components"
import { Calendar } from "@/components/calendar/Calendar"
import { useEvent, useStore } from "effector-react/ssr"
import { Tabs, Tab } from "@/components/tabs/Tabs"
import { Spinner } from "@/components/spinner/Spinner"
import { Button } from "@/components/button/normal/Button"
import { genSessionTabs, SelectDatetimeTypes } from "@/components/coach-card/select-date/SelectDatetime"
import { MediaRange } from "@/lib/responsive/media"
import { DurationType } from "@/lib/api/coach-sessions"
import { Link } from "react-router-dom"

type StyledTabTypes = {
  onlyOneCard: boolean
}

const Container = styled.div`
  width: 268px;
  margin-bottom: 20px;
  position: relative;

  ${MediaRange.lessThan(`laptop`)`
     width: 100%;
     margin-bottom: 0;
  `}
`

const Block = styled.div<StyledTabTypes>`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 24px 8px;
  ${MediaRange.between(`mobile`, `laptop`)`
    flex-direction: row;   
  `}
`

const Datepicker = styled.div`
  border-bottom: 1px solid #dbdee0;
  padding-bottom: 4px;
  ${MediaRange.between(`mobile`, `laptop`)`
     width: 50%;
     padding-right: 20px;
     padding-left: 20px;
     border-right: 1px solid #DBDEE0;
     border-bottom: none;
  `}
  ${MediaRange.lessThan(`mobile`)`
    margin-right: 26px;
    margin-left: 26px;
    padding-bottom: 12px;
    border-bottom: none;
  `}
`

const SelectTimeContainer = styled.div`
  margin: 0 auto;
  width: 100%;

  ${MediaRange.between(`mobile`, `laptop`)`
    margin: 0 auto;
    width: 252px;
  `}
`

const Times = styled.div`
  display: flex;
  margin-top: 12px;
  padding-left: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dbdee0;
`

const Tag = styled.div`
  width: 46px;
  margin-right: 8px;
  display: flex;
  flex-direction: row;
  padding: 2px 8px;
  color: #5b6670;
  box-sizing: border-box;
  border-radius: 24px;
  font-size: 12px;
  line-height: 16px;
`

const ButtonContainer = styled.div`
  padding-top: 10px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  margin-top: 25px;
`

const StyledTabs = styled(Tabs)`
  width: 100%;
  position: relative;
`

const StyledDateHeader = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  padding-left: 12px;
  padding-top: 16px;

  ${MediaRange.lessThan(`mobile`)`
    border-top: 1px solid #DBDEE0;
    padding-top: 24px;
  `}
`

const OnlyOneTabStyles = css`
  justify-content: flex-end;
  padding-top: 16px;
  padding-bottom: 8px;
`
// ${props => props.onlyOneCard && OnlyOneTabStyles}
const StyledTab = styled(Tab)<StyledTabTypes>`
  display: flex;
  flex-direction: column;
  padding: 8px 13px;
  ${MediaRange.between(`mobile`, `laptop`)`
    flex-direction: row;
  `}
`

const TabTime = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #5b6670;
  ${MediaRange.between(`mobile`, `laptop`)`
    font-size: 16px;
    line-height: 22px;
  `}
`

const TabPrice = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  color: #9aa0a6;
`

const SessionPackagesStatWrapper = styled.div`
  margin-top: 24px;
  border-top: 1px solid #dbdee0;
  padding-top: 20px;
  width: 216px;
  margin: 0 auto;

  ${MediaRange.between(`mobile`, `laptop`)`
    border-top: none;
 `}

  ${MediaRange.lessThan(`mobile`)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}
`

const SessionPackagePercent = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #424242;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
`

const SessionPackage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${MediaRange.lessThan(`mobile`)`
    width: 252px;
  `}
`

const SessionPackageText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
`

const SessionPackagesDescription = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #5b6670;
  margin-top: 16px;

  ${MediaRange.lessThan(`mobile`)`
    width: 212px;
  `}
`

const SessionsPackagesTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 7px;

  ${MediaRange.lessThan(`mobile`)`
    width: 252px;
  `}
`

const Footer = ({ className }: { className?: string }) => (
  <SessionPackagesStatWrapper className={className}>
    <SessionsPackagesTitle>Пакеты сессий</SessionsPackagesTitle>
    <SessionPackage>
      <SessionPackageText>2 сессии</SessionPackageText>
      <SessionPackagePercent>15%</SessionPackagePercent>
    </SessionPackage>
    <SessionPackagesDescription>Просто выберите сессии и акция автоматически активизируется</SessionPackagesDescription>
  </SessionPackagesStatWrapper>
)

const TabletFooter = styled(Footer)`
  display: none;
  ${MediaRange.between(`mobile`, `laptop`)`
    display: block;
    
    ${SessionPackagesDescription} {
      color: #4858CC;
    }
 `}
`

const DesktopFooter = styled(Footer)`
  display: flex;
  margin-top: 24px;
  ${MediaRange.between(`mobile`, `laptop`)`
    display: none;
 `}
`

const StyledCalendar = styled(Calendar)`
  ${MediaRange.between(`mobile`, `laptop`)`
    max-width: 252px;
    margin: 0 auto;
 `}
`

const Delemiter = styled.div`
  display: none;
  ${MediaRange.between(`mobile`, `laptop`)`
    display: flex;
  `}
`

const FooterWrapper = styled.div`
  display: none;
  width: 100%;
  border-top: 1px solid #dbdee0;
  ${MediaRange.between(`mobile`, `laptop`)`
    display: flex;
    justify-content: center;
    margin-top: 10px;
 `}
`

const equalDateFormat = `DDMMYYYY`
const equalTimeFormat = `HH:mm`

export const SessionsDatePicker = (props: SelectDatetimeTypes) => {
  const sessions = useStore(props.sessionsData.sessionsList)
  const loading = useStore(props.sessionsData.loading)
  const activeTab = useStore(props.sessionsData.tabs.$durationTab)
  const changeActiveTab = useEvent(props.sessionsData.tabs.changeDurationTab)
  const tabs = useMemo(() => genSessionTabs(props.coach), [props.coach])

  const [currentDate, changeCurrentDate] = useState<Date | null>()
  const enabledDates = sessions.map(session => session.startDatetime)

  const headerDate = currentDate ? currentDate : new Date()
  const formattedDate = date(headerDate).format("DD MMMM")
  const currentDateEqual = date(currentDate as Date).format(equalDateFormat)

  const times = sessions
    .filter(session => {
      return date(session.startDatetime).format(equalDateFormat) === currentDateEqual
    })
    .map(session => ({
      ...session,
      start_datetime: date(session.startDatetime).format(equalTimeFormat),
    }))

  const changeTabHandler = (durationType: DurationType) => {
    changeActiveTab(durationType)
    changeCurrentDate(null)
  }

  return (
    <Container>
      <StyledTabs value={activeTab} onChange={changeTabHandler}>
        {tabs.map(tab => (
          <StyledTab key={tab.key} value={tab.key} onlyOneCard={tabs.length === 1}>
            <TabTime>{tab.timeInMinutes} мин</TabTime>
            <TabPrice>
              <Delemiter> / </Delemiter>
              {tab.price} ₽
            </TabPrice>
          </StyledTab>
        ))}
      </StyledTabs>
      <Block onlyOneCard={tabs.length === 1}>
        {loading && <Spinner />}
        <Datepicker>
          <StyledCalendar
            value={currentDate as Date}
            enabledDates={enabledDates}
            onChange={changeCurrentDate}
            isBig={true}
          />

          {/*<FooterWrapper>*/}
          {/*  <TabletFooter />*/}
          {/*</FooterWrapper>*/}
        </Datepicker>
        <SelectTimeContainer>
          <StyledDateHeader>{formattedDate}</StyledDateHeader>
          <Times>
            {times.map(session => (
              <Tag key={session.id}>{session.start_datetime}</Tag>
            ))}
          </Times>
          <ButtonContainer>
            <Link to={routeNames.coachSchedule()}>
              <Button>Редактировать расписание</Button>
            </Link>
          </ButtonContainer>
          {/*<DesktopFooter />*/}
        </SelectTimeContainer>
      </Block>
    </Container>
  )
}
