import { config } from "@/config"
import { Day, ISODate, Sex } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface ClientResponse {
  avatar: string
  birthDate: Day
  cancelledSessionsCount: number
  completedSessionsCount: number
  creationDatetime: ISODate
  firstName: string
  id: number
  lastName: string
  sex: Sex
}

export const getClient = (id: number) =>
  get<ClientResponse>(`${config.BACKEND_URL}/api/v1/web/clients/${id}/`)
    .then(response => response.data)
    .then(keysToCamel)
