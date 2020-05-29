import { AppStyles } from "@/application/AppStyles"
import { serverStarted } from "@/store"
import { withHydrate, withStart } from "effector-next"
import App from "next/app"
import * as React from "react"
import dayjs from "dayjs"
import "dayjs/locale/ru"
import "react-image-crop/dist/ReactCrop.css"
import "../../public/fonts/gilroy/fonts-list.css"
import "react-multi-carousel/lib/styles.css"
import "simplebar/dist/simplebar.min.css"
import "swiper/css/swiper.min.css"

dayjs.locale("ru")

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <AppStyles />
        <Component {...pageProps} />
      </>
    )
  }
}

const withStartEnhance = withStart(serverStarted)
const withHydrateEnhance = withHydrate()
export default withStartEnhance(withHydrateEnhance(MyApp))
