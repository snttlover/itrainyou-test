import { AppStyles } from "@/application/AppStyles"
import { withHydrate } from "effector-next"
import App from "next/app"
import * as React from "react"
import "react-image-crop/dist/ReactCrop.css"
import "../../public/fonts/gilroy/fonts-list.css"
import "react-multi-carousel/lib/styles.css"
import 'simplebar/dist/simplebar.min.css'

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

const enhance = withHydrate()

// @ts-ignore
export default enhance(MyApp)
