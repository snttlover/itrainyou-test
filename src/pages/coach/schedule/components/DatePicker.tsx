import { Calendar } from "@/components/calendar/Calendar"
import { Icon } from "@/components/icon/Icon"
import { Input, InputTypes } from "@/components/input/Input"
import { date } from "@/lib/formatting/date"
import { Dayjs } from "dayjs"
import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
`

const StyledInput = styled(Input)`
  width: 100%;
`

const CalendarIcon = styled(Icon).attrs({ name: "calendar" })`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translate(0, -50%);
  fill: ${props => props.theme.colors.primary};
`

export type DatePickerTypes = {
  placeholder?: string
  onFocus?: (e: React.FocusEvent) => void
  onBlur?: (e: React.FocusEvent) => void
  value?: Date
}

export const DatePicker: React.FC<DatePickerTypes> = ({ placeholder, value, ...props }) => {
  return (
    <Container>
      <StyledInput withoutBorder value={date(value)?.format("DD-MM-YYYY") || ""} placeholder={placeholder} {...props} />
      <CalendarIcon />
    </Container>
  )
}
