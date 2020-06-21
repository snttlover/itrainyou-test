import dynamic from "next/dynamic"

const CoachCalendarPage = dynamic(() => import("@/application/pages/coach/calendar/CoachCalendarPage"), {
  ssr: false,
})

export default CoachCalendarPage
