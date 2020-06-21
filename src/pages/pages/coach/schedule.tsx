import dynamic from "next/dynamic"

const CoachSchedulePage = dynamic(() => import("@/application/pages/coach/schedule/CoachSchedulePage"), {
  ssr: false,
})

export default CoachSchedulePage
