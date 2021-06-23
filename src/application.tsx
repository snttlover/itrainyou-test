import { AsyncDataLoader } from "@/lib/AsyncDataLoader"
import * as React from "react"
import { AppStyles } from "./AppStyles"
import { ClientTheme } from "./oldcomponents/layouts/themes"
import { Pages } from "./pages"
import "./init"

import "react-image-crop/dist/ReactCrop.css"
import "react-multi-carousel/lib/styles.css"
import "simplebar/dist/simplebar.min.css"
import "swiper/css/swiper.min.css"
import { ApplicationGate } from "@/models"
import { useGate } from "effector-react"

export const Application: React.FC = () => {
  useGate(ApplicationGate)

  return (
    <ClientTheme>
      <AppStyles />
      <AsyncDataLoader>
        <Pages />
      </AsyncDataLoader>
    </ClientTheme>
  )
}
