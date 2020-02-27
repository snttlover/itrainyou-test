import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import * as dayjs from "dayjs"

const Block = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px 24px 20px;
  display: flex;
  min-height: 300px;
`

const Datepicker = styled.div`
  min-width: 224px;
  height: 210px;
  background: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const SelectDatetime = () => {
  const formattedDate = dayjs().format("DD MMMM")
  const times = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "00:00"]
  const selected = [
    { date: "22.04.19", time: "12:00" },
    { date: "23.04.19", time: "12:00" }
  ]

  const [activeTime, changeActive] = useState("08:00")

  return (
    <Block>
      <Datepicker>Календарь для выбора даты</Datepicker>
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
          {selected.map(datetime => (
            <tr key={datetime.date + datetime.time}>
              <td>{datetime.date}</td>
              <td>{datetime.time}</td>
            </tr>
          ))}
        </SelectedDatetimeTable>
        <Text>
          Итого: <Summary>2400 ₽</Summary>
        </Text>
        <ButtonContainer>
          <BuyButton>Зарегистрироваться</BuyButton>
        </ButtonContainer>
      </SelectTimeContainer>
    </Block>
  )
}
