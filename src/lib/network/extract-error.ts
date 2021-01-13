import { NetworkError } from "./network"

function isNetworkError(error: any): error is NetworkError {
  return error.response || error.request
}

export function extractError(e: Error): string {
  if (isNetworkError(e)) {
    if (e.response) {
      return Object.values(e.response!.data as Array<string>)[0]
    } else {
      return "Отсутствует интернет соединение"
    }
  }
  return "Произошла неизвестная ошибка, обратитесь к администратору."
}
