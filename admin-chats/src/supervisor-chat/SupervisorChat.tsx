import { createSupervisorChatModel } from "./create-supervisor-chat.model"
import { createChatMessages } from "@/feature/chat/view/content/messages/ChatMessages"
import { Loader } from "@/components/spinner/Spinner"
import { ChatContainer } from "@/feature/chat/view/content/ChatContainer"
import React, { useEffect } from "react"
import { useEvent, useStore } from "effector-react"
import styled from "styled-components"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { ClientTheme } from "@/components/layouts/themes"
import { Dialog } from "@/components/dialog/Dialog"
import { SupervisorChatHeader } from "./SupervisorChatHeader"
import { Close } from "@/components/dialog/Dialog"

export const createSupervisorChat = (chatId: ChatId, $chatModule: ReturnType<typeof createSupervisorChatModel>) => {
  const Messages = createChatMessages($chatModule.chatMessages)
  // const MessageBox = createChatMessageBox($chatModule.messageBox)

  return () => {
    const messagesFirstLoading = useStore($chatModule.$firstLoading)

    const mounted = useEvent($chatModule.mounted)
    const unmounted = useEvent($chatModule.reset)

    const showDialog = useStore($chatModule.$showDialog)
    const changeDialogVisibility = useEvent($chatModule.changeDialogVisibility)

    useEffect(() => {
      mounted(chatId)
      return () => unmounted()
    }, [])

    return (
      <ClientTheme>
        <StyledDialog value={showDialog} onChange={changeDialogVisibility}>
          <Container>
            {messagesFirstLoading && <Loader />}
            {!messagesFirstLoading && (
              <>
                <StyledChatContainer>
                  <SupervisorChatHeader />
                  <Messages showUser={true} commonSystemMessages={true} />
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
  width: 100%;
  max-width: 700px;
  height: 90vh;
  padding: 0;
  border-radius: 10px;
  
  ${Close} {
    top: 17px;
  }
`


const Container = styled.div`
  position: relative;
  position: relative;
  height: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
`
