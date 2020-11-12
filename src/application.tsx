import { AsyncDataLoader } from "@/lib/AsyncDataLoader"
import * as React from "react"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"
import { AppStyles } from "./AppStyles"
import { ClientTheme } from "./components/layouts/themes"
import { Pages } from "./pages"
import { config } from "@/config"

import "react-image-crop/dist/ReactCrop.css"
import "react-multi-carousel/lib/styles.css"
import "simplebar/dist/simplebar.min.css"
import "swiper/css/swiper.min.css"

Sentry.init({
  dsn: `${config.SENTRY_DSN}`,
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

export const Application: React.FC = () => (
  <ClientTheme>
    <AppStyles />
    <AsyncDataLoader>
      <Pages />
    </AsyncDataLoader>
  </ClientTheme>
)
