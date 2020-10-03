import { isArray, isObject } from "#/lib/network/casing"
import { config } from "#/config"

// рекурсивно добавляет урл к картинкам сообщений из сокетов
export const fixAvatarAndImageUrl = (o: any): any => {
  const imageAttrs = ["image", "avatar"]
  if (isObject(o)) {
    return Object.keys(o).reduce<any>((acc, key: string) => {
      acc[key] = o[key]

      if (typeof o[key] === "string" && imageAttrs.includes(key)) {
        acc[key] = `${config.BACKEND_URL}${o[key]}`
      }

      if (isObject(o[key])) {
        acc[key] = fixAvatarAndImageUrl(o[key])
      }

      return acc
    }, {})
  } else if (isArray(o)) {
    return o.map(fixAvatarAndImageUrl)
  }

  return o
}
