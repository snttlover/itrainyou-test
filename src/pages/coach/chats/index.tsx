import dynamic from "next/dynamic"

const CoachChatsListPage = dynamic(() => import("@/application/pages/coach/chats/list/CoachChatListPage"), {
  ssr: false,
})

export default CoachChatsListPage
