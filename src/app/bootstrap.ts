import "../models/init"
import "../processes/auth/auth"
import { createEvent, guard } from "effector-root"
import { spread } from "patronum"
import { requestModule } from "@/shared/api/common/request"
import { changeDashboardType, DashboardType } from "@/feature/dashboard/dashboard"
import { changeToken } from "@/lib/network/token"

type ApplicationConfig = {
  backendUrl: string
  token?: string
  activeDashboardType: DashboardType
}

export const bootstrapApplication = createEvent<ApplicationConfig>()

const setTokenIfExists = createEvent<string | undefined>()

guard({
  source: setTokenIfExists,
  filter: (token): token is string => token !== undefined,
  target: [
    changeToken,
    requestModule.addDefaultHeaders.prepend((token: string) => ({
      "Authorization": `JWT ${token}`
    }))
  ]
})

spread({
  source: bootstrapApplication,
  targets: {
    backendUrl: requestModule.setBaseUrl,
    token: setTokenIfExists,
    activeDashboardType: changeDashboardType
  }
})
