import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import Link from "next/link"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import { Store } from "effector-next"
import { Calendar } from "@/application/components/calendar/Calendar"
import { useStore } from "effector-react"
import { CoachSessionWithSelect } from "@/application/components/coach-card/select-date/select-date.model"

const Block = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px 24px 20px;
  display: flex;
  min-height: 300px;
  @media screen and (max-width: 480px) {
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
  sessionsList: Store<CoachSessionWithSelect[]>
  // @ts-ignore
  toggleSession: Event<CoachSessionWithSelect>
}

const getTimesByDate = (isoDate: string) => {}

const equalDateFormat = `DDMMYYYY`
const equalTimeFormat = `HH:mm`

export const SelectDatetime = (props: SelectDatetimeTypes) => {
  const sessions = useStore(props.sessionsList)

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

  const [activeTime, changeActive] = useState(times[0])

  const selected = sessions
    .filter(session => session.selected)
    .map(session => ({
      ...session,
      date: dayjs(session.startDatetime).format(`DD.MM.YY`),
      time: dayjs(session.startDatetime).format(equalTimeFormat)
    }))

  const amount = selected.reduce((acc, cur) => acc + parseInt(cur.clientPrice), 0)

  return (
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
          <Link href='/signup/1'>
            <BuyButton>Зарегистрироваться</BuyButton>
          </Link>
        </ButtonContainer>
      </SelectTimeContainer>
    </Block>
  )
}
