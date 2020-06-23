
import dynamic from "next/dynamic"

const CoachChatPage = dynamic(() => import("@/application/pages/coach/chats/chat/CoachChatPage"), {
  ssr: false,
})

export default CoachChatPage
