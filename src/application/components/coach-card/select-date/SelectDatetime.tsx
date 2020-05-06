import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import Link from "next/link"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import { Store } from "effector-next"
import { Calendar } from "@/application/components/calendar/Calendar"
import { useStore } from "effector-react"
import {Tabs, Tab} from "@/application/components/tabs/Tabs"
import { CoachSessionWithSelect } from "@/application/components/coach-card/select-date/select-date.model"
import { Coach } from "@/application/lib/api/coach"

const Block = styled.div`
  background: #ffffff;
  border-radius: 2px;
  padding: 24px 24px 20px;
  display: flex;
  min-height: 300px;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 560px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

const Datepicker = styled.div`
  min-width: 224px;
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 560px) {
    margin-bottom: 20px;
  }
`

const SelectTimeContainer = styled.div`
  margin-left: 36px;
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

const Tag = styled.div<{ disabled?: boolean; active?: boolean }>`
  background: ${props => {
    if (props.disabled) return "#DDD9E3"
    else if (props.active) return "#544274"
    else return "#FFFFFF"
  }};
  transition: all 300ms ease;

  border: 1px solid #544274;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 2px 6px;
  margin-left: 8px;
  margin-top: 8px;

  font-size: 12px;
  line-height: 16px;
  color: ${({ active }) => (active ? "#FFFFFF" : "#424242")};
  cursor: pointer;
  user-select: none;
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
  font-size: 12px;
  line-height: 16px;
`

const Summary = styled.span`
  color: #544274;
  font-weight: 600;
`

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
`

const BuyButton = styled(DashedButton)`
  border: 1px solid #544274;
  color: #544274;
`

type SelectDatetimeTypes = {
  coach: Coach
  sessionsList: Store<CoachSessionWithSelect[]>
  // @ts-ignore
  toggleSession: Event<CoachSessionWithSelect>
}

const StyledTabs = styled(Tabs)`
  margin-top: 4px;
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

type TimeTabType = {
  timeInMinutes: number
  price: number
}

const equalDateFormat = `DDMMYYYY`
const equalTimeFormat = `HH:mm`

export const SelectDatetime = (props: SelectDatetimeTypes) => {
  const sessions = useStore(props.sessionsList)

  const tabs = Object.keys(props.coach.prices).map((key): TimeTabType => ({
    timeInMinutes: parseInt(key.replace( /^\D+/g, '')) as number,
    price: props.coach.prices[key] as number
  }))

  const [activeTab, changeActiveTab] = useState((tabs[0] as TimeTabType).timeInMinutes)

  const [currentDate, changeCurrentDate] = useState<Date>(new Date())
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
          <Tab value={tab.timeInMinutes}>
            <TabTime>{tab.timeInMinutes} мин</TabTime>
            <TabPrice>/{tab.price}</TabPrice>
          </Tab>
        ))}
      </StyledTabs>
      <Block>
        <Datepicker>
          <Calendar value={currentDate} pinnedDates={pinnedDates} onChange={changeCurrentDate} />
        </Datepicker>
        <SelectTimeContainer>
          <h5>{formattedDate}</h5>
          <Times>
            {times.map(session => (
              <Tag active={session.selected} key={session.id} onClick={() => props.toggleSession(session)}>
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
                <td>{session.time}</td>
              </tr>
            ))}
            </tbody>
          </SelectedDatetimeTable>
          <Text>
            Итого: <Summary>{amount} ₽</Summary>
          </Text>
          <ButtonContainer>
            <Link href='/signup/[step]' as='/signup/1'>
              <BuyButton>Зарегистрироваться</BuyButton>
            </Link>
          </ButtonContainer>
        </SelectTimeContainer>
      </Block>
    </>
  )
}
