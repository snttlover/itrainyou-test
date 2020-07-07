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
  left: 50%;
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  transform: translate(-50%, 0);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12), 2px 4px 8px rgba(0, 0, 0, 0.16);
  width: 220px;
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
  const [isOpen, setOpen] = useState(false)

  const dropdownRef = useRef(null)
  useClickOutside(dropdownRef, () => setOpen(false))

  return (
    <Container className={className}>
      <StyledDatePicker placeholder='От' value={range[0].toDate()} onClick={() => setOpen(true)} />
      <StyledDatePicker placeholder='До' value={range[1].toDate()} onClick={() => setOpen(true)} />
      {isOpen && (
        <Dropdown ref={dropdownRef}>
          <Calendar
            value={range.map(dat => dat.toDate())}
            onChange={dates => rangeChanged([date(dates[0]), date(dates[1])])}
            selectRange
          />
        </Dropdown>
      )}
    </Container>
  )
}
