import { Icon } from "@/oldcomponents/icon/Icon"
import { Input } from "@/oldcomponents/input/Input"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import React from "react"
import styled from "styled-components"
import { PickerDate } from "@/pages/coach/schedule/models/sessions.model"

const Container = styled.div`
  position: relative;
`

const StyledInput = styled(Input)`
  width: 100%;

  ${MediaRange.greaterThan("tablet")`
     width: 248px;
     height: 36px;
  `}
`

const CalendarIcon = styled(Icon).attrs({ name: "calendar" })`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translate(0, -50%);
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
`

export type DatePickerTypes = {
  className?: string
  placeholder?: string
  onFocus?: (e: React.FocusEvent) => void
  onClick?: (e: React.MouseEvent) => void
  onBlur?: (e: React.FocusEvent) => void
  value?: Date | null
}

export const DatePicker: React.FC<DatePickerTypes> = ({ placeholder, value, className, ...props }) => {
  return (
    <Container className={className}>
      <StyledInput withoutBorder value={value ? date(value)?.format("DD-MM-YYYY") : ""} placeholder={placeholder} {...props} />
      <CalendarIcon onClick={props.onClick} />
    </Container>
  )
}
