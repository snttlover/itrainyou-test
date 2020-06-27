
import dynamic from "next/dynamic"

const ClientChatPage = dynamic(() => import("@/application/pages/client/chats/chat/ClientChatPage"), {
  ssr: false,
})

export default ClientChatPage
