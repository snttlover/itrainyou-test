import dynamic from "next/dynamic"
import React from "react"

const Page = dynamic(() => import("@/application/pages/dashboard/profile/ProfilePage"), { ssr: false })

export default Page
