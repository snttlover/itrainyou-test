import React from "react"

import { ChatMessage } from "@/feature/chat/view/content/messages/content/ChatMessage"
import { SystemMessageSwitcher } from "@/feature/chat/view/content/messages/content/system/SystemMessageSwitcher"
import { ChatMessagesTypes } from "@/feature/chat/modules/chat-messages"
import { SupportMessageSwitcher } from "@/feature/chat/view/content/messages/content/support/SupportMessageSwitcher"
import styled from "styled-components"

export const ChatMessageSwitcher = ({
  message,
  isSystemChat, showUser, commonSystemMessages
}: {
  message: ChatMessagesTypes
  isSystemChat: boolean
  showUser?: boolean,
  commonSystemMessages?: boolean
}) => {
  if (message.type === `SUPPORT`) {
    return <SupportMessageSwitcher {...message} />
  }

  if (message.type === `TEXT`) {
    return (
      <ChatMessage
        user={message.user}
        showUser={showUser}
        text={message.text}
        image={message.image}
        id={`message-${message.id}`}
        time={message.time}
        data-self={message.isMine}
      />
    )
  }

  return <SystemMessageSwitcher message={message} isSystemChat={isSystemChat} commonSystemMessages={commonSystemMessages} />
}
