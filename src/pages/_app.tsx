import { AppStyles } from "@/application/AppStyles"
import { $isLoggedIn, setUserData } from "@/application/feature/user/user.model"
import { getMyUser, GetMyUserResponse } from "@/application/lib/api/users/get-my-user"
import { serverStarted } from "@/store"
import { createEffect, forward, withHydrate, withStart } from "effector-next"
import { useStore } from "effector-react"
import App from "next/app"
import { useEffect } from "react"
import * as React from "react"
import dayjs from "dayjs"
import "dayjs/locale/ru"
import "react-image-crop/dist/ReactCrop.css"
import "../../public/fonts/gilroy/fonts-list.css"
import "react-multi-carousel/lib/styles.css"
import "simplebar/dist/simplebar.min.css"
import "swiper/css/swiper.min.css"
import { ClientTheme } from "@/application/components/layouts/themes"

dayjs.locale("ru")
const isServer = typeof window === "undefined"

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

class MyApp extends App {
  constructor(props: any) {
    super(props)
    if (isServer) return
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <ClientTheme>
        <AppStyles />
        <WaitLoadUserData>
          <Component {...pageProps} />
        </WaitLoadUserData>
      </ClientTheme>
    )
  }
}

const withStartEnhance = withStart(serverStarted)
const withHydrateEnhance = withHydrate()
export default withStartEnhance(withHydrateEnhance(MyApp))
