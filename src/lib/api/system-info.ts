import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface SystemInfo {
  platformSessionFee: number,
  defaultPaymentSystem: "TINKOFF" | "YOUKASSA"
}

export const getSystemInfo = (): Promise<SystemInfo> =>
  get<SystemInfo>(`${config.BACKEND_URL}/api/v1/system-info/`)
    .then(response => response.data)
    .then(keysToCamel)
