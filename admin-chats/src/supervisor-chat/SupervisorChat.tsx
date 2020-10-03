import { createSupervisorChatModel } from "./create-supervisor-chat.model"
import { createChatMessages } from "#/feature/chat/view/content/messages/ChatMessages"
import { Loader } from "#/components/spinner/Spinner"
import { ChatContainer } from "#/feature/chat/view/content/ChatContainer"
import React, { useEffect } from "react"
import { useEvent, useStore } from "effector-react"
import styled from "styled-components"
import { ContentContainer } from "#/components/layouts/ContentContainer"
import { ChatId } from "#/lib/api/chats/coach/get-messages"
import { ClientTheme } from "#/components/layouts/themes"
import { Dialog } from "#/components/dialog/Dialog"

export const createSupervisorChat = (chatId: ChatId, $chatModule: ReturnType<typeof createSupervisorChatModel>) => {
  const Messages = createChatMessages($chatModule.chatMessages)
  // const MessageBox = createChatMessageBox($chatModule.messageBox)

  return () => {
    const messagesFirstLoading = useStore($chatModule.$firstLoading)

    const mounted = useEvent($chatModule.mounted)
    const unmounted = useEvent($chatModule.reset)

    useEffect(() => {
      mounted(chatId)
      return () => unmounted()
    }, [])

    return (
      <ClientTheme>
        <StyledDialog value={true} onChange={() => {}}>
          <ContentWrapper>
            <Container>
              {messagesFirstLoading && <Loader />}
              {!messagesFirstLoading && (
                <>
                  <ChatContainer>
                    <Messages />
                    {/*<MessageBox />*/}
                  </ChatContainer>
                </>
              )}
            </Container>
          </ContentWrapper>
        </StyledDialog>

      </ClientTheme>
    )
  }
}

const StyledDialog = styled(Dialog)`
  width: 700px;
  height: 90vh;
`

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
