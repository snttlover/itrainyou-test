import { createEffect, createEvent, forward, guard, restore } from "effector-root"
import { runInScope } from "@/scope"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { $isClient } from "@/lib/effector"

export const createSocket = () => {
  const changeClosedStatus = createEvent<boolean>()
  let $programmaticallyClosed = restore(changeClosedStatus, false)
  let socket: WebSocket | null = null

  const openSocketFx = createEffect({
    handler: (url: string) => {
      close()
      changeClosedStatus(false)
      socket = new WebSocket(url)

      socket.onopen = () => runInScope(onConnect)
      socket.onclose = () => runInScope(onClose)
      socket.onerror = () => runInScope(onError)
      socket.onmessage = e => runInScope(onMessage, keysToCamel(JSON.parse(e.data)))
    }
  })

  const closeSocketFx = createEffect({
    handler: () => {
      changeClosedStatus(true)
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
  // закрытие сокета не было инициировано кодом
  const onNotProgrammaticallyClose = createEvent()

  const connect = createEvent<string>()
  const disconnect = createEvent()
  const send = createEvent<any>()

  forward({
    from: disconnect,
    to: closeSocketFx
  })

  guard({
    source: onError,
    filter: $programmaticallyClosed.map(status => !status),
    target: onNotProgrammaticallyClose
  })

  guard({
    source: onClose,
    filter: $programmaticallyClosed.map(status => !status),
    target: onNotProgrammaticallyClose
  })

  forward({
    from: connect,
    to: openSocketFx
  })

  forward({
    from: send,
    to: sendSocketMessageFx
  })

  const navigatorConnectionFx = createEffect({
    handler() {
      setInterval(() => {
        if (!navigator.onLine) {
          onNotProgrammaticallyClose()
        }
      }, 3000)
    }
  })

  guard({
    source: $isClient,
    filter: (status) => !!status,
    target: navigatorConnectionFx
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
      onClose,
      onNotProgrammaticallyClose
    },
  }
}
