import { createSupervisorChatModel } from "./create-supervisor-chat.model"
import { createChatMessages } from "@/feature/chat/view/content/messages/ChatMessages"
import { Loader } from "@/components/spinner/Spinner"
import { ChatContainer } from "@/feature/chat/view/content/ChatContainer"
import React, { useEffect } from "react"
import { useEvent, useStore } from "effector-react"
import styled from "styled-components"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { ClientTheme } from "@/components/layouts/themes"
import { Dialog } from "@/components/dialog/Dialog"
import { createChatMessageBox } from "@/feature/chat/view/content/message-box/ChatMessageBox"

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
          <Container>
            {messagesFirstLoading && <Loader />}
            {!messagesFirstLoading && (
              <>
                <StyledChatContainer>
                  <Messages />
                  {/*<MessageBox />*/}
                </StyledChatContainer>
              </>
            )}
          </Container>
        </StyledDialog>
      </ClientTheme>
    )
  }
}

const StyledChatContainer = styled(ChatContainer)`
  max-width: unset;
  width: 100%;
`

const StyledDialog = styled(Dialog)`
  width: 700px;
  height: 90vh;
  padding: 0;
  border-radius: 10px;
`


const Container = styled.div`
  position: relative;
  position: relative;
  height: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
`
