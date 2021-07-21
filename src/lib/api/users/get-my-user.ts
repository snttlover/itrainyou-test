import { config } from "@/config"
import { ClientSelfData } from "@/lib/api/client/clientInfo"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { authorizedRequestFx } from "@/lib/network/network"
import { AxiosResponse } from "axios"
import { attach, Effect } from "effector-root"

export type GetMyUserResponse = {
  id: number
  client: ClientSelfData
  coach: CoachSelfData
  email: string 
  phone: string
  timeZone: string
  creationDatetime: string
}

export const getMyUserFx = attach<never, Effect<any, AxiosResponse<GetMyUserResponse>>>({
  effect: authorizedRequestFx,
  mapParams: () => ({ method: "get", url: `${config.BACKEND_URL}/api/v1/web/users/me/` }),
})

// import { config } from "@/config"
// import { ClientSelfData } from "@/lib/api/client/clientInfo"
// import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
// import { authorizedRequestFx, get } from "@/lib/network/network"
// import { AxiosResponse } from "axios"
// import { attach, Effect } from "effector-root"

// import { $token } from "@/lib/network/token"


// export type GetMyUserResponse = {
//   id: number
//   client: ClientSelfData
//   coach: CoachSelfData
//   email: string 
//   phone: string
//   timeZone: string
//   creationDatetime: string
// }



// const requestFx = createEffect({
//   handler: (params: AxiosRequestConfig) => get(`${config.BACKEND_URL}/api/v1/web/users/me/`, )
//   .then(response => response.data)
//   .then(keysToCamel)

// })

// export const authorizedRequestFx = attach({
//   effect: requestFx,
//   source: $token,
//   mapParams: (params: Params, token: string) => {
//     return {
//       ...params,
//       headers: {
//         Authorization: `JWT ${token}`,
//       },
//     }
//   },
// })

// export const getMyUserFx = attach<never, Effect<any, AxiosResponse<GetMyUserResponse>>>({
//   effect: authorizedRequestFx,
//   mapParams: () => ({ method: "get", url:  }),
// })

// export const getMyUserFx = (): Promise<GetMyUserResponse> =>


// import { config } from "@/config"
// import { ClientSelfData } from "@/lib/api/client/clientInfo"
// import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
// import { authorizedRequestFx } from "@/lib/network/network"
// import { AxiosResponse } from "axios"
// import { attach, Effect } from "effector-root"

// export type GetMyUserResponse = {
//   id: number
//   client: ClientSelfData
//   coach: CoachSelfData
//   email: string 
//   phone: string
//   timeZone: string
//   creationDatetime: string
// }

// export const getMyUserFx = attach<never, Effect<any, AxiosResponse<GetMyUserResponse>>>({
//   effect: authorizedRequestFx,
//   mapParams: () => ({ method: "get", url: `${config.BACKEND_URL}/api/v1/web/users/me/` }),
// })

  // keysToSnake(data)

  //   .then(response => response.data)
  //   .then(keysToCamel)