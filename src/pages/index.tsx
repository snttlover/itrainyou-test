import dynamic from "next/dynamic"
import React from "react"

const Page = dynamic(() => import("@/application/pages/landing/LandingPage"), { ssr: false })

export default Page
