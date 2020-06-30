import { Icon } from "@/components/icon/Icon"
import { Input } from "@/components/input/Input"
import { date } from "@/lib/formatting/date"
import React from "react"
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
  cursor: pointer;
`

export type DatePickerTypes = {
  className?: string
  placeholder?: string
  onFocus?: (e: React.FocusEvent) => void
  onClick?: (e: React.MouseEvent) => void
  onBlur?: (e: React.FocusEvent) => void
  value?: Date
}

export const DatePicker: React.FC<DatePickerTypes> = ({ placeholder, value, className, ...props }) => {
  return (
    <Container className={className}>
      <StyledInput withoutBorder value={date(value)?.format("DD-MM-YYYY") || ""} placeholder={placeholder} {...props} />
      <CalendarIcon onClick={props.onClick} />
    </Container>
  )
}
