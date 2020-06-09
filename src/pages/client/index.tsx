import dynamic from "next/dynamic"
import React from "react"

const HomePage = dynamic(() => import("@/application/pages/client/home/HomePage"), { ssr: false })

export default HomePage
