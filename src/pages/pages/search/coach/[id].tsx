import dynamic from "next/dynamic"
import React from "react"

const CoachByIdPage = dynamic(() => import("@/application/pages/search/coach-by-id/CoachByIdPage"), { ssr: false })

export default CoachByIdPage
