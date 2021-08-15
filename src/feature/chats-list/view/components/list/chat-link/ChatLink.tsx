import React from "react"
import styled from "styled-components"
import { Avatar } from "@/old-components/avatar/Avatar"
import { Link } from "react-router-dom"
import { ChatTypes } from "@/lib/api/chats/clients/get-chats"
import { Event } from "effector-root"
import { useEvent } from "effector-react"

export type ChatLinkTypes = {
  id: number
  type: ChatTypes
  userLink: string
  link: string
  avatar: string | null
  name: string
  startTime: string // 00:00
  newMessagesCount: number
  materialCount: number
  isStarted: boolean
  lastMessage: string
  isImage: boolean
  lastMessageIsMine: boolean
  highlightMessages: boolean
  sessionTextStatus: string
  startSession: Event<number>
}

export const ChatLink = (props: ChatLinkTypes) => {
  const startSession = useEvent(props.startSession)

  const startSessionHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    startSession(props.id)
  }

  return (
    <Container to={props.link}>
      <MessageColumn data-message-is-not-mine={props.highlightMessages}>
        <Link to={props.userLink}>
          <StyledAvatar src={props.avatar} />
        </Link>

        <MessageContent>
          <UserName>{props.name}</UserName>
          {props.lastMessage ? (
            <LastMessage data-is-mine={props.lastMessage}>
              {props.lastMessageIsMine && "Вы: "}
              {props.isImage && "Фотография"}
              {props.lastMessage}
            </LastMessage>
          ) : (
            <Empty>Нет сообщений</Empty>
          )}
        </MessageContent>
        <MessageInfo>
          <Time>{props.startTime}</Time>
          <Counter data-hide={!props.newMessagesCount}>{props.newMessagesCount}</Counter>
        </MessageInfo>
      </MessageColumn>
    </Container>
  )
}

const Empty = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #9aa0a6;
  font-weight: 300;
`

const Container = styled(Link)`
  display: flex;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
`

const Column = styled.div`
  flex: 1;
  flex-basis: 50%;
  padding: 12px 16px;
  height: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 560px) {
    padding: 8px;
  }
`

const MessageColumn = styled(Column)`
  display: flex;
  padding-left: 8px;
  width: 50%;

  &[data-message-is-not-mine="true"] {
    background: ${props => props.theme.colors.primaryBackground};
  }

  @media screen and (max-width: 560px) {
    border-right: 0;
    border-bottom: 1px solid #efefef;
    width: 100%;
  }
`

const StyledAvatar = styled(Avatar)`
  margin-right: 16px;

  width: 40px;
  height: 40px;
  flex-basis: 40px;
`

const MessageContent = styled.div`
  flex: 1;
  width: 50%;

  @media screen and (max-width: 560px) {
    width: 50%;
  }
`

const UserName = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

const LastMessage = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Time = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: #9aa0a6;
`

const Counter = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  background: #ff6b00;
  border-radius: 16px;
  padding: 3px 4px;
  min-width: 23px;
  display: flex;
  justify-content: center;

  &[data-hide="true"] {
    visibility: hidden;
  }
`
