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
import { ApplicationGate } from "@/models"
import { useGate, useStore } from "effector-react"
import { config } from "@/config"
import { $isLoggedIn } from "@/feature/user/user.model"
import { JivoWidget } from "@/lib/widgets/JivoWidget"

export const Application: React.FC = () => {
  useGate(ApplicationGate)
  const isLoggedIn = useStore($isLoggedIn)

  return (
    <ClientTheme>
      <AppStyles />
      <AsyncDataLoader>
        <YMInitializer
          accounts={[config.SERVER_TYPE === "production" ? config.YANDEX_METRIKA_ID : ""]}
          options={{
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          }}
          version="2"
        />
        {!isLoggedIn ? <JivoWidget id={config.JIVO_ID?.toString()} /> : null}
        <Pages />
      </AsyncDataLoader>
    </ClientTheme>
  )
}
