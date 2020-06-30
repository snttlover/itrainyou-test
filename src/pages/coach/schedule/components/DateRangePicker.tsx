import { Calendar } from "@/components/calendar/Calendar"
import { useClickOutside } from "@/components/click-outside/use-click-outside"
import { date } from "@/lib/formatting/date"
import { DatePicker } from "@/pages/coach/schedule/components/DatePicker"
import styled from "styled-components"
import React, { useRef, useState } from "react"

const Container = styled.div`
  display: flex;
  position: relative;
`

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  z-index: 2;
  left: 50%;
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  transform: translate(-50%, 0);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12), 2px 4px 8px rgba(0, 0, 0, 0.16);
  width: 220px;
`

const StyledDatePicker = styled(DatePicker)`
  &:nth-of-type(2) {
    margin-left: 8px;
  }
`

export const DateRangePicker: React.FC<{ className?: string }> = ({ className }) => {
  const [isOpen, setOpen] = useState(false)
  const [range, setRange] = useState([date().toDate(), date().add(3, "day").toDate()])
  const dropdownRef = useRef(null)
  useClickOutside(dropdownRef, () => setOpen(false))
  return (
    <Container className={className}>
      <StyledDatePicker placeholder='От' value={range[0]} onFocus={() => setOpen(true)} />
      <StyledDatePicker placeholder='До' value={range[1]} onFocus={() => setOpen(true)} />
      {isOpen && (
        <Dropdown ref={dropdownRef}>
          <Calendar value={range} onChange={setRange} selectRange />
        </Dropdown>
      )}
    </Container>
  )
}
