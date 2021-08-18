import React, { useEffect, useState } from "react"
import { ChatMessage } from "@/feature/chat/view/content/messages/content/ChatMessage"
import { SystemMessageSwitcher } from "@/feature/chat/view/content/messages/content/system/SystemMessageSwitcher"
import { ChatMessagesTypes } from "@/feature/chat/modules/chat-messages"
import { SupportMessageSwitcher } from "@/feature/chat/view/content/messages/content/support/SupportMessageSwitcher"
import styled from "styled-components"

const StyledUnreadMessage = styled.div<{ readed?: boolean }>`
  background: transparent;
  transition: background 0.5s ease;
  padding: 4px 0;
`

export const ChatMessageSwitcher = ({
  message,
  isSystemChat,
  showUser,
  commonSystemMessages,
  imageClick,
}: {
  message: ChatMessagesTypes
  isSystemChat: boolean
  showUser?: boolean
  commonSystemMessages?: boolean
  imageClick?: (index: number) => void
}) => {
  if (message.type === "SUPPORT") {
    return (
      <StyledUnreadMessage>
        <SupportMessageSwitcher {...message} />
      </StyledUnreadMessage>
    )
  }

  if (message.type === "TEXT") {
    return (
      <StyledUnreadMessage>
        <ChatMessage
          user={message.user}
          showUser={showUser}
          text={message.text}
          image={message.image}
          document={message.document}
          id={`message-${message.id}`}
          time={message.time}
          data-self={message.isMine}
          imageClick={imageClick}
          imageIndex={message.imageIndex}
        />
      </StyledUnreadMessage>
    )
  }

  return (
    <StyledUnreadMessage>
      <SystemMessageSwitcher
        message={message}
        isSystemChat={isSystemChat}
        commonSystemMessages={commonSystemMessages}
      />
    </StyledUnreadMessage>
  )
}
