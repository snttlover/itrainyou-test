import dynamic from "next/dynamic"

const CoachSupervisorPage = dynamic(() => import("@/application/pages/coach/supervisor/CoachSupervisorPage"), {
  ssr: false,
})

export default CoachSupervisorPage
