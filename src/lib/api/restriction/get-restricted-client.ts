import { config } from "@/config"
import { ISODate, Sex } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

type GetRestrictedClientsResponse = {
  id: number
  firstName: string
  lastName: string
  birthDate: ISODate
  sex: Sex
  avatar: string
  creationDatetime: ISODate
}

export const getRestrictedClients = (): Promise<GetRestrictedClientsResponse[]> =>
  get(`${config.BACKEND_URL}/api/v1/web/coaches/me/restricted-clients/`)
    .then(response => response.data)
    .then(keysToCamel)
