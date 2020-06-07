import dynamic from "next/dynamic"
import React from "react"

const CoachHome = dynamic(() => import("@/application/pages/coach-home/CoachHome"), {
  ssr: false,
})

export default CoachHome
