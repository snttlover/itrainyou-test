import dynamic from "next/dynamic"

const ClientChatsListPage = dynamic(() => import("@/application/pages/client/chats/list/ClientChatListPage"), {
  ssr: false,
})

export default ClientChatsListPage
