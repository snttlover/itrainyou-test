import { withFork } from "effector-next"
import { DocumentContext } from "next/dist/next-server/lib/utils"
import Document from "next/document"
import React from "react"
import { ServerStyleSheet } from "styled-components"
import { serverStarted } from "@/store"

const enhance = withFork({ debug: false, unit: serverStarted });

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}

export default enhance(MyDocument)
