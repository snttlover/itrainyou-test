import dynamic from "next/dynamic"

const CoachNowPage = dynamic(() => import("@/application/pages/coach/now/CoachNowPage"), {
  ssr: false,
})

export default CoachNowPage
