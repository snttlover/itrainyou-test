import { matchRoutes } from "@app/match-routes"
import { routes } from "@app/routes"
import { $isServer } from "@app/store"
import { useParams, History, useLocation } from "@reach/router"
import { useStore } from "effector-react/ssr"
import { Scope } from "effector/fork"
import { useEffect } from "react"
import * as React from "react"

type AsyncDataLoaderProps = {
  children: React.ReactNode
  scope: Scope
  history: History
}

export const AsyncDataLoader = (props: AsyncDataLoaderProps) => {
  const params = useParams()
  const location = useLocation()
  const isRenderedOnServer = useStore($isServer)

  useEffect(() => {
    if (isRenderedOnServer) return
    const currentRoute = matchRoutes(location.pathname, routes, decodeURIComponent)
    const searchParams = new URLSearchParams(location.search)

    const query: {
      [key: string]: string
    } = {}

    for (const [key, value] of searchParams.entries()) {
      query[key] = value
    }

    const promise = Promise.resolve()

    for (const component of currentRoute.components) {
      promise.then(() =>
        component.asyncData && component.asyncData({
          scope: props.scope,
          params,
          query: query
        })
      )
    }
  }, [location.pathname])

  return <>{props.children}</>
}
