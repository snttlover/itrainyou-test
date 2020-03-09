import { AxiosError } from "axios"

export default (e: AxiosError): string => {
  if (e.response) {
    return Object.values(e.response.data as Array<string>)[0]
  }
  return `Произошла неизвестная ошибка, обратитесь к администратору.`
}
