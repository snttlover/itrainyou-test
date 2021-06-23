import { AsyncDataLoader } from "@/lib/AsyncDataLoader"
import * as React from "react"
import { AppStyles } from "./AppStyles"
import { ClientTheme } from "./oldcomponents/layouts/themes"
import { Pages } from "./pages"
import "./init"
import { YMInitializer } from "react-yandex-metrika"

import "react-image-crop/dist/ReactCrop.css"
import "react-multi-carousel/lib/styles.css"
import "simplebar/dist/simplebar.min.css"
import "swiper/css/swiper.min.css"

import { config } from "@/config"
import { ApplicationGate } from "@/models"
import { useGate } from "effector-react"

export const Application: React.FC = () => {
  useGate(ApplicationGate)

  return (
    <ClientTheme>
      <AppStyles />
      <AsyncDataLoader>
        { config.SERVER_TYPE === "production" ? <YMInitializer
          accounts={[68738200]}
          options={{
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          }}
          version="2"
        /> : null}
        <Pages />
      </AsyncDataLoader>
    </ClientTheme>
  )
}
