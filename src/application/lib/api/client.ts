import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"
import { Coach } from "@/application/lib/api/coach"
import { Category } from "@/application/lib/api/categories"
import {Sex} from "@/application/lib/api/interfaces/utils.interface"


export type User = {
  id: number,
  email: string,
  creation_datetime: string, // iso date
  time_zone: string // time zone name
}

export type Client = {
  id: number,
  user: User,
  first_name: string,
  last_name: string,
  birth_date: string, // YYYY-MM-DD
  sex: 'M' | 'F',
  avatar: string | null,
  favourite_coaches: Coach[],
  categories: Category[],
  creation_datetime: string, // iso date
  completed_sessions_count: number,
  spent_hours_count: number
}

export const getMyClient = () =>
  get<Client, {}>(`${process.env.BACKEND_URL}/api/v1/web/clients/me/`)
    .then(response => response.data)
    .then(keysToCamel)
