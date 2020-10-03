import React, { useEffect } from "react"
import styled from "styled-components"
import { ChatContainer } from "./content/ChatContainer"
import { PersonalChatHeader } from "./content/headers/personal/PersonalChatHeader"
import { createChatMessages } from "./content/messages/ChatMessages"
import { createChatMessageBox } from "./content/message-box/ChatMessageBox"
import { createChatModule } from "#/feature/chat"
import { useEvent, useStore } from "effector-react/ssr"
import { Loader } from "#/components/spinner/Spinner"
import { useParams } from "react-router-dom"
import { NotFound } from "#/feature/not-found/components/NotFound"
import { createChatSessions } from "#/feature/chat/view/content/chat-sessions/ChatSessionsList"
import { SystemChatHeader } from "#/feature/chat/view/content/headers/system/SystemChatHeader"
import { resetRevocation } from "#/pages/client/session/content/session-page-content/cancel-session/session-revocation"
import { RevocationSessionDialog } from "#/pages/client/session/content/session-page-content/cancel-session/RevocationSessionDialog"
import { changeSessionsMobileVisibility } from "#/feature/chat/modules/chat-sessions"
import { DenyCompletetionDialog } from "#/pages/client/session/content/session-page-content/deny-completetion-dialog/DenyCompletetionDialog"
// @ts-ignore
import { createMaterialsDialog } from "#/feature/chat/modules/chat-materials/createMaterialsDialog"

export const createChat = ($chatModule: ReturnType<typeof createChatModule>) => {
  const Messages = createChatMessages($chatModule.chatMessages)
  const Sessions = createChatSessions($chatModule.chatSessions)
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

    useEffect(() => {
      mounted(parseInt(params.id))
      resetRev()

      return () => {
        changeSessionsVisibility(false)
        unmounted()
      }
    }, [])

    const isSystemChat = chat.chatType === `SYSTEM`
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
              <Messages isSystem={chat.chatType === `SYSTEM`} />
              {!isSystemChat && <MessageBox />}
            </ChatContainer>
            <Sessions />
            <RevocationSessionDialog />
            <DenyCompletetionDialog />
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
