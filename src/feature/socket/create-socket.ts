import { createEffect, createEvent, forward, restore, sample } from "effector-root"
import { runInScope } from "@/scope"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { fixAvatarAndImageUrl } from "@/lib/helpers/fix-avatar-and-image-url"
import { config } from "@/config"

export const createSocket = () => {
  let socket: WebSocket | null = null

  const openSocketFx = createEffect({
    handler: (url: string) => {
      runInScope(disconnect)
      socket = new WebSocket(url)

      socket.onopen = () => runInScope(onConnect)
      socket.onclose = () => runInScope(onClose)
      socket.onerror = () => runInScope(onError)
      socket.onmessage = e => {
        let message = fixAvatarAndImageUrl(keysToCamel(JSON.parse(e.data)))
        if ( config.SERVER_TYPE === "production") {
          message = keysToCamel(JSON.parse(e.data))
        }
        runInScope(onMessage, message)
      }
    },
  })

  const closeSocketFx = createEffect({
    handler: () => {
      if (socket) {
        socket?.close()
        socket = null
      }
    },
  })

  const sendSocketMessageFx = createEffect({
    handler: (message: any) => {
      socket?.send(JSON.stringify(keysToSnake(message)))
    },
  })

  const onMessage = createEvent<any>()
  const onConnect = createEvent<Event>()
  const onClose = createEvent<CloseEvent>()
  const onError = createEvent<Event>()

  const connect = createEvent<string>()
  const disconnect = createEvent()
  const send = createEvent<any>()

  const $connectUrl = restore(connect, "")

  const reconnect = createEvent()

  sample({
    source: $connectUrl,
    clock: reconnect,
    target: connect,
  })

  forward({
    from: disconnect,
    to: closeSocketFx,
  })

  forward({
    from: connect,
    to: openSocketFx,
  })

  forward({
    from: send,
    to: sendSocketMessageFx,
  })

  return {
    methods: {
      connect,
      disconnect,
      send,
      reconnect,
    },
    events: {
      onMessage,
      onConnect,
      onError,
      onClose,
    },
  }
}
