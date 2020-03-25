import { NavigateOptions } from "@reach/router"

export const navigate = (to: string, options?: NavigateOptions<{}>): Promise<void> => {
  if (process.isServer) {
    const { navigate: defaultNavigate } = require("@reach/router")
    return defaultNavigate(to, options)
  } else {
    return require(`@/client`).history.navigate(to, options)
  }
}
