import { createAdminSupportChatModel } from "./create-admin-support-chat.model"
import { createChatMessages } from "@/feature/chat/view/content/messages/ChatMessages"
import { Loader } from "@/components/spinner/Spinner"
import { ChatContainer } from "@/feature/chat/view/content/ChatContainer"
import React, { useEffect } from "react"
import { useEvent, useStore } from "effector-react/ssr"
import styled from "styled-components"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { ClientTheme } from "@/components/layouts/themes"
import { Dialog } from "@/components/dialog/Dialog"
import { SupportChatHeader } from "./SupportChatHeader"
import { Close } from "@/components/dialog/Dialog"
import { createChatMessageBox } from "@/feature/chat/view/content/message-box/ChatMessageBox"
import { createMaterialsDialog } from "@/feature/chat/modules/chat-materials/createMaterialsDialog"

export const createSupportChat = (chatId: ChatId, $chatModule: ReturnType<typeof createAdminSupportChatModel>) => {
  const Messages = createChatMessages($chatModule.chatMessages)
  const MessageBox = createChatMessageBox($chatModule.messageBox)
  const MaterialsDialog = createMaterialsDialog($chatModule.materials)

  return () => {
    const messagesFirstLoading = useStore($chatModule.$firstLoading)

    const mounted = useEvent($chatModule.mounted)
    const unmounted = useEvent($chatModule.reset)
    const chatHeader = useStore($chatModule.$chatHeader)

    const showDialog = useStore($chatModule.$showDialog)
    const changeDialogVisibility = useEvent($chatModule.changeDialogVisibility)

    const openDialog = useEvent($chatModule.materials.methods.openDialog)

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
                  <SupportChatHeader {...chatHeader} showMaterials={() => openDialog()} />
                  <Messages showUser={true} />
                  <MessageBox />
                </StyledChatContainer>
                <MaterialsDialog />
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
