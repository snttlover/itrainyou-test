import { createEffect, forward } from "effector-root"
import { useEffect, useLayoutEffect } from "react"
import * as React from "react"

import { Scope } from "effector/fork"
import { Provider, useEvent, useStore } from "effector-react/ssr"
import { AppStyles } from "./AppStyles"
import { ClientTheme } from "./components/layouts/themes"
import { Pages } from "./pages"
import { loadDashboardType } from "@/feature/dashboard/dashboard"
import { setUserData, $isLoggedIn } from "./feature/user/user.model"
import { GetMyUserResponse, getMyUser } from "@/lib/api/users/get-my-user"

import dayjs from "dayjs"
import "dayjs/locale/ru"
import "react-image-crop/dist/ReactCrop.css"
import "../public/fonts/gilroy/fonts-list.css"
import "react-multi-carousel/lib/styles.css"
import "simplebar/dist/simplebar.min.css"
import "swiper/css/swiper.min.css"
import utc from "dayjs/plugin/utc"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.locale("ru")

const firstLoadUser = createEffect<void, GetMyUserResponse>({
  handler: getMyUser,
})

forward({ from: firstLoadUser.doneData, to: setUserData })

const WaitLoadUserData = ({ children }: any) => {
  const isLoading = useStore(firstLoadUser.pending)
  const isAuthed = useStore($isLoggedIn)
  useEffect(() => {
    isAuthed && firstLoadUser()
  }, [])

  return isLoading && isAuthed ? null : children
}

const isServer = typeof window === "undefined"

export const Application: React.FC = () => {
  const getDashboardType = useEvent(loadDashboardType)

  if (!isServer) {
    getDashboardType()
  }

  return (
    <ClientTheme>
      <AppStyles />
      <WaitLoadUserData>
        <Pages />
      </WaitLoadUserData>
    </ClientTheme>
  )
}
