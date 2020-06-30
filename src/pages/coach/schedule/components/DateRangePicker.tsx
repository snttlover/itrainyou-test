import { Calendar } from "@/components/calendar/Calendar"
import { date } from "@/lib/formatting/date"
import { DatePicker } from "@/pages/coach/schedule/components/DatePicker"
import styled from "styled-components"
import React, { useState } from "react"

const Container = styled.div`
  display: flex;
  position: relative;
`

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  transform: translate(-50%, 0);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12), 2px 4px 8px rgba(0, 0, 0, 0.16);
  width: 200px;
`

export const DateRangePicker: React.FC<{ className?: string }> = ({ className }) => {
  const [isOpen, setOpen] = useState(false)
  const range = [date().toDate(), date().add(3, "day").toDate()]
  return (
    <Container className={className}>
      <DatePicker placeholder='От' value={range[0]} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} />
      <DatePicker placeholder='До' value={range[1]} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} />
      {isOpen && (
        <Dropdown>
          <Calendar value={range} onChange={() => {}} />
        </Dropdown>
      )}
    </Container>
  )
}
