import dynamic from "next/dynamic"

const CoachBlockedPage = dynamic(() => import("@/application/pages/coach/blocked/CoachBlockedPage"), {
  ssr: false,
})

export default CoachBlockedPage
