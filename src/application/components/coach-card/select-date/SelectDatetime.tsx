import { DashedButton } from "@app/components/button/dashed/DashedButton"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import * as dayjs from "dayjs"
import { Link } from "@reach/router"
import { Store } from "effector"
import { CoachSession } from "@app/lib/api/coach-sessions"
import { Calendar, CalendarDateType } from "@app/components/calendar/Calendar"
import { useStore } from "effector-react"

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
    color: #424242;
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
  color: #424242;
  width: 100px;
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
  sessionsList: Store<CoachSession[]>
}

const getTimesByDate = (isoDate: string) => {}

const equalDateFormat = `DDMMYYYY`
const equalTimeFormat = `HH:mm`

export const SelectDatetime = (props: SelectDatetimeTypes) => {
  const sessions = useStore(props.sessionsList)

  const [currentDate, changeCurrentDate] = useState<Date>(new Date())
  const pinnedDates = sessions.map(session => session.start_datetime)

  const formattedDate = dayjs(currentDate).format("DD MMMM")
  const currentDateEqual = dayjs(currentDate).format(equalDateFormat)
  const times = sessions
    .filter(session => {
      return dayjs(session.start_datetime).format(equalDateFormat) === currentDateEqual
    })
    .map(session => dayjs(session.start_datetime).format(equalTimeFormat))

  const [activeTime, changeActive] = useState(times[0])

  const selected = sessions
    .filter(session => {
      return dayjs(session.start_datetime).format(equalTimeFormat) === activeTime
    })
    .map(session => ({
      date: dayjs(session.start_datetime).format(`DD.MM.YYYY`),
      time: activeTime
    }))

  return (
    <Block>
      <Datepicker>
        <Calendar value={currentDate} pinnedDates={pinnedDates} onChange={changeCurrentDate} />
      </Datepicker>
      <SelectTimeContainer>
        <h5>{formattedDate}</h5>
        <Times>
          {times.map(time => (
            <Tag active={time === activeTime} key={time} onClick={() => changeActive(time)}>
              {time}
            </Tag>
          ))}
        </Times>
        <Divider />
        <SelectedDatetimeTable>
          <tbody>
            {selected.map(datetime => (
              <tr key={datetime.date + datetime.time}>
                <td>{datetime.date}</td>
                <td>{datetime.time}</td>
              </tr>
            ))}
          </tbody>
        </SelectedDatetimeTable>
        <Text>
          Итого: <Summary>2400 ₽</Summary>
        </Text>
        <ButtonContainer>
          <Link to='/signup'>
            <BuyButton>Зарегистрироваться</BuyButton>
          </Link>
        </ButtonContainer>
      </SelectTimeContainer>
    </Block>
  )
}
