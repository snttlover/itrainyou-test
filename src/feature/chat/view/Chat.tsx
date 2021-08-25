import React, { useEffect } from "react"
import styled from "styled-components"
import { ChatContainer } from "./content/ChatContainer"
import { PersonalChatHeader } from "./content/headers/personal/PersonalChatHeader"
import { createChatMessages } from "./content/messages/ChatMessages"
import { createChatMessageBox } from "./content/message-box/ChatMessageBox"
import { createChatModule } from "@/feature/chat"
import { useEvent, useStore } from "effector-react"
import { Loader } from "@/old-components/spinner/Spinner"
import { useParams } from "react-router-dom"
import { NotFound } from "@/feature/not-found/components/NotFound"
import { SystemChatHeader } from "@/feature/chat/view/content/headers/system/SystemChatHeader"
import { resetRevocation } from "@/pages/client/session/content/session-page-content/cancel-session/session-revocation"
import { RevocationSessionDialog } from "@/pages/client/session/content/session-page-content/cancel-session/RevocationSessionDialog"
import { changeSessionsMobileVisibility } from "@/feature/chat/modules/chat-sessions"
import { DenyCompletetionDialog } from "@/pages/client/session/content/session-page-content/deny-completetion-dialog/DenyCompletetionDialog"
import { createMaterialsDialog } from "@/feature/chat/modules/chat-materials/createMaterialsDialog"
import { createChatDetails } from "@/feature/chat/view/content/chat-details/ChatDetails"

export const createChat = ($chatModule: ReturnType<typeof createChatModule>) => {
  const Messages = createChatMessages($chatModule.chatMessages)
  const Details = createChatDetails($chatModule.chatDetails)
  const MessageBox = createChatMessageBox($chatModule.messageBox)
  const MaterialsDialog = createMaterialsDialog($chatModule.materials)
  return () => {
    const chat = useStore($chatModule.chat.$chat)
    const chatLoading = useStore($chatModule.chat.$loading)
    const params = useParams<{ id: string }>()
    const mounted = useEvent($chatModule.mounted)
    const unmounted = useEvent($chatModule.reset)
    const chatIsNotFound = useStore($chatModule.chat.$notFound)
    const blockedText = useStore($chatModule.chat.data.$blockedText)
    const resetRev = useEvent(resetRevocation)

    const changeSessionsVisibility = useEvent(changeSessionsMobileVisibility)
    const openMaterials = useEvent($chatModule.materials.methods.openDialog)

    const openImage = useEvent($chatModule.materials.modules.imagesDialog.openImageByIndex)

    useEffect(() => {
      let chatId = parseInt(params.id)

      // @ts-ignore
      chatId = isNaN(chatId) ? params.id : chatId

      mounted(chatId)
      resetRev()

      return () => {
        changeSessionsVisibility(false)
        unmounted()
      }
    }, [params.id])

    const isSystemChat = chat.chatType === "SYSTEM"
    const Header = isSystemChat ? (
      <SystemChatHeader {...chat} />
    ) : (
        <PersonalChatHeader {...chat} openMaterials={() => openMaterials()} />
      )

    return (
      <Container>
        {chatIsNotFound && <NotFound />}
        {chatLoading && <Loader />}
        {!chatLoading && !!chat.id && (
          <>
            <MaterialsDialog />
            <ChatContainer>
              {Header}
              <Messages isSystem={chat.chatType === "SYSTEM"} imageClick={openImage} />
              {!isSystemChat && <MessageBox blockedText={blockedText} />}
            </ChatContainer>
            {chat.chatType === "PERSONAL" && <Details />}
            <RevocationSessionDialog />
            <DenyCompletetionDialog />
          </>
        )}
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex: 1;
`
