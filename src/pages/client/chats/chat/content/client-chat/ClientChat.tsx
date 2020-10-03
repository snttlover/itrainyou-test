import styled from "styled-components"
import React from "react"
import { ChatContainer } from "#/pages/client/chats/chat/content/client-chat/content/ChatContainer"
import { ChatHeader } from "#/pages/client/chats/chat/content/client-chat/content/ChatHeader"
import { ChatMessages } from "#/pages/client/chats/chat/content/client-chat/content/ChatMessages"
import { ChatMessageBox } from "#/pages/client/chats/chat/content/client-chat/content/ChatMessageBox"

const Container = styled.div`
  padding-top: 8px;
  padding-bottom: 16px;
  position: relative;
  height: 100%;
`

export const ClientChat = () => (
  <Container>
    <ChatContainer>
      <ChatHeader />
      <ChatMessages />
      <ChatMessageBox value={``} onChange={(value) => {}} />
    </ChatContainer>
  </Container>
)
