import dynamic from "next/dynamic"
import React from "react"

const Index = dynamic(() => import("@/application/pages/coach-home/CoachHome"), {
  ssr: false,
})

export default Index
