import { parseQueryString } from "@/lib/helpers/query"
import { ROUTES } from "@/pages/routes"
import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getStart } from "./effector"
import { matchRoutes } from "react-router-config"

export const AsyncDataLoader: React.FC = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
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
