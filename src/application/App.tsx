import { Router } from "@reach/router"
import * as React from "react"
import {hot} from 'react-hot-loader'
import { Route, routes } from "./routes"

const renderRoutes = ({
  routes,
  baseUrl
}: {
  routes?: Route[]
  baseUrl: string
}) => {
  if (!routes) return null
  return (
    <>
      {routes.map(route => (
        <route.component
          default={route.default}
          key={baseUrl + route.url}
          path={route.url}
        >
          {renderRoutes({ routes: route.children, baseUrl: route.url })}
        </route.component>
      ))}
    </>
  )
}

const EntryApp = () => (
  <Router>{renderRoutes({ routes, baseUrl: "" })}</Router>
)

export const App = hot(module)(EntryApp)
