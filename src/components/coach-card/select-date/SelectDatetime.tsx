import { IsAuthed } from "@/feature/user/IsAuthed"
import { IsGuest } from "@/feature/user/IsGuest"
import { date } from "@/lib/formatting/date"
import { useEffect, useMemo, useState } from "react"
import * as React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import { Calendar } from "@/components/calendar/Calendar"
import { useEvent, useStore } from /* ITS RIGHT!!! don't use effector-react/ssr */ "effector-react"
import { Event, Store } from "effector-root"
import { Tabs, Tab } from "@/components/tabs/Tabs"
import { CoachSessionWithSelect } from "@/components/coach-card/select-date/select-date.model"
import { Coach } from "@/lib/api/coach"
import { Spinner } from "@/components/spinner/Spinner"
import { Button } from "@/components/button/normal/Button"
import { DurationType } from "@/lib/api/coach-sessions"
import { MediaRange } from "@/lib/responsive/media"
import { showCreditCardsModal } from "@/pages/search/coach-by-id/coach-by-id.model"
import { SelectCreditCardDialog } from "@/pages/search/content/list/content/CoachModalBuySession"
import { showWithConditionWrapper } from "@/lib/hoc/showWithConditionWrapper"

type StyledTabTypes = {
  onlyOneCard: boolean
}

type BulkBookSessionsRequest = {
  sessions: number[]
  card: number
}

const Block = styled.div<StyledTabTypes>`
  background: #ffffff;
  border-radius: 2px;
  padding: 24px 24px 20px;
  padding-top: ${props => (props.onlyOneCard ? 0 : 24)}px;
  display: flex;
  min-height: 300px;
  position: relative;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 560px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

const Datepicker = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #dbdee0;
  padding-right: 32px;
  padding-left: 5px;
  @media screen and (max-width: 560px) {
    margin-bottom: 20px;
  }
`

const SelectTimeContainer = styled.div`
  width: 50%;
  padding-left: 36px;
  display: flex;
  flex-direction: column;

  & > h5 {
    margin-left: 8px;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
`

const Times = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
  padding-left: 3px;
`

const Tag = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 2px 8px;
  background: ${({ active }) => (active ? "#4858CC" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#5B6670")};
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

const Divider = styled.div`
  background: #efefef;
  height: 1px;
  margin-top: 8px;
  margin-bottom: 20px;
`

const SelectedDatetimeTable = styled.table`
  font-size: 12px;
  line-height: 16px;
  width: 100px;
  padding-left: 11px;
  & tr td:first-child {
    padding-right: 24px;
  }
`

const Text = styled.div`
  margin-top: 32px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
  padding-left: 11px;
`

const Summary = styled.span`
  color: #544274;
  font-weight: 600;
`

const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
`

const ButtonWrapper = styled.div`
  border-top: 1px solid #dbdee0;
  padding-top: 10px;
  margin-left: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const StyledTabs = styled(Tabs)`
  margin-top: 4px;
  width: 100%;
  position: relative;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const OnlyOneTabStyles = css`
  justify-content: flex-end;
  padding-top: 16px;
  padding-bottom: 8px;
  padding-right: 24px;
`

const StyledTab = styled(Tab)<StyledTabTypes>`
  ${props => props.onlyOneCard && OnlyOneTabStyles}
`

const TabTime = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
`

const TabPrice = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;
`

const TimeColumn = styled.td`
  color: #9aa0a6;
`

const SelectDateHeader = styled.div`
  padding-left: 11px;
  font-size: 14px;
  color: #5b6670;
`

const StyledCalendar = styled(Calendar)`
  max-width: 252px;
`

export const genSessionTabs = (coach: Coach) => {
  return Object.keys(coach.prices)
    .filter(
      key =>
        coach.prices[key as DurationType] !== null &&
        ((coach.prices[key as DurationType] as unknown) as string) !== "None"
    )
    .map(key => ({
      timeInMinutes: parseInt(key.replace(/^\D+/g, "")) as number,
      key: key as DurationType,
      price: Math.ceil(coach.prices[key as DurationType] as number),
    }))
}

const equalDateFormat = "DDMMYYYY"
const equalTimeFormat = "HH:mm"

