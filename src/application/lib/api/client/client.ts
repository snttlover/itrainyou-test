import { UserSelfData } from "@/application/lib/api/login"
import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"
import { Coach } from "@/application/lib/api/coach"
import { SessionCategory } from "@/application/lib/api/categories"
import { Day, ISODate, Sex } from "@/application/lib/api/interfaces/utils.interface"

export interface ClientSelfData {
  id: number
  user: UserSelfData
  firstName: string
  lastName: string
  birthDate: Day
  sex: Sex
  avatar: string
  favouriteCoaches: []
  categories: SessionCategory[]
  creationDatetime: ISODate
  completedSessionsCount: number
  spentHoursCount: number
}

export type User = {
  id: number
  email: string
  creation_datetime: string // iso date
  time_zone: string // time zone name
}

export type Client = {
  id: number
  user: User
  firstName: string
  lastName: string
  birthDate: Day
  sex: Sex
  avatar: string | null
  favouriteCoaches: Coach[]
  categories: SessionCategory[]
  creationDatetime: ISODate
  completedSessionsCount: number
  spentHoursCount: number
}

export const getMyClient = () =>
  get<Client, {}>(`${process.env.BACKEND_URL}/api/v1/web/clients/me/`)
    .then(response => response.data)
    .then(keysToCamel)
