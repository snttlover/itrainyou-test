import { createEvent } from "effector"

const socket = () => {
  let socket: WebSocket | null = null

  const onMessage = createEvent<MessageEvent>()
  const onConnect = createEvent<Event>()
  const onClose = createEvent<CloseEvent>()
  const onError = createEvent<Event>()

  const connect = (url: string) => {
    socket = new WebSocket(url)
    socket.onopen = (e) => onConnect
    socket.onclose = (e) => onClose
    socket.onmessage = (e) => onMessage(JSON.parse(e.data))
    socket.onerror = onError
  }

  const disconnect = () => socket?.close()

  const send = (message: any) => socket?.send(JSON.stringify(message))

  return {
    useCases: {
      connect,
      disconnect,
      send
    },
    events: {
      onMessage,
      onConnect,
      onError,
      onClose
    }
  }
}
