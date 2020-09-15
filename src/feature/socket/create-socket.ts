import { createEffect, createEvent, forward } from "effector-root"
import { runInScope } from "@/scope"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"

export const createSocket = () => {
  let socket: WebSocket | null = null

  const openSocketFx = createEffect({
    handler: (url: string) => {
      socket = new WebSocket(url)

      socket.onopen = () => runInScope(onConnect)
      socket.onclose = () => runInScope(onClose)
      socket.onerror = () => runInScope(onError)
      socket.onmessage = e => runInScope(onMessage, keysToCamel(JSON.parse(e.data)))
    }
  })

  const closeSocketFx = createEffect({
    handler: () => {
      if (socket) {
        socket?.close()
        socket = null
      }
    }
  })

  const sendSocketMessageFx = createEffect({
    handler: (message: any) => {
      socket?.send(JSON.stringify(keysToSnake(message)))
    }
  })

  const onMessage = createEvent<any>()
  const onConnect = createEvent<Event>()
  const onClose = createEvent<CloseEvent>()
  const onError = createEvent<Event>()

  const connect = createEvent<string>()
  const disconnect = createEvent()
  const send = createEvent<any>()

  forward({
    from: disconnect,
    to: closeSocketFx
  })

  forward({
    from: connect,
    to: openSocketFx
  })

  forward({
    from: send,
    to: sendSocketMessageFx
  })


  return {
    methods: {
      connect,
      disconnect,
      send,
    },
    events: {
      onMessage,
      onConnect,
      onError,
      onClose
    },
  }
}
