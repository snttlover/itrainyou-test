import styled from "styled-components"
import React from "react"
import { ChatContainer } from "@/application/pages/client/chats/chat/content/client-chat/content/ChatContainer"
import { ChatHeader } from "@/application/pages/client/chats/chat/content/client-chat/content/ChatHeader"
import { ChatMessages } from "@/application/pages/client/chats/chat/content/client-chat/content/ChatMessages"
import { ChatMessageBox } from "@/application/pages/client/chats/chat/content/client-chat/content/ChatMessageBox"

const Container = styled.div`
  padding-top: 8px;
  padding-bottom: 16px;
  position: relative;
  height: 100%;
`

export const CoachChat = () => (
  <Container>
    <ChatContainer>
      <ChatHeader />
      <ChatMessages />
      <ChatMessageBox value={``} onChange={(value) => {}} />
    </ChatContainer>
  </Container>
)
