import { AsyncDataLoader } from "@/lib/AsyncDataLoader"
import * as React from "react"
import { AppStyles } from "./AppStyles"
import { ClientTheme } from "./old-components/layouts/themes"
import { Pages } from "./pages"
import "./models/init"
import { YMInitializer } from "react-yandex-metrika"

import "react-image-crop/dist/ReactCrop.css"
import "react-multi-carousel/lib/styles.css"
import "simplebar/dist/simplebar.min.css"
import "swiper/css/swiper.min.css"
import { useGate } from "effector-react"
import { config } from "@/config"
import { JivoWidget } from "@/lib/external-services/jivo/JivoWidget"
import { ApplicationGate } from "@/models/units"

export const Application: React.FC = () => {
  useGate(ApplicationGate)

  return (
    <ClientTheme>
      <AppStyles />
      <AsyncDataLoader>
        { config.ENVIRONMENT === "production" ?
          <YMInitializer
            accounts={[config.YANDEX_METRIKA_ID]}
            options={{
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            }}
            version="2"
          /> : null
        }
        <JivoWidget id={config.JIVO_ID?.toString()} />
        <Pages />
      </AsyncDataLoader>
    </ClientTheme>
  )
}
