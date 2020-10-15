import React from "react"
import styled from "styled-components"
import { ChatSessionListItem } from "@/feature/chat/view/content/chat-sessions/ChatSessionListItem"
import { MediaRange } from "@/lib/responsive/media"
import {
  $showSessionsOnMobile,
  changeSessionsMobileVisibility,
  createChatSessionsModule,
} from "@/feature/chat/modules/chat-sessions"
import { createInfinityScroll } from "@/feature/pagination"
import { useList, useStore } from "effector-react"
import { Tabs, Tab } from "@/components/tabs/Tabs"
import { useEvent } from "effector-react"
import { Icon } from "@/components/icon/Icon"

export const createChatSessions = (sessionsModule: ReturnType<typeof createChatSessionsModule>) => {
  const Pagination = createInfinityScroll(sessionsModule.modules.pagination)

  return () => {
    const loading = useStore(sessionsModule.modules.pagination.data.$loading)
    const tab = useStore(sessionsModule.data.$tab)
    const changeTab = useEvent(sessionsModule.methods.changeTab)
    const isEmpty = useStore(sessionsModule.modules.pagination.data.$listIsEmpty)

    const changeMobileVisibility = useEvent(changeSessionsMobileVisibility)
    const showOnMobile = useStore($showSessionsOnMobile)

    return (
      <Container data-show-on-mobile={showOnMobile}>
        <Header>
          <MobileBackButton onClick={() => changeMobileVisibility(false)} />
          Сессии
        </Header>
        <StyledTabs value={tab} onChange={changeTab}>
          {loading && <BlockTabs />}
          <StyledTab value='future'>Будут</StyledTab>
          <StyledTab value='past'>Прошли</StyledTab>
        </StyledTabs>
        <Sessions>
          {isEmpty && <Empty>Пока нет сессий</Empty>}
          <Pagination>
            {useList(sessionsModule.data.$sessions, session => (
              <ChatSessionListItem link={session.link} date={session.date} time={session.time} />
            ))}
          </Pagination>
        </Sessions>
      </Container>
    )
  }
}

const MobileBackButton = styled(Icon).attrs({ name: `left-icon` })`
  display: none;
  width: 24px;
  height: 24px;
  ${MediaRange.lessThan(`mobile`)`
    display: flex;
    fill:  ${props => props.theme.colors.primary};
    margin-right: 12px;
  `}
`

const Container = styled.div`
  position: relative;
  margin-left: 32px;
  width: 280px;
  flex-basis: 280px;
  background: #fff;
  border-radius: 2px;
  height: 100%;
  ${MediaRange.lessThan(`tablet`)`
     margin-left: 12px;
     width: 232px;
  `}
  ${MediaRange.lessThan(`mobile`)`
    display: none;
    
    &[data-show-on-mobile="true"] {
      display: block !important;
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 100;
      margin-left: 0 !important;
      padding: 17px;
      background: #ECEFF1;
    }
  `}
  
`

const StyledTabs = styled(Tabs)`
  display: flex;
  position: relative;
`

const BlockTabs = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background: transparent;
  width: 100%;
  height: 100%;
`

const StyledTab = styled(Tab)`
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2px;
  background: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  &[data-active="true"] {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    background: transparent;
  }
`

const Header = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  padding: 17px 12px 14px;
  display: flex;
  align-items: center;
  ${MediaRange.lessThan(`mobile`)`
    font-family: Roboto Slab;
    font-size: 20px;
    line-height: 26px;
    padding-top: 0;
  `}
`

const Sessions = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  height: calc(100% - 77px);
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 12px;
  `}
`

const Empty = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
  position: absolute;
  font-size: 16px;
  line-height: 22px;
  color: #9aa0a6;
`
