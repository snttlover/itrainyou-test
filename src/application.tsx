import { AsyncDataLoader } from "#/lib/AsyncDataLoader"
import * as React from "react"
import { Scope } from "effector/fork"
import { Provider } from "effector-react/ssr"
import { AppStyles } from "./AppStyles"
import { ClientTheme } from "./components/layouts/themes"
import { Pages } from "./pages"

import "react-image-crop/dist/ReactCrop.css"
import "react-multi-carousel/lib/styles.css"
import "simplebar/dist/simplebar.min.css"
import "swiper/css/swiper.min.css"

type ApplicationProps = {
  root: Scope
}

export const Application: React.FC<ApplicationProps> = ({ root }) => (
  <Provider value={root}>
    <ClientTheme>
      <AppStyles />
      <AsyncDataLoader scope={root}>
        <Pages />
      </AsyncDataLoader>
    </ClientTheme>
  </Provider>
)
