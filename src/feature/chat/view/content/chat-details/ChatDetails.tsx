import React from "react"
import styled from "styled-components"
import { useStore, useEvent } from "effector-react"
import { createChatDetailsModule } from "@/feature/chat/modules/chat-details"
import { Avatar } from "@/old-components/avatar/Avatar"
import { Tab, Tabs } from "@/new-components/tabs/Tabs"
import { MediaRange } from "@/lib/responsive/media"
import { createChatSessions } from "@/feature/chat/view/content/chat-sessions/ChatSessionsList"

export const createChatDetails = (detailsModule: ReturnType<typeof createChatDetailsModule>) => {
  const Sessions = createChatSessions(detailsModule.modules.sessions)

  return () => {
    const tab = useStore(detailsModule.data.$tab)
    const changeTab = useEvent(detailsModule.methods.changeTab)

    return (
      <Container>
        <Header>
          <StyledAvatar
            src={
              "https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/600x380"
            }
          />
          <Name>Виктор Крылова</Name>
        </Header>
        <StyledTabs value={tab} onChange={changeTab}>
          <StyledTab value='sessions'>Сессии</StyledTab>
          <StyledTab value='photos'>Фото</StyledTab>
          <StyledTab value='documents'>Файлы</StyledTab>
        </StyledTabs>
        <TabsContent>{tab === "sessions" && <Sessions />}</TabsContent>
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
  background: #fff;
  height: 100%;
  flex-basis: 320px;
  width: 320px;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  padding: 16px;
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
  overflow: auto;
`

const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: flex-start;
  padding: 0 16px;
  border-bottom: 1px solid #f4f5f7;
  ${MediaRange.lessThan("mobile")`
    margin-top: 20px;
    justify-content: space-around;
  `}
`

const StyledTab = styled(Tab)``
