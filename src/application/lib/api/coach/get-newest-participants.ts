import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"
import { ISODate, Sex, Pagination } from "@/application/lib/api/interfaces/utils.interface"

export interface Participants {
  id: number,
  first_name: string,
  last_name: string,
  birth_date: string,
  sex: Sex,
  avatar: string | null,
  creation_datetime: ISODate
}

type getNewestParticipantsParams = {
  active?: boolean
}

export const getNewestParticipants = (params?: getNewestParticipantsParams) =>
  get<Pagination<Participants>, getNewestParticipantsParams>(`${process.env.BACKEND_URL}/api/v1/web/coaches/me/newest-participants/`, params)
    .then(response => response.data)
    .then(keysToCamel)
