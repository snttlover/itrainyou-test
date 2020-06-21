import dynamic from "next/dynamic"

const CoachGroupSessionsPage = dynamic(
  () => import("@/application/pages/coach/group-sessions/CoachGroupSessionsPage"),
  {
    ssr: false,
  }
)

export default CoachGroupSessionsPage
