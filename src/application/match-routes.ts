import { match, pathToRegexp } from "path-to-regexp"
import { Route, RouteComponent } from "@app/routes"

export type MatchedPath<T = any> = {
  ssr: boolean
  params: T
  components: RouteComponent[]
}

export const expandTreeByPath = (routes: Route[], previousRoutes: Route[] = []) => {
  return routes.reduce<Route[][]>((acc, route) => {
    const currentPath = [...previousRoutes, route]
    if (Array.isArray(route.children)) {
      acc.push(...expandTreeByPath(route.children, currentPath))
    } else acc.push(currentPath)

    return acc
  }, [])
}

export const matchRoutes = (path: string, routes: Route[], uriDecoder: (str: string) => string): MatchedPath => {
  const expandedRoutes = expandTreeByPath(routes)

  const mappedRoutes = expandedRoutes.map(path =>
    path.reduce<{ url: string; routes: Route[] }>(
      (acc, curr) => {
        acc.url += curr.url
        acc.routes.push(curr)
        return acc
      },
      { url: "", routes: [] }
    )
  )

  const foundedRoute = mappedRoutes.find(route => {
    try {
      const urlRegexp = pathToRegexp(route.url)

      return urlRegexp.exec(path)
    } catch (error) {
      return false
    }
  })

  if (!foundedRoute) {
    return {
      ssr: true,
      params: {},
      components: []
    }
  }

  // selective SSR logic
  // [true, undefined, undefined, true, false] -> false
  // [true, undefined, undefined, true, undefined] -> true
  // [true, undefined, false, undefined, undefined] -> false

  const matchParams = match(foundedRoute.url, { decode: uriDecoder })(path)

  return {
    ssr: foundedRoute.routes.reduce<boolean>((ssr, route) => {
      if (route.ssr === true) return true
      else if (route.ssr === false) return false
      else return ssr
    }, false),
    params: (matchParams && matchParams.params) || {},
    components: foundedRoute.routes.map(route => route.component)
  }
}
