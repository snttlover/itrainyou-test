import React  from "react"
import styled from "styled-components"
import { createSessionChatModule } from "@/oldcomponents/layouts/behaviors/dashboards/call/chat/create-session-chat-module"
import { ChatContainer } from "@/pages/client/chats/chat/content/client-chat/content/ChatContainer"
import { createChatMessages } from "@/feature/chat/view/content/messages/ChatMessages"
import { Close, createChatMessageBox, DocInfo } from "@/feature/chat/view/content/message-box/ChatMessageBox"
import { useEvent, useStore } from "effector-react"
import { Loader } from "@/oldcomponents/spinner/Spinner"
import { NotFound } from "@/feature/not-found/components/NotFound"
import { RevocationSessionDialog } from "@/pages/client/session/content/session-page-content/cancel-session/RevocationSessionDialog"
import { DenyCompletetionDialog } from "@/pages/client/session/content/session-page-content/deny-completetion-dialog/DenyCompletetionDialog"
// @ts-ignore
import { createMaterialsDialog } from "@/feature/chat/modules/chat-materials/createMaterialsDialog"
import { Icon } from "@/oldcomponents/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { ChatMessageContainer } from "@/feature/chat/view/content/messages/content/ChatMessage"

export const createSessionChat = ($chatModule: ReturnType<typeof createSessionChatModule>) => {
  const Messages = createChatMessages($chatModule.modules.chat.chatMessages)
  const MessageBox = createChatMessageBox($chatModule.modules.chat.messageBox)
  const MaterialsDialog = createMaterialsDialog($chatModule.modules.chat.materials)
  return () => {
    const isVisible = useStore($chatModule.data.$visibility)
    const chat = useStore($chatModule.modules.chat.chat.$chat)
    const chatLoading = useStore($chatModule.data.$pending)
    const chatIsNotFound = useStore($chatModule.modules.chat.chat.$notFound)
    const changeVisibility = useEvent($chatModule.methods.changeVisibility)

    const openImage = useEvent($chatModule.modules.chat.materials.modules.imagesDialog.openImageByIndex)
    const close = () => changeVisibility(false)

    return (
      <>
        {isVisible && (
          <SessionChatContainer>
            <MobileClose onClick={close} />
            {chatIsNotFound && <NotFound />}
            {chatLoading && <Loader />}
            {!chatLoading && !!chat.id && (
              <>
                <MaterialsDialog />
                <StyledChatContainer>
                  <Header onClose={close} />
                  <Messages imageClick={openImage} />
                  <MessageBox />
                </StyledChatContainer>
                <RevocationSessionDialog />
                <DenyCompletetionDialog />
              </>
            )}
          </SessionChatContainer>
        )}
      </>
    )
  }
}

const StyledChatContainer = styled(ChatContainer)`
  width: 400px;
  ${MediaRange.lessThan("mobile")`
    position: relative;
    height: calc(100% - 20px);
  `}
  ${Close} {
    margin-right: 10px;
  }
  ${DocInfo} {
    max-width: 190px;
  }
`

const MobileClose = styled.div`
  height: 20px;
  display: none;
`

export const SessionChatContainer = styled.div`
  min-width: 400px;
  width: 400px;
  display: none;
  position: relative;
  background: #fff;
  overflow: hidden;
  
  ${ChatMessageContainer} {
    max-width: 100%;
  }

  @media screen and (max-width: 650px) {
    left: 0;
    top: 0px;
    width: 100%;
    min-width: 100%;
    height: 100%;
    z-index: 10;
    position: fixed;
    background: transparent;
    
    ${MobileClose} {
      display: block;
    }
    
    ${StyledChatContainer} {
      width: 100%;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      margin-right: 0;
      height: calc(100% - 20px);
      max-width: unset;
    }
  }
`

type HeaderProps = {
  onClose: () => void
}

const Header = (props: HeaderProps) => {
  return (
    <StyledHeader>
      Чат <CloseIcon onClick={props.onClose} />
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid #e1e6ea;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 24px;
  color: #5B6670;
`

const CloseIcon = styled(Icon).attrs({ name: "close" })`
  width: 24px;
  height: 24px;
  fill: #424242;
  cursor: pointer;
`
