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
