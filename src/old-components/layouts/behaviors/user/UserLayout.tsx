import * as React from "react"
import { useStore } from "effector-react"
import { $isFullyRegistered, $isLoggedIn } from "@/feature/user/user.model"

import { GuestLayout } from "@/old-components/layouts/behaviors/default/GuestLayout"
import { ClientDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/client/ClientDashboardLayout"

type UserLayoutTypes = {
  children: React.ReactChild
}

export const UserLayout = (props: UserLayoutTypes) => {
  const isLoggedIn = useStore($isLoggedIn)
  const isFullRegistered = useStore($isFullyRegistered)
  const Layout = isLoggedIn && isFullRegistered ? ClientDashboardLayout : GuestLayout

  return <Layout>{props.children}</Layout>
}
