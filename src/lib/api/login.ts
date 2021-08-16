import { ISODate } from "@/lib/api/interfaces/utils.interface"

export interface UserSelfData {
  id: number
  email: string
  phone: string
  creationDatetime: ISODate
  timeZone: string
}
