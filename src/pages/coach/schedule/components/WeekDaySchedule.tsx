import { Icon } from "@/components/icon/Icon"
import { useSelectInput } from "@/components/select-input/SelectInput"
import { DurationType } from "@/lib/api/coach-sessions"
import { WeekDayName } from "@/lib/api/coaching-sessions/types"
import { $durationOptions } from "@/pages/coach/schedule/models/add-session.model"
import {
  $freeWeekdayTimes,
  $weekdaySlotsForView,
  addSlot,
  removeSlot,
} from "@/pages/coach/schedule/models/weekday-schedule.model"
import { useEvent, useStore, useStoreMap } from "effector-react"
import styled from "styled-components"
import React, { useState } from "react"
import { PricesDialog } from "@/pages/coach/schedule/components/PricesDialog"
import { $numberOfSessions } from "@/pages/coach/home/sessions/coach-sessions-page.model"
import { MediaRange } from "@/lib/responsive/media"

const Container = styled.div`
  background: #ffffff;
  border-radius: 2px;
  padding: 8px;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #424242;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`

const Prefix = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #5b6670;
`
const Value = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 4px;
`

const OpenCloseIcon = styled(Icon)<{ open?: boolean }>`
  width: 22px;
  transform: rotate(${({ open }) => (open ? "45deg" : "0")});
  fill: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`

const MarkIcon = styled(Icon).attrs({ name: "mark" })`
  fill: ${({ theme, disabled }) => disabled ? "#9AA0A6" : theme.colors.primary};
  cursor: pointer;
  position: relative;
`

const MarkIconContainer = styled.div<{ active?: boolean | undefined }>`
  position: relative;
  &::before{
    display: ${({active}) => active ? "block" : "none"};
    content: "";
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    position: absolute;
    right: 0;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
    transform: rotate(45deg) translateX(94%) translateY(-10px);
    ${MediaRange.lessThan("mobile")`
      width: 0;
      height: 0;
      top: 36px;
      left: -100%;
      box-shadow: none;
      background-color: transparent;
      border: 12px solid transparent; border-right: 12px solid #F7F7FF; border-bottom: 12px solid #F7F7FF;
      transform: rotate(0deg) translateX(50%) translateY(-10px);
    `}
  }
  &::after{
    content: "Для сохранения нажмите галочку" ;
    display: ${({active}) => active ? "block" : "none"};
    font-size: 14px;
    white-space: nowrap;
    background-color: #ffffff;
    position: absolute;
    right: 0;
    top: -50%;
    padding: 12px;
    border-radius: 2px;
    box-shadow: 0px 26px 18px rgba(0, 0, 0, 0.1);
    transform: translateX(104%) translateY(23%);
    z-index: 1;
    ${MediaRange.lessThan("mobile")`
      transform: translateX(0) translateY(150%);
    `}
  }
`

const MinusIcon = styled(Icon).attrs({ name: "minus" })`
  width: 14px;
  margin-right: 4px;
  fill: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`

type Props = {
  title: string
  weekday: WeekDayName
  className?: string
}

export const WeekDaySchedule = styled(({ title, className, weekday }: Props) => {

  const {SelectInput: StartSelectInput} = useSelectInput()
  const {SelectInput: TypeSelectInput} = useSelectInput()

  const StyledStartSelectInput = styled(StartSelectInput)`
    &:not(:first-child) {
      margin-left: 4px;
      margin-right: 10px;
    }
  `

  const StyledTypeSelectInput = styled(TypeSelectInput)`
    &:not(:first-child) {
      margin-left: 4px;
      margin-right: 10px;
    }
  `

  const [isAdd, setIsAdd] = useState(false)
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState<DurationType>("D30")

  const freeTimes = useStoreMap({
    store: $freeWeekdayTimes,
    keys: [weekday],
    fn: (freeTimes, [weekday]) => freeTimes.find(times => times.weekday === weekday)?.times || [],
  })

  const sessions = useStoreMap({
    store: $weekdaySlotsForView,
    keys: [weekday],
    fn: (weekdaySlots, [weekday]) => weekdaySlots.find(weekdaySlot => weekdaySlot.weekday === weekday)?.slots || [],
  })

  const durationOptions = useStore($durationOptions)

  const deleteSlot = useEvent(removeSlot)
  const addedSlot = useEvent(addSlot)

  const [pricesDialogVisibility, changePricesDialogVisibility] = useState(false)

  const checkPrices = () => {
    if (!durationOptions.length) {
      changePricesDialogVisibility(true)
    }
  }

  const saveSessionHandler = () => {
    startTime && addedSlot({ weekday, startTime, sessionDurationType: duration }) && setStartTime("")
  }

  const showTooltips = useStore($numberOfSessions) < 4

  return (
    <Container className={className}>
      <Title>
        {title}{" "}
        {sessions.length === 0 && <OpenCloseIcon name={"cross"} open={!isAdd} onClick={() => setIsAdd(!isAdd)} />}
      </Title>
      {sessions.map(session => (
        <Row key={session.id}>
          <div>
            <Prefix>Начало</Prefix>
            <Value>{session.startTime}</Value>
            <Prefix style={{ marginLeft: "10px" }}>Тип</Prefix>
            <Value>{session.duration} мин</Value>
          </div>
          <MinusIcon onClick={() => deleteSlot({ weekday, slotId: session.id })} />
        </Row>
      ))}
      {sessions.length > 0 && (
        <Row>
          <div /> <OpenCloseIcon name={"cross"} open={!isAdd} onClick={() => setIsAdd(!isAdd)} />
        </Row>
      )}
      {isAdd && (
        <SettingsContainer>
          <StyledStartSelectInput
            value={startTime}
            onChange={value => setStartTime((value as unknown) as string)}
            options={freeTimes}
            placeholder='Начало'
          />
          <StyledTypeSelectInput
            value={duration}
            onChange={value => setDuration((value as unknown) as DurationType)}
            options={durationOptions}
            placeholder='Тип'
            onClick={checkPrices}
          />
          <MarkIconContainer active={showTooltips && !!startTime}>
            <MarkIcon disabled={!startTime} onClick={saveSessionHandler} />
          </MarkIconContainer>
        </SettingsContainer>
      )}
      <PricesDialog visibility={pricesDialogVisibility} onChangeVisibility={changePricesDialogVisibility} />
    </Container>
  )
})``
