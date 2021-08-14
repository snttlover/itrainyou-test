import React from "react"
import { ChatLink, ChatLinkTypes } from "@/feature/chats-list/view/components/list/chat-link/ChatLink"
import { SystemChatLink } from "@/feature/chats-list/view/components/list/system/SystemChatLink"
import styled from "styled-components"
import { useParams } from "react-router-dom"

export const ChatLinkSwitcher = ({ chat }: { chat: ChatLinkTypes }) => {
  const params = useParams<{ id: string }>()
  const Component = chat.type === "SYSTEM" ? SystemChatLink : ChatLink

  return (
    <Wrapper data-opened={+params.id === chat.id}>
      <Component {...chat} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  transition: color 300ms;
  &[data-opened="true"] {
    background: #e1e6ea;
  }
`
