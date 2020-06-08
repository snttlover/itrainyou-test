import { AppStyles } from "@/application/AppStyles"
import { $isLoggedIn, loadUserDataFx } from "@/application/feature/user/user.model"
import { serverStarted } from "@/store"
import { withHydrate, withStart } from "effector-next"
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

const WaitLoadUserData = ({ children }: any) => {
  const isLoading = useStore(loadUserDataFx.pending)
  const isAuthed = useStore($isLoggedIn)
  useEffect(() => {
    isAuthed && loadUserDataFx()
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
