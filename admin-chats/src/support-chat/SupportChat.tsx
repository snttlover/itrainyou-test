import { createAdminSupportChatModel } from "./create-admin-support-chat.model"
import { createChatMessages } from "@/feature/chat/view/content/messages/ChatMessages"
import { Loader } from "@/components/spinner/Spinner"
import { ChatContainer } from "@/feature/chat/view/content/ChatContainer"
import React, { useEffect } from "react"
import { useEvent, useStore } from "effector-react"
import styled from "styled-components"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { ClientTheme } from "@/components/layouts/themes"
import { Dialog } from "@/components/dialog/Dialog"
import { SupportChatHeader } from "./SupportChatHeader"
import { Close } from "@/components/dialog/Dialog"
import { createChatMessageBox } from "@/feature/chat/view/content/message-box/ChatMessageBox"
import { createMaterialsDialog } from "@/feature/chat/modules/chat-materials/createMaterialsDialog"
import { MediaRange } from "@/lib/responsive/media"

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
      // console.log("first")
      // window.addEventListener("resize", ()=>{
      //   console.log("resize")
      //   const viewheight = window.innerHeight
      //   const viewwidth = window.innerWidth
      //   const viewport = document.querySelector("meta[name=viewport]")
      //   viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0")
      // })
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
                  <StyledMargin />
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

const StyledMargin = styled.div`
  display: none;
  ${MediaRange.lessThan("mobile")`
      height: 10vh;
      display: flex;
    `}
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  padding: 0;
  border-radius: 10px;
  
  ${Close} {
    top: 17px;
  }
`


const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
`