export type SelectDatetimeTypes = {
  coach: Coach
  sessionsData: {
    loading: Store<boolean>
    sessionsList: Store<CoachSessionWithSelect[]>
    toggleSession: Event<CoachSessionWithSelect>
    deleteSession: Event<number>
    tabs: {
      $durationTab: Store<DurationType>
      changeDurationTab: Event<DurationType>
    }
    buySessionsLoading: Store<boolean>
    buySessionBulk: Event<BulkBookSessionsRequest>
  }
}

export const SelectDatetime = (props: SelectDatetimeTypes) => {
  const _showCreditCardsModal = useEvent(showCreditCardsModal)
  const tabs = useMemo(() => genSessionTabs(props.coach), [props.coach])

  const sessions = useStore(props.sessionsData.sessionsList)
  const loading = useStore(props.sessionsData.loading)
  const buyLoading = useStore(props.sessionsData.buySessionsLoading)
  const activeTab = useStore(props.sessionsData.tabs.$durationTab)
  const changeActiveTab = useEvent(props.sessionsData.tabs.changeDurationTab)
  const buySessionBulk = useEvent(props.sessionsData.buySessionBulk)

  const enabledDates = sessions.map(session => session.startDatetime)
  const [currentDate, changeCurrentDate] = useState<Date | null>(null)

  useEffect(() => {
    changeCurrentDate(date(enabledDates[0]).toDate())
  }, [activeTab, enabledDates[0]])

  const formattedDate = date(currentDate || date()).format("DD MMMM")
  const currentDateEqual = date(currentDate || date()).format(equalDateFormat)

  if (!props.coach.prices[activeTab] && tabs.length) {
    changeActiveTab(tabs[0].key)
  }

  const times = sessions
    .filter(session => {
      return date(session.startDatetime).format(equalDateFormat) === currentDateEqual
    })
    .map(session => ({
      ...session,
      start_datetime: date(session.startDatetime).format(equalTimeFormat),
    }))

  const selected = sessions
    .filter(session => session.selected)
    .map(session => ({
      ...session,
      date: date(session.startDatetime).format("DD.MM.YY"),
      time: date(session.startDatetime).format(equalTimeFormat),
    }))

  const amount = selected.reduce((acc, cur) => acc + parseInt(cur.clientPrice), 0)
  
  const WidthAmountConditionWrapper = showWithConditionWrapper(!!amount)
  return (
    <>
      <SelectCreditCardDialog coach={props.coach} sessionsData={props.sessionsData} />
      <StyledTabs value={activeTab} onChange={changeActiveTab}>
        {tabs.map(tab => (
          <StyledTab key={tab.key} value={tab.key} onlyOneCard={tabs.length === 1}>
            <TabTime>{tab.timeInMinutes} мин</TabTime>
            <TabPrice>/{tab.price} ₽</TabPrice>
          </StyledTab>
        ))}
      </StyledTabs>
      <Block onlyOneCard={tabs.length === 1}>
        {loading && <Spinner />}
        <Datepicker>
          <StyledCalendar
            value={currentDate}
            startFrom={date(enabledDates[0]).toDate()}
            enabledDates={enabledDates}
            onChange={changeCurrentDate}
            isBig={true}
          />
        </Datepicker>
        <SelectTimeContainer>
          <SelectDateHeader>{formattedDate}</SelectDateHeader>
          <Times>
            {times.map(session => (
              <Tag active={session.selected} key={session.id} onClick={() => props.sessionsData.toggleSession(session)}>
                {session.start_datetime}
              </Tag>
            ))}
          </Times>
          <Divider />
          <WidthAmountConditionWrapper>
            <SelectedDatetimeTable>
              <tbody>
                {selected.map(session => (
                  <tr key={session.id}>
                    <td>{session.date}</td>
                    <TimeColumn>{session.time}</TimeColumn>
                  </tr>
                ))}
              </tbody>
            </SelectedDatetimeTable>
            <Text>Итог: {amount} ₽</Text>
          </WidthAmountConditionWrapper>
          <ButtonContainer>
            <ButtonWrapper>
              <IsAuthed>
                <Button
                  disabled={buyLoading || selected.length === 0}
                  onClick={() => _showCreditCardsModal()}
                >
                  Забронировать
                </Button>
              </IsAuthed>
              <IsGuest>
                <Link to='/auth/signup/1'>
                  <Button>Зарегистрироваться</Button>
                </Link>
              </IsGuest>
            </ButtonWrapper>
          </ButtonContainer>
        </SelectTimeContainer>
      </Block>
    </>
  )
}
