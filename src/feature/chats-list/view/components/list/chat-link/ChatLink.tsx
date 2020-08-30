import React from "react"
import styled from "styled-components"
import { Avatar } from "@/components/avatar/Avatar"
import { Icon } from "@/components/icon/Icon"
import { Button } from "@/components/button/normal/Button"
import { ChatLinkMaterials } from "@/feature/chats-list/view/components/list/chat-link/ChatLinkMaterials"
import { Link } from "react-router-dom"
import { ChatTypes } from "@/lib/api/chats/clients/get-chats"
import {Event} from "effector"
import { useEvent } from "effector-react"

export type ChatLinkTypes = {
  id: number,
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
          <LastMessage data-is-mine={props.lastMessage}>
            {props.lastMessageIsMine && `Вы: `}
            {props.lastMessage}
          </LastMessage>
        </MessageContent>
        <MessageInfo>
          <Time>{props.startTime}</Time>
          <Counter data-hide={!props.newMessagesCount}>{props.newMessagesCount}</Counter>
        </MessageInfo>
      </MessageColumn>
      <ActionsColumn>
        <ActionsHeader>
          <VideoIcon />
          <SessionStatus>{props.sessionTextStatus}</SessionStatus>
          {!!props.materialCount && <MobileMaterials>{props.materialCount}</MobileMaterials>}
        </ActionsHeader>
        <ActionsFooter>
          {!!props.newMessagesCount && <Materials>{props.materialCount}</Materials>}
          {props.isStarted && (
            <ActionsButtons onClick={startSessionHandler}>
              <SessionButton data-slim>Зайти в сессию</SessionButton>
              <MobileSessionButton>Зайти в сессию</MobileSessionButton>
            </ActionsButtons>
          )}
        </ActionsFooter>
      </ActionsColumn>
    </Container>
  )
}

const ActionsButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`

const Container = styled(Link)`
  display: flex;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 12px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
`

const Column = styled.div`
  flex: 1;
  flex-basis: 50%;
  padding: 12px;
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
  border-right: 1px solid #d3d7f3;
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

const ActionsColumn = styled(Column)`
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledAvatar = styled(Avatar)`
  margin-right: 12px;

  width: 52px;
  height: 52px;
  flex-basis: 52px;

  @media screen and (max-width: 560px) {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
    margin-right: 8px;
  }
`

const MessageContent = styled.div`
  flex: 1;
  width: 50%;

  @media screen and (max-width: 560px) {
    width: 50%;
  }
`

const UserName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  @media screen and (max-width: 560px) {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 0;
  }
`

// &[data-is-mine="true"] {
//   background: ${props => props.theme.colors.primaryBackground};
//   border-radius: 2px;
// }
const LastMessage = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  padding: 8px 4px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (max-width: 560px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Time = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #9aa0a6;
  margin-bottom: 14px;
  @media screen and (max-width: 560px) {
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 6px;
  }
`

const Counter = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  background: ${props => props.theme.colors.primary};
  border-radius: 16px;
  padding: 3px 4px;
  min-width: 23px;
  display: flex;
  justify-content: center;

  &[data-hide="true"] {
    visibility: hidden;
  }

  @media screen and (max-width: 560px) {
    font-size: 12px;
    line-height: 16px;
    padding: 1px 5px;
  }
`

const VideoIcon = styled(Icon).attrs({ name: `video` })`
  fill: ${props => props.theme.colors.primary};
  width: 24px;
  height: 24px;
  @media screen and (max-width: 560px) {
    width: 16px;
    height: 16px;
  }
`

const ActionsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
`

const SessionStatus = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 10px;
  @media screen and (max-width: 560px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const ActionsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SessionButton = styled(Button)`
  text-transform: uppercase;
  display: flex;
  align-self: flex-end;
  @media screen and (max-width: 560px) {
    display: none;
  }
`

const MobileSessionButton = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #4858cc;
  align-self: flex-end;
  display: none;
  @media screen and (max-width: 560px) {
    display: flex;
  }
`

const Materials = styled(ChatLinkMaterials)`
  display: flex;
  @media screen and (max-width: 560px) {
    display: none;
  }
`

const MobileMaterials = styled(ChatLinkMaterials)`
  display: none;
  @media screen and (max-width: 560px) {
    display: flex;
    margin-left: 8px;
  }
`
