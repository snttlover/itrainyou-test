import { Icon } from "@/old-components/icon/Icon"
import { DropDown } from "@/new-components/dropdown/DropDownItem"
import { DurationType } from "@/lib/api/coach-sessions"
import { WeekDayName } from "@/lib/api/coaching-sessions/types"
import { $durationOptions } from "@/pages/coach/schedule/models/add-session.model"
import {
  $freeWeekdayTimes,
  $weekdaySlotsForView,
  addSlot, checkDurationPrice,
  removeSlot,
} from "@/pages/coach/schedule/models/weekday-schedule.model"
import { useEvent, useStore, useStoreMap } from "effector-react"
import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { PricesDialog } from "@/pages/coach/schedule/components/PricesDialog"
import { $numberOfSessions } from "@/pages/coach/home/sessions/coach-sessions-page.model"
import { MediaRange } from "@/lib/responsive/media"

const Container = styled.div`
  background: #ffffff;
  border: 2px solid #F4F5F7;
  border-radius: 8px;
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
  position: relative;
`

const SelectBoxContainer = styled.div`
  width: 130px;
  margin-right: 10px;
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

  & a {
    color: ${props => props.theme.colors.primary};
    font-weight: 1000;
  }
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
    width: 15px;
    height: 15px;
    background-color: #ffffff;
    position: absolute;
    top: 9px;
    right: -17px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
    transform: rotate(45deg);
    ${MediaRange.lessThan("tablet")`
      content: "???";
      color: #fff;
      transform: unset;
      box-shadow: unset;
      text-shadow: 0 0 10px rgba(0, 0, 0, .2);
      top: 22px;
      left: -1px;
    `}
  }
  &::after{
    content: "?????? ???????????????????? ?????????????? ??????????????" ;
    display: ${({active}) => active ? "block" : "none"};
    font-size: 14px;
    white-space: nowrap;
    background-color: #ffffff;
    position: absolute;
    right: 0;
    top: -50%;
    padding: 12px;
    border-radius: 2px 0 2px 2px;
    box-shadow: 15px 0px 18px rgba(0, 0, 0, 0.1);
    transform: translateX(104%) translateY(23%);
    z-index: 1;
    ${MediaRange.lessThan("tablet")`
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
      top: 37px;
      right: 13px;
      transform: unset;
    `}
  }
`

const PercentsIcon = styled(Icon).attrs({ name: "percents" })`
  width: 16px;
  height: 16px;
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

  const [isAdd, setIsAdd] = useState(false)
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState<DurationType>("D30")

  useEffect(() => {
    _checkDurationPrice(duration)
  }, [duration, startTime])

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
    // @ts-ignore
    startTime && addedSlot({ weekday, startTime, sessionDurationType: duration }) && setStartTime("")
  }

  const showTooltips = useStore($numberOfSessions) < 4

  const _checkDurationPrice = useEvent(checkDurationPrice)

  return (
    <Container className={className}>
      <Title>
        {title}{" "}
        {sessions.length === 0 && <OpenCloseIcon name={"cross"} open={!isAdd} onClick={() => setIsAdd(!isAdd)} />}
      </Title>
      {sessions.map(session => (
        <Row key={session.id}>
          <div>
            <Prefix>????????????</Prefix>
            <Value>{session.startTime}</Value>
            <Prefix style={{ marginLeft: "10px" }}>??????</Prefix>
            <Value>{session.duration === "ROMO" ? <> <a>%</a> ??????????</> : `${session.duration} ??????`}</Value>
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
          <SelectBoxContainer>
            <DropDown
              value={startTime}
              onChange={value => setStartTime((value as unknown) as string)}
              options={freeTimes}
              placeholder='??????????'
            />
          </SelectBoxContainer>
          <SelectBoxContainer>
            <DropDown
              value={duration}
              onChange={value => setDuration((value as unknown) as DurationType)}
              options={durationOptions}
              placeholder='??????'
              onClick={checkPrices}
            />
          </SelectBoxContainer>
          <MarkIconContainer active={showTooltips && !!startTime}>
            <MarkIcon disabled={!startTime} onClick={saveSessionHandler} />
          </MarkIconContainer>

          {/*<Tooltip active={true}/>*/}
        </SettingsContainer>
      )}
      <PricesDialog visibility={pricesDialogVisibility} onChangeVisibility={changePricesDialogVisibility} />
    </Container>
  )
})``
