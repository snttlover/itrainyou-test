import React from "react"
import styled from "styled-components"
import { ChatSessionListItem } from "@/feature/chat/view/content/chat-sessions/ChatSessionListItem"
import { MediaRange } from "@/lib/responsive/media"

export const ChatSessionsList = () => (
  <Container>
    <Header>Сессии</Header>
    <SessionTabs>
      <Tab data-selected='true'>Скоро</Tab>
      <Tab>Будут</Tab>
      <Tab>Прошли</Tab>
    </SessionTabs>
    <Sessions>
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={1} videosCount={2} documentsCount={3} />
      <ChatSessionListItem
        date='Сегодня'
        time='21:00'
        imagesCount={1}
        videosCount={2}
        documentsCount={3}
        timer='00:12:15'
      />
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={0} videosCount={0} documentsCount={0} />
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={1} videosCount={2} documentsCount={3} />
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={1} videosCount={2} documentsCount={3} />
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={1} videosCount={2} documentsCount={3} />
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={1} videosCount={2} documentsCount={3} />
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={1} videosCount={2} documentsCount={3} />
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={1} videosCount={2} documentsCount={3} />
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={1} videosCount={2} documentsCount={3} />
      <ChatSessionListItem date='Сегодня' time='21:00' imagesCount={1} videosCount={2} documentsCount={3} />
    </Sessions>
  </Container>
)

const Container = styled.div`
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
  `}
`

const SessionTabs = styled.div`
  display: flex;
`

const Tab = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2px;
  border-bottom: 2px solid #fff;
  cursor: pointer;
  &[data-selected="true"] {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
  }
`

const Header = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  padding: 17px 12px 14px;
`

const Sessions = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  height: calc(100% - 77px);
`
