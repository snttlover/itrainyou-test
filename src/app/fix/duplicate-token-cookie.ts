import { TOKEN_COOKIE_KEY } from "@/feature/user/session-token"
import Cookies from "js-cookie"

export const fixDuplicateTokenCookie = () => {
  const cookiesKeys = document.cookie.split("; ").map((cookeStr) => cookeStr.split("=")[0])
  const tokenCookiesCount = cookiesKeys.reduce((acc, key) => acc + Number(key === TOKEN_COOKIE_KEY), 0)

  if (tokenCookiesCount > 1) {
    const currentPathname = document.location.pathname
    const paths = currentPathname.split("/").filter(path => path.length > 0)

    for (let i = 0; i < paths.length; i++) {
      const path = paths.slice(0, i + 1).join("/")

      Cookies.remove(TOKEN_COOKIE_KEY, { path: `/${path}` })
      Cookies.remove(TOKEN_COOKIE_KEY, { path: `/${path}/` })
    }
  }
}
