import { createSupportChatModel } from "@/feature/support/create-support-chat.model"
import { createChatMessages } from "@/feature/chat/view/content/messages/ChatMessages"
import { Loader } from "@/components/spinner/Spinner"
import { ChatContainer } from "@/feature/chat/view/content/ChatContainer"
import { createChatMessageBox } from "@/feature/chat/view/content/message-box/ChatMessageBox"
import React, { useEffect } from "react"
import { useEvent, useStore } from "effector-react/ssr"
import styled from "styled-components"
import { SupportChatHeader } from "@/feature/support/SupportChatHeader"
import { ContentContainer } from "@/components/layouts/ContentContainer"

export const createSupportChat = ($chatModule: ReturnType<typeof createSupportChatModel>) => {
  const Messages = createChatMessages($chatModule.chatMessages)
  const MessageBox = createChatMessageBox($chatModule.messageBox)

  return () => {
    const messagesFirstLoading = useStore($chatModule.$firstLoading)

    const mounted = useEvent($chatModule.mounted)
    const unmounted = useEvent($chatModule.reset)

    const support = useStore($chatModule.$support)

    useEffect(() => {
      mounted("support")
      return () => unmounted()
    }, [])

    return (
      <ContentWrapper>
        <Container>
          {messagesFirstLoading && <Loader />}
          {!messagesFirstLoading && (
            <>
              <ChatContainer>
                <SupportChatHeader avatar={support?.avatar} hasUser={!!support} backLink={"/coach"} supportName={support?.name} />
                <Messages />
                <MessageBox />
              </ChatContainer>
            </>
          )}
        </Container>
      </ContentWrapper>
    )
  }
}

const ContentWrapper = styled(ContentContainer)`
  position: relative;
  height: 100%;
`

const Container = styled.div`
  position: relative;
  padding-top: 8px;
  padding-bottom: 16px;
  position: relative;
  height: 100%;
  display: flex;
`
