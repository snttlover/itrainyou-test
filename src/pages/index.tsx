import { withGuest } from "@/application/feature/user/with-guest"
import { LandingPage } from "@/application/pages/landing/LandingPage"
import React from "react"

export default withGuest({ to: "/client", as: "/client" })(LandingPage)
