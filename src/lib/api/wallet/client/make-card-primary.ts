import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"


export type MakeCardPrimaryResponse = {
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

export const makeCardPrimary = (id: number): Promise<MakeCardPrimaryResponse> =>
  get(`${config.BACKEND_URL}/api/v1/web/client/cards/${id}/`)
    .then(response => response.data)
    .then(keysToCamel)