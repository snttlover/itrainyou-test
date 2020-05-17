import Link from "next/link"
import { useMemo, useState } from "react"
import * as React from "react"
import styled, { css } from "styled-components"
import dayjs from "dayjs"
import { Store } from "effector-next"
import { Calendar } from "@/application/components/calendar/Calendar"
import { useEvent, useStore } from "effector-react"
import {Tabs, Tab} from "@/application/components/tabs/Tabs"
import { CoachSessionWithSelect } from "@/application/components/coach-card/select-date/select-date.model"
import { Coach } from "@/application/lib/api/coach"
import { Spinner } from "@/application/components/spinner/Spinner"
import { Button } from "@/application/components/button/normal/Button"
import { DurationType } from "@/application/lib/api/coach-sessions"
import {Event} from "effector-next"
import { MediaRange } from "@/application/lib/responsive/media"

type StyledTabTypes = {
  onlyOneCard: boolean
}

const Block = styled.div<StyledTabTypes>`
  background: #ffffff;
  border-radius: 2px;
  padding: 24px 24px 20px;
  padding-top: ${props => props.onlyOneCard ? 0 : 24}px;
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
  border-right: 1px solid #DBDEE0;
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
`

const Tag = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 2px 8px;
  background: ${({active}) => active ? `#4858CC` : `#fff`};
  color: ${({active}) => active ? `#fff` : `#5B6670`};
  box-sizing: border-box;
  border-radius: 24px;
  font-size: 12px;
  line-height: 16px;
  ${MediaRange.greaterThan('tablet')`
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
  color: #5B6670;
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
  border-top: 1px solid #DBDEE0;
  padding-top: 10px;
  margin-left: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export type SelectDatetimeTypes = {
  coach: Coach
  sessionsData: {
    loading: Store<boolean>,
    sessionsList: Store<CoachSessionWithSelect[]>
    toggleSession: Event<CoachSessionWithSelect>
    deleteSession: Event<number>
    tabs: {
      $durationTab: Store<DurationType>,
      changeDurationTab: Event<DurationType>
    }
  }
}

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
`

const StyledTab = styled(Tab)<StyledTabTypes>`
  ${props => props.onlyOneCard && OnlyOneTabStyles}
`

const TabTime = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #5B6670;
`

const TabPrice = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #9AA0A6;
`

const TimeColumn = styled.td`
  color: #9AA0A6;
`

const StyledCalendar = styled(Calendar)`
  max-width: 252px;
`

export const genSessionTabs = (coach: Coach) => {
  return Object.keys(coach.prices)
    .filter(key => coach.prices[key as DurationType] !== null)
    .map((key) => ({
      timeInMinutes: parseInt(key.replace( /^\D+/g, '')) as number,
      key: key as DurationType,
      price: Math.ceil(coach.prices[key as DurationType] as number)
    }))
}

const equalDateFormat = `DDMMYYYY`
const equalTimeFormat = `HH:mm`

export const SelectDatetime = (props: SelectDatetimeTypes) => {
  const tabs = useMemo(() => genSessionTabs(props.coach), [props.coach])

  const sessions = useStore(props.sessionsData.sessionsList)
  const loading = useStore(props.sessionsData.loading)
  const activeTab = useStore(props.sessionsData.tabs.$durationTab)
  const changeActiveTab = useEvent(props.sessionsData.tabs.changeDurationTab)

  const [currentDate, changeCurrentDate] = useState<Date | undefined>()
  const pinnedDates = sessions.map(session => session.startDatetime)

  const formattedDate = dayjs(currentDate).format("DD MMMM")
  const currentDateEqual = dayjs(currentDate).format(equalDateFormat)
  const times = sessions
    .filter(session => {
      return dayjs(session.startDatetime).format(equalDateFormat) === currentDateEqual
    })
    .map(session => ({
      ...session,
      start_datetime: dayjs(session.startDatetime).format(equalTimeFormat)
    }))

  const selected = sessions
    .filter(session => session.selected)
    .map(session => ({
      ...session,
      date: dayjs(session.startDatetime).format(`DD.MM.YY`),
      time: dayjs(session.startDatetime).format(equalTimeFormat)
    }))

  const amount = selected.reduce((acc, cur) => acc + parseInt(cur.clientPrice), 0)

  return (
    <>
      <StyledTabs value={activeTab} onChange={changeActiveTab}>
        {tabs.map(tab => (
          <StyledTab key={tab.key} value={tab.key} onlyOneCard={tabs.length === 1}>
            <TabTime>{tab.timeInMinutes} мин</TabTime>
            <TabPrice>/{tab.price} ₽</TabPrice>
          </StyledTab>
        ))}
      </StyledTabs>
      <Block onlyOneCard={tabs.length === 1}>
        { loading && <Spinner /> }
        <Datepicker>
          <StyledCalendar value={currentDate} pinnedDates={pinnedDates} onChange={changeCurrentDate} isBig={true} />
        </Datepicker>
        <SelectTimeContainer>
          <h5>{formattedDate}</h5>
          <Times>
            {times.map(session => (
              <Tag active={session.selected} key={session.id} onClick={() => props.sessionsData.toggleSession(session)}>
                {session.start_datetime}
              </Tag>
            ))}
          </Times>
          <Divider />
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
          <Text>
            Итог: {amount} ₽
          </Text>
          <ButtonContainer>
            <ButtonWrapper>
              <Link href='/signup/[step]' as='/signup/1'>
                <Button>Зарегистрироваться</Button>
              </Link>
            </ButtonWrapper>
          </ButtonContainer>
        </SelectTimeContainer>
      </Block>
    </>
  )
}
