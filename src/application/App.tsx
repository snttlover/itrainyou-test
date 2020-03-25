import { Router } from "@reach/router"
import * as React from "react"
import { Route, routes } from "./routes"
import { AppStyles } from "./AppStyles"
import * as dayjs from "dayjs"
import "dayjs/locale/ru"

dayjs.locale("ru")

const renderRoutes = ({ routes, baseUrl = "" }: { routes?: Route[]; baseUrl?: string }) => {
  if (!routes) return null
  return (
    <>
      {routes.map(route => {
        return (
          <route.component key={baseUrl + route.url} path={route.url} default={route.default}>
            {renderRoutes({ routes: route.children, baseUrl: route.url })}
          </route.component>
        )
      })}
    </>
  )
}

export const App = () => (
  <>
    <AppStyles />
    <Router>{renderRoutes({ routes })}</Router>
  </>
)
