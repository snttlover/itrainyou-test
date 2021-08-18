import React from "react"
import styled from "styled-components"
import { useStore, useEvent } from "effector-react"
import {
  $showDetailsOnMobile,
  changeDetailsVisibilityOnMobile,
  createChatDetailsModule,
} from "@/feature/chat/modules/chat-details"
import { Avatar } from "@/old-components/avatar/Avatar"
import { Tab, Tabs } from "@/new-components/tabs/Tabs"
import { MediaRange } from "@/lib/responsive/media"
import { createChatSessions } from "@/feature/chat/view/content/chat-details/sessions/ChatSessionsList"
import { createChatImages } from "@/feature/chat/view/content/chat-details/images/ChatImages"
import { createChatDocuments } from "@/feature/chat/view/content/chat-details/documents/ChatDocuments"
import { Icon } from "@/old-components/icon/Icon"

export const createChatDetails = (detailsModule: ReturnType<typeof createChatDetailsModule>) => {
  const Sessions = createChatSessions(detailsModule.modules.sessions)
  const Protos = createChatImages(detailsModule.modules.photos)
  const Documents = createChatDocuments(detailsModule.modules.documents)

  return () => {
    const tab = useStore(detailsModule.data.$tab)
    const changeTab = useEvent(detailsModule.methods.changeTab)
    const info = useStore(detailsModule.modules.info.$chat)
    const showOnMobile = useStore($showDetailsOnMobile)
    const changeMobileVisibility = useEvent(changeDetailsVisibilityOnMobile)

    return (
      <Container data-show-on-mobile={showOnMobile}>
        <MobileBack onClick={() => changeMobileVisibility(false)}>
          <MobileBackIcon />
          <MobileBackText>К чату</MobileBackText>
        </MobileBack>
        <Header>
          <StyledAvatar src={info.avatar || null} />
          <Name>{info.name}</Name>
        </Header>
        <StyledTabs value={tab} onChange={changeTab}>
          <StyledTab value='sessions'>Сессии</StyledTab>
          <StyledTab value='photos'>Фото</StyledTab>
          <StyledTab value='documents'>Файлы</StyledTab>
        </StyledTabs>
        <TabsContent>
          {tab === "sessions" && <Sessions />}
          {tab === "photos" && <Protos />}
          {tab === "documents" && <Documents />}
        </TabsContent>
      </Container>
    )
  }
}

const MobileBack = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e1e6ea;
`

const MobileBackIcon = styled(Icon).attrs({ name: "left-icon" })`
  fill: #424242;
  width: 8px;
  margin-right: 10px;
`

const MobileBackText = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

const Container = styled.div`
  position: relative;
  background: #fff;
  height: 100%;
  width: 320px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e1e6ea;

  @media screen and (max-width: 1225px) {
    &[data-show-on-mobile="false"] {
      display: none;
    }
  }

  @media screen and (max-width: 1139px) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    z-index: 2;
    border-left: 0;
  }

  ${MediaRange.lessThan("mobile")`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  `}
`

const Header = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
`

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin-right: 16px;
`

const Name = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
`

const TabsContent = styled.div`
  display: block;
  flex: 1;
  overflow: hidden;
`

const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: flex-start;
  padding: 0 16px;
  border-bottom: 1px solid #f4f5f7;
`

const StyledTab = styled(Tab)``
