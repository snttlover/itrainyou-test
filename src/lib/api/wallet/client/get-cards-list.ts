import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { Pagination } from "@/lib/api/interfaces/utils.interface"

export type CardResponse = {
  id: number
  client: number
  firstSixDigits: string
  lastFourDigits: string
  expiryMonth: string
  expiryYear: string
  cardType: string
  issuerCountry: string
  issuerName: string
  isPrimary: boolean
}

export const getClientCardsList = () =>
  get<Pagination<CardResponse>>(`${config.BACKEND_URL}/api/v1/web/client/cards/`)
    .then(response => response.data)
    .then(keysToCamel)
