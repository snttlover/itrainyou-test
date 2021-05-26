import { config } from "@/config"
import { UserSelfData } from "@/lib/api/login"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { Coach } from "@/lib/api/coach"
import { SessionCategory } from "@/lib/api/categories"
import { Day, ISODate, Sex } from "@/lib/api/interfaces/utils.interface"

export interface ClientSelfData {
  id: number
  user: UserSelfData
  firstName: string
  lastName: string
  middleName: string
  birthDate: Day
  sex: Sex
  avatar: string
  originalAvatar: string
  favouriteCoaches: []
  categories: SessionCategory[]
  creationDatetime: ISODate
  completedSessionsCount: number
  spentHoursCount: number,
  systemChat: number
  hasFreeSessions: boolean
}

export type User = {
  id: number
  email: string
  creation_datetime: string // iso date
  time_zone: string // time zone name
}

export type Client = {
  id: number
  firstName: string
  lastName: string
  birthDate: Day
  sex: Sex
  avatar: string | null
  creationDatetime: ISODate
  rating?: number
}

export type ClientInfo = Client & {
  user: User
  birthDate: Day
  favouriteCoaches: Coach[]
  categories: SessionCategory[]
  completedSessionsCount: number
  spentHoursCount: number
}

export const getMyClient = () =>
  get<ClientInfo, {}>(`${config.BACKEND_URL}/api/v1/web/clients/me/`)
    .then(response => response.data)
    .then(keysToCamel)
