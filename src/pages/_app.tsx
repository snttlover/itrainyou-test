import { AppStyles } from "@/application/AppStyles"
import { AppContext } from "next/dist/pages/_app"
import * as React from "react"
import App from "next/app"
import { universal } from "@/store"
import "react-image-crop/dist/ReactCrop.css"

// @ts-ignore
class MyApp extends App {
  static async getInitialProps({ Component, ctx, ...rest }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    type StoresObject = { [key: string]: any }
    const universalStoresMap = Array.from(universal.history.stores).reduce<StoresObject>(
      (acc, store) => {
        acc[store.sid!] = store.getState()
        return acc
      },
      {}
    )

    return { ...pageProps, universalStoresMap }
  }


  render() {
    // @ts-ignore
    const { Component, pageProps } = this.props
    return <>
      <AppStyles />
      <Component {...pageProps} />
    </>
  }
}

export default MyApp
