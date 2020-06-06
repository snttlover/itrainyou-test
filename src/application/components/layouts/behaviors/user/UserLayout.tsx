import React from "react"
import {useStore} from "effector-react"
import { $isLoggedIn } from "@/application/feature/user/user.model"

import {GuestLayout} from "@/application/components/layouts/behaviors/default/GuestLayout"
import {DashboardLayout} from "@/application/components/layouts/behaviors/dashboard/DashboardLayout"

type UserLayoutTypes = {
  children: React.ReactChild
}

export const UserLayout = (props: UserLayoutTypes) => {
  const isLoggedIn = useStore($isLoggedIn)
  const Layout = isLoggedIn ? DashboardLayout : GuestLayout

  return (
    <Layout>{props.children}</Layout>
  )
}
