import * as React from "react"
import { useStore } from "effector-react"
import { $isFullRegistered, $isLoggedIn } from "@/feature/user/user.model"

import { GuestLayout } from "@/oldcomponents/layouts/behaviors/default/GuestLayout"
import { ClientDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/client/ClientDashboardLayout"

type UserLayoutTypes = {
  children: React.ReactChild
}

export const UserLayout = (props: UserLayoutTypes) => {
  const isLoggedIn = useStore($isLoggedIn)
  const isFullRegistered = useStore($isFullRegistered)
  const Layout = isLoggedIn && isFullRegistered ? ClientDashboardLayout : GuestLayout

  return <Layout>{props.children}</Layout>
}
