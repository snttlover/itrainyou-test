import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { Pagination } from "@/lib/api/interfaces/utils.interface"

export type CardResponse = {
  id: number
  wallet: number
  firstSixDigits: string
  lastFourDigits: string
  expiryMonth: string
  expiryYear: string
  cardType: string
  issuerCountry: string
  issuerName: string
}

export const getCoachCardsList = () =>
  get<Pagination<CardResponse>>(`${config.BACKEND_URL}/api/v1/web/coach/cards/`)
    .then(response => response.data)
    .then(keysToCamel)
