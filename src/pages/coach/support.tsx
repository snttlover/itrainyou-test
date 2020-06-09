import dynamic from "next/dynamic"

const CoachSupportPage = dynamic(() => import("@/application/pages/coach/support/CoachSupportPage"), {
  ssr: false,
})

export default CoachSupportPage
