import dynamic from "next/dynamic"
import React from "react"

const Profile = dynamic(() => import("@/application/pages/dashboard/profile/ProfilePage"), {
  ssr: false
})

export default () => <Profile />
