import { createEvent } from "effector-root"
import { runInScope } from "@/scope"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"

export const createSocket = () => {
  let socket: WebSocket | null = null

  const openSocket = (url: string) => {
    socket = new WebSocket(url)

    socket.onopen = () => runInScope(onConnect)
    socket.onclose = () => runInScope(onClose)
    socket.onerror = () => runInScope(onError)
    socket.onmessage = e => runInScope(onMessage, keysToCamel(JSON.parse(e.data)))
  }

  const closeSocket = () => socket?.close()
  const sendSocketMessage = (message: any) => socket?.send(JSON.stringify(keysToSnake(message)))

  const onMessage = createEvent<any>()
  const onConnect = createEvent<Event>()
  const onClose = createEvent<CloseEvent>()
  const onError = createEvent<Event>()

  const connect = createEvent<string>()
  const disconnect = createEvent()
  const send = createEvent<any>()

  connect.watch(openSocket)
  disconnect.watch(closeSocket)
  send.watch((message) => sendSocketMessage(message))

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
    },
  }
}
