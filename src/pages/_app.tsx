import { AppStyles } from "@/application/AppStyles"
import { $categoriesList } from "@/application/pages/landing/content/top-bar/categories-picker/categories-picker.model"
import { withHydrate } from "effector-next"
import * as React from "react"
import App, { AppContext } from "next/app"
import "react-image-crop/dist/ReactCrop.css"
import "../../public/fonts/gilroy/fonts-list.css"

// @ts-ignore
class MyApp extends App {
  static async getInitialProps({ Component, ctx, ...rest }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { ...pageProps }
  }

  render() {
    // @ts-ignore
    const { Component, pageProps } = this.props
    return (
      <>
        <AppStyles />
        <Component {...pageProps} />
      </>
    )
  }
}

const enhance = withHydrate();
// @ts-ignore
export default enhance(MyApp)
