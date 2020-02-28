import { Router } from "@reach/router"
import { Provider } from "effector-react/ssr"
import * as React from "react"
import { hot } from "react-hot-loader"
import { Route, routes } from "./routes"
import { AppStyles } from "./AppStyles"
import * as dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const renderRoutes = ({
  routes,
  baseUrl = ""
}: {
  routes?: Route[]
  baseUrl?: string
}) => {
  if (!routes) return null
  return (
    <>
      {routes.map(route => {
        return (
          <route.component
            key={baseUrl + route.url}
            path={route.url}
            default={route.default}
          >
            {renderRoutes({ routes: route.children, baseUrl: route.url })}
          </route.component>
        )
      })}
    </>
  )
}

const EntryApp = ({ store }: { store: any }) => (
  <>
    <AppStyles />
    <Provider value={store}>
      <Router>{renderRoutes({ routes })}</Router>
    </Provider>
  </>
)

export const App = hot(module)(EntryApp)
