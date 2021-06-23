import ym from "react-yandex-metrika"

const accountListName = "yandex_metrika_accounts"

const accountIdList = () => typeof window !== "undefined" ? window[accountListName] : []


export const ymLog = (methodName: string, ...args: any[]): void => {
  if (!accountIdList()) {
    return // Ничего не логгируем, если метрика не инициализована
  }
  return ym(methodName, ...args)
}
