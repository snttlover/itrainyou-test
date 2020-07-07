import React, { useEffect } from "react"
import styled from "styled-components"
import { ChatContainer } from "./content/ChatContainer"
import { ChatHeader } from "./content/ChatHeader"
import { createChatMessages } from "./content/ChatMessages"
import { ChatMessageBox } from "./content/ChatMessageBox"
import { createChatModule } from "@/feature/chat"
import { useEvent, useStore } from "effector-react/ssr"
import {Loader} from "@/components/spinner/Spinner"
import { useParams } from "react-router-dom"

export const createChat = ($chatModule: ReturnType<typeof createChatModule>) => {
  const Messages = createChatMessages($chatModule.chatMessages)
  return () => {
    const chat = useStore($chatModule.chat.$chat)
    const chatLoading = useStore($chatModule.chat.$loading)
    const send = useEvent($chatModule.send)
    const params = useParams<{id: string}>()
    const mounted = useEvent($chatModule.mounted)
    const unmounted = useEvent($chatModule.reset)

    useEffect(() => {
      mounted(parseInt(params.id))
      return () => unmounted()
    }, [])

    return (
      <Container>
        {chatLoading && <Loader />}
        {!chatLoading && !!chat.id && (
          <ChatContainer>
            <ChatHeader link={chat.link} name={chat.userName} avatar={chat.avatar || null} />
            <Messages />
            <ChatMessageBox onSend={send} />
          </ChatContainer>
        )}
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
