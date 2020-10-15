import { parseQueryString } from "@/lib/helpers/query"
import { ROUTES } from "@/pages/routes"
import { useEvent, useStore } from "effector-react"
import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { $isClient, getStart, clientStarted } from "./effector"
import { matchRoutes } from "react-router-config"

export const AsyncDataLoader: React.FC = ({ children }) => {
  const location = useLocation()
  const isClient = useStore($isClient)
  const _startClient = useEvent(clientStarted)

  useEffect(() => {
    if (!isClient) {
      _startClient()
      return
    }
    const matchedRoutes = matchRoutes(ROUTES, location.pathname)
    const query = parseQueryString(location.search)

    for (const { route, match } of matchedRoutes) {
      const event = getStart(route.component)
      if (event) {
        event({ params: match.params, query })
      }
    }
  }, [location.pathname])

  return <>{children}</>
}
