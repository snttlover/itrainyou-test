import * as React from "react"
import { Calendar, CalendarDateType } from "./Calendar"
import { useState } from "react"

export default {
  component: Calendar,
  title: "Calendar"
}

export const normal = () => {
  const [date, change] = useState<CalendarDateType>(new Date())
  return <Calendar value={date} onChange={change} />
}

export const withPinned = () => {
  const pinned = [new Date().toISOString()]
  const [date, change] = useState<CalendarDateType>(new Date())
  return <Calendar value={date} onChange={change} pinnedDates={pinned} />
}


export const range = () => {
  const [date, change] = useState<CalendarDateType>([new Date(), new Date()])
  return <Calendar value={date} onChange={change} selectRange={true} />
}

export const sizes = () => {
  const [date, change] = useState<CalendarDateType>(new Date())
  return (
    <>
      <div style={{width: "252px"}}>
        <h1>Big</h1>
        <Calendar value={date} onChange={change} isBig={true} />
      </div>
      <div style={{width: "196px"}}>
        <h1>Small</h1>
        <Calendar value={date} onChange={change} />
      </div>
    </>
  )
}
