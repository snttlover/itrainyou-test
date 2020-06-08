import dynamic from "next/dynamic"
import React from "react"

const SessionsPage = dynamic(() => import("@/application/pages/coach/pages/sessions-page/SessionsPage"), {
  ssr: false,
})

export default SessionsPage
