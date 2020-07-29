import { Icon } from "@/components/icon/Icon"
import { SelectInput } from "@/components/select-input/SelectInput"
import { DurationType } from "@/lib/api/coach-sessions"
import { WeekDayName } from "@/lib/api/coaching-sessions/types"
import { $durationOptions } from "@/pages/coach/schedule/models/add-session.model"
import {
  $freeWeekdayTimes,
  $weekdaySlotsForView,
  addSlot,
  removeSlot,
} from "@/pages/coach/schedule/models/weekday-schedule.model"
import { useEvent, useStore, useStoreMap } from "effector-react/ssr"
import styled from "styled-components"
import React, { useState } from "react"

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

  ${SelectInput}:not(:first-child) {
    margin-left: 4px;
    margin-right: 10px;
  }
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
  width: 55px;
  fill: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
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
            <Prefix style={{ marginLeft: `10px` }}>Тип</Prefix>
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
          <SelectInput
            value={startTime}
            onChange={value => setStartTime((value as unknown) as string)}
            options={freeTimes}
            placeholder='Начало'
          />
          <SelectInput
            value={duration}
            onChange={value => setDuration((value as unknown) as DurationType)}
            options={durationOptions}
            placeholder='Тип'
          />
          <MarkIcon onClick={() => addedSlot({ weekday, startTime, sessionDurationType: duration })} />
        </SettingsContainer>
      )}
    </Container>
  )
})``
