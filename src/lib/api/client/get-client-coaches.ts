import { config } from "#/config"
import { SessionCategory } from "#/lib/api/categories"
import { ISODate, Pagination, Sex } from "#/lib/api/interfaces/utils.interface"
import { keysToCamel } from "#/lib/network/casing"
import { get } from "#/lib/network/network"

export interface ClientCoachesRequest {
  page?: number
  pageSize?: number
  id?: number
}

export interface ClientCoachesResponse {
  avatar: string
  birthDate: Date
  categories: SessionCategory[]
  creationDatetime: ISODate
  firstName: string
  id: number
  isTopCoach: boolean
  lastName: string
  rating: number | null
  sex: Sex
}

export const getClientCoaches = ({ id, ...params }: ClientCoachesRequest) =>
  get<Pagination<ClientCoachesResponse>>(`${config.BACKEND_URL}/api/v1/web/clients/${id}/coaches/`, params)
    .then(response => response.data)
    .then(keysToCamel)
