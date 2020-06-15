import { IsAuthed } from "@/application/feature/user/IsAuthed"
import { IsGuest } from "@/application/feature/user/IsGuest"
import Link from "next/link"
import { useMemo, useState } from "react"
import * as React from "react"
import styled, { css } from "styled-components"
import dayjs from "dayjs"
import { Calendar } from "@/application/components/calendar/Calendar"
import { useEvent, useStore } from "effector-react"
import { Tabs, Tab } from "@/application/components/tabs/Tabs"
import { Spinner } from "@/application/components/spinner/Spinner"
import { Button } from "@/application/components/button/normal/Button"
import { genSessionTabs, SelectDatetimeTypes } from "@/application/components/coach-card/select-date/SelectDatetime"
import { Icon } from "@/application/components/icon/Icon"
import { MediaRange } from "@/application/lib/responsive/media"
import { DurationType } from "@/application/lib/api/coach-sessions"

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

const Tag = styled.div<{ active?: boolean }>`
  cursor: pointer;
  width: 46px;
  margin-right: 8px;
  display: flex;
  flex-direction: row;
  padding: 2px 8px;
  background: ${({ active }) => (active ? `#4858CC` : `#fff`)};
  color: ${({ active }) => (active ? `#fff` : `#5B6670`)};
  box-sizing: border-box;
  border-radius: 24px;
  font-size: 12px;
  line-height: 16px;
  ${MediaRange.greaterThan("tablet")`
    &:hover {
      background: #DBDEE0;
      color: #fff;
    }
  `}
`

const DeleteIcon = styled(Icon).attrs({ name: `delete` })`
  fill: #4858cc;
  width: 15px;
  height: 15px;
  cursor: pointer;
`

const RubleIcon = styled(Icon).attrs({ name: `ruble` })`
  width: 15px;
  height: 15px;
  fill: #4858cc;
`

const SummaryRuble = styled(RubleIcon)`
  width: 20px;
  height: 20px;
`

const Summary = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #4858cc;
  display: flex;
  align-items: center;
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

const SelectedSessions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 27px;
  padding-bottom: 16px;
`

const SelectedSession = styled.div`
  display: flex;
  margin-top: 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid #efefef;
  width: 216px;
  align-items: center;
  &:first-child {
    margin-top: 0;
  }

  ${MediaRange.lessThan(`mobile`)`
    width: 252px;
  `}
`

const SessionDate = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  margin-right: 8px;
`

const SessionTime = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  color: #424242;
  flex: 1;
`

const SessionPrice = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #424242;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled(Button)`
  padding: 4px 24px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`

const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 216px;
  margin: 0 auto;
  ${MediaRange.lessThan(`mobile`)`
    width: 252px;
  `}
`

const AmountText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
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

export const CoachDatepicker = (props: SelectDatetimeTypes) => {
  const sessions = useStore(props.sessionsData.sessionsList)
  const loading = useStore(props.sessionsData.loading)
  const buyLoading = useStore(props.sessionsData.buySessionsLoading)
  const activeTab = useStore(props.sessionsData.tabs.$durationTab)
  const changeActiveTab = useEvent(props.sessionsData.tabs.changeDurationTab)
  const deleteSession = useEvent(props.sessionsData.deleteSession)
  const tabs = useMemo(() => genSessionTabs(props.coach), [props.coach])

  const [currentDate, changeCurrentDate] = useState<Date | null>()
  const pinnedDates = sessions.map(session => session.startDatetime)

  const headerDate = currentDate ? currentDate : new Date()
  const formattedDate = dayjs(headerDate).format("DD MMMM")
  const currentDateEqual = dayjs(currentDate as Date).format(equalDateFormat)

  const times = sessions
    .filter(session => {
      return dayjs(session.startDatetime).format(equalDateFormat) === currentDateEqual
    })
    .map(session => ({
      ...session,
      start_datetime: dayjs(session.startDatetime).format(equalTimeFormat),
    }))

  const selected = sessions
    .filter(session => session.selected)
    .map(session => ({
      ...session,
      date: dayjs(session.startDatetime).format(`DD.MM.YY`),
      time: dayjs(session.startDatetime).format(equalTimeFormat),
    }))

  const amount = selected.reduce((acc, cur) => acc + parseInt(cur.clientPrice), 0)

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
            pinnedDates={pinnedDates}
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
              <Tag active={session.selected} key={session.id} onClick={() => props.sessionsData.toggleSession(session)}>
                {session.start_datetime}
              </Tag>
            ))}
          </Times>
          <SelectedSessions>
            {selected.map(session => (
              <SelectedSession key={session.id}>
                <SessionDate>{session.date}</SessionDate>
                <SessionTime>{session.time}</SessionTime>
                <SessionPrice>
                  {session.clientPrice}
                  <RubleIcon />
                </SessionPrice>
                <DeleteIcon onClick={() => deleteSession(session.id)} />
              </SelectedSession>
            ))}
          </SelectedSessions>
          <Amount>
            <AmountText>Итого:</AmountText>
            <Summary>
              {amount} <SummaryRuble />
            </Summary>
          </Amount>
          <ButtonContainer>
            <IsAuthed>
              <StyledButton
                disabled={buyLoading || selected.length === 0}
                onClick={() => props.sessionsData.buySessionBulk(selected.map(item => item.id))}
              >
                Купить
              </StyledButton>
            </IsAuthed>
            <IsGuest>
              <Link href='/auth/signup/[step]' as='/auth/signup/1'>
                <StyledButton>Зарегистрироваться</StyledButton>
              </Link>
            </IsGuest>
          </ButtonContainer>
          {/*<DesktopFooter />*/}
        </SelectTimeContainer>
      </Block>
    </Container>
  )
}
