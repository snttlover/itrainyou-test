import { matchRoutes } from "@app/match-routes"
import { routes } from "@app/routes"
import { $isServer, startClient } from "@app/store"
import { useParams, History, useLocation } from "@reach/router"
import { useEvent, useStore } from "effector-react/ssr"
import { Scope } from "effector/fork"
import { useEffect } from "react"
import * as React from "react"
import { getWindowQuery } from "@app/lib/helpers/getWindowQuery"

type AsyncDataLoaderProps = {
  children: React.ReactNode
  scope: Scope
  history: History
}

export const AsyncDataLoader = (props: AsyncDataLoaderProps) => {
  const params = useParams()
  const location = useLocation()
  const isRenderedOnServer = useStore($isServer)
  const _startClient = useEvent(startClient)

  useEffect(() => {
    if (isRenderedOnServer) {
      _startClient()
      return
    }
    const currentRoute = matchRoutes(location.pathname, routes, decodeURIComponent)
    const query = getWindowQuery()

    const promise = Promise.resolve()

    for (const component of currentRoute.components) {
      promise.then(
        () =>
          component.asyncData &&
          component.asyncData({
            scope: props.scope,
            params,
            query: query
          })
      )
    }
  }, [location.pathname])

  return <>{props.children}</>
}
