import { withAuthSwitch } from "@/application/feature/user/with-auth-switch"
import { LandingPage } from "@/application/pages/landing/LandingPage"
import dynamic from "next/dynamic"
import React from "react"

const HomePage = dynamic(() => import("@/application/pages/home/HomePage"), { ssr: false })

const Page = withAuthSwitch({ authed: HomePage, guest: LandingPage })

export default Page
