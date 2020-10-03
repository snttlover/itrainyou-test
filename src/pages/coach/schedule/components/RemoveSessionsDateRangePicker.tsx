import { Calendar } from "@/components/calendar/Calendar"
import { useClickOutside } from "@/components/click-outside/use-click-outside"
import { date } from "@/lib/formatting/date"
import { DatePicker } from "@/pages/coach/schedule/components/DatePicker"
import dayjs, { Dayjs } from "dayjs"
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
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12), 2px 4px 8px rgba(0, 0, 0, 0.16);
  width: 220px;
`

const LeftDropdown = styled(Dropdown)`
  left: 0;
`
const RightDropdown = styled(Dropdown)`
  right: 0;
`

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  &:nth-of-type(2) {
    margin-left: 8px;
  }
`

type DateRange = [Dayjs, Dayjs]

type RemoveSessionsDateRangePickerProps = {
  range: DateRange
  rangeChanged: (range: DateRange) => void
  className?: string
}

export const RemoveSessionsDateRangePicker: React.FC<RemoveSessionsDateRangePickerProps> = ({
  className,
  range,
  rangeChanged,
}) => {
  const [leftIsOpen, setLeftIsOpenOpen] = useState(false)
  const [rightIsOpen, setRightIsOpenOpen] = useState(false)

  const dropdownRef = useRef(null)
  useClickOutside(dropdownRef, () => {
    setLeftIsOpenOpen(false)
    setRightIsOpenOpen(false)
  })

  const [from, to] = range.map(date => date.toDate())

  return (
    <Container className={className}>
      <StyledDatePicker placeholder='От' value={from} onClick={() => setLeftIsOpenOpen(true)} />
      <StyledDatePicker placeholder='До' value={to} onClick={() => setRightIsOpenOpen(true)} />
      <div ref={dropdownRef}>
        {leftIsOpen && (
          <LeftDropdown>
            <Calendar
              value={from}
              disabledFrom={to}
              onChange={picked => rangeChanged([date(picked), date(to)])}
            />
          </LeftDropdown>
        )}
        {rightIsOpen && (
          <RightDropdown>
            <Calendar
              value={to}
              onChange={picked => rangeChanged([date(from), date(picked)])}
            />
          </RightDropdown>
        )}
      </div>
    </Container>
  )
}
