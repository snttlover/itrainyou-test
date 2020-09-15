import React from "react"

import { ChatMessage } from "@/feature/chat/view/content/messages/content/ChatMessage"
import { SystemMessageSwitcher } from "@/feature/chat/view/content/messages/content/system/SystemMessageSwitcher"
import { ChatMessagesTypes } from "@/feature/chat/modules/chat-messages"
import { SupportMessageSwitcher } from "@/feature/chat/view/content/messages/content/support/SupportMessageSwitcher"

export const ChatMessageSwitcher = ({
  message,
  isSystemChat,
}: {
  message: ChatMessagesTypes
  isSystemChat: boolean
}) => {
  if (message.type === `SUPPORT`) {
    return <SupportMessageSwitcher {...message} />
  }

  if (message.type === `TEXT`) {
    return (
      <ChatMessage id={`message-${message.id}`} time={message.time} data-self={message.isMine}>
        {message.text}
      </ChatMessage>
    )
  }

  return <SystemMessageSwitcher message={message} isSystemChat={isSystemChat} />
}
