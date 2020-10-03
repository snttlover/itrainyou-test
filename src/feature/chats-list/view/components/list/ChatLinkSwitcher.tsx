import React from "react"
import { ChatLink, ChatLinkTypes } from "#/feature/chats-list/view/components/list/chat-link/ChatLink"
import { SystemChatLink } from "#/feature/chats-list/view/components/list/system/SystemChatLink"

export const ChatLinkSwitcher = ({ chat }: { chat: ChatLinkTypes }) => {
  const Component = chat.type === `SYSTEM` ? SystemChatLink : ChatLink

  return <Component {...chat} />
}
