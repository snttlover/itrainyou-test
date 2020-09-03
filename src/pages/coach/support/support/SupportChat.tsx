import { createSupportChatModel } from "@/pages/coach/support/support/create-support-chat.model"
import { createChatMessages } from "@/feature/chat/view/content/messages/ChatMessages"
import { Loader } from "@/components/spinner/Spinner"
import { ChatContainer } from "@/feature/chat/view/content/ChatContainer"
import { ChatMessageBox } from "@/feature/chat/view/content/ChatMessageBox"
import { RevocationSessionDialog } from "@/pages/client/session/content/session-page-content/cancel-session/RevocationSessionDialog"
import React, { useEffect } from "react"
import { useEvent, useStore } from "effector-react/ssr"
import styled from "styled-components"
import { useParams } from "react-router-dom"

export const createSupportChat = ($chatModule: ReturnType<typeof createSupportChatModel>) => {
  const Messages = createChatMessages($chatModule.chatMessages)

  return () => {
    const messagesFirstLoading = useStore($chatModule.$firstLoading)
    const send = useEvent($chatModule.send)

    const mounted = useEvent($chatModule.mounted)
    const unmounted = useEvent($chatModule.reset)

    useEffect(() => {
      mounted('support')
      return () => unmounted()
    }, [])

    return (
      <Container>
        {messagesFirstLoading && <Loader />}
        {!messagesFirstLoading && (
          <>
            <ChatContainer>
              <Messages />
              <ChatMessageBox onSend={send} />
            </ChatContainer>
            <RevocationSessionDialog />
          </>
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
  display: flex;
`
