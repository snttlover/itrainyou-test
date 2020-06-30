import { createEvent } from "effector-root"

export const createSocket = () => {
  let socket: WebSocket | null = null

  const openSocket = (url: string) => {
    socket = new WebSocket(url)

    socket.onopen = onConnect
    socket.onclose = onClose
    socket.onerror = onError
    socket.onmessage = e => onMessage(JSON.parse(e.data))
  }

  const closeSocket = () => socket?.close()
  const sendSocketMessage = (message: any) => socket?.send(JSON.stringify(message))

  const onMessage = createEvent<any>()
  const onConnect = createEvent<Event>()
  const onClose = createEvent<CloseEvent>()
  const onError = createEvent<Event>()

  const connect = createEvent<string>()
  const disconnect = createEvent()
  const send = createEvent<any>()

  connect.watch(openSocket)
  disconnect.watch(closeSocket)
  send.watch(sendSocketMessage)

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
