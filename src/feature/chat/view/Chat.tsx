import React from "react"
import styled from "styled-components"
import { ChatContainer } from "./content/ChatContainer"
import { ChatHeader } from "./content/ChatHeader"
import { ChatMessages } from "./content/ChatMessages"
import { ChatMessageBox } from "./content/ChatMessageBox"
import { createChatModule } from "@/feature/chat"

export const createChat = ($chatModule: ReturnType<typeof createChatModule>) => {
  // const InfScroll = createInfinityScroll($chatListModule.modules.pagination)

  return () => {
    // const loadMessages = useEvent($chatListModule.methods.loadChats)

    return (
      <Container>
        <ChatContainer>
          <ChatHeader />
          <ChatMessages />
          <ChatMessageBox value={``} onChange={(value) => {}} />
        </ChatContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  padding-top: 8px;
  padding-bottom: 16px;
  position: relative;
  height: 100%;
`
