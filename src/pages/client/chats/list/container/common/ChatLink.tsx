import React from "react"
import styled from "styled-components"
import {Avatar} from "@/components/avatar/Avatar"
import {Icon} from "@/components/icon/Icon"
import {Button} from "@/components/button/normal/Button"
import { ChatLinkMaterials } from "@/pages/client/chats/list/container/common/ChatLinkMaterials"

const Container = styled.div`
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
  @media screen and (max-width: 560px) {
    border-right: 0;
    border-bottom: 1px solid #efefef;
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

  @media screen and (max-width: 560px) {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
`

const MessageContent = styled.div`
  flex: 1;
`

const UserName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 8px;
  @media screen and (max-width: 560px) {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 0;
  }
`

const LastMessage = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #424242;
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

export const ChatLink = () => (
  <Container>
    <MessageColumn>
      <StyledAvatar src='https://avatars.mds.yandex.net/get-ott/374297/2a000001616b87458162c9216ccd5144e94d/orig' />
      <MessageContent>
        <UserName>Ступин Владислав</UserName>
        <LastMessage>Да, заходите в сессию</LastMessage>
      </MessageContent>
      <MessageInfo>
        <Time>12:25</Time>
        <Counter>12</Counter>
      </MessageInfo>
    </MessageColumn>
    <ActionsColumn>
      <ActionsHeader>
        <VideoIcon />
        <SessionStatus>Сессия началась</SessionStatus>
        <MobileMaterials>2</MobileMaterials>
      </ActionsHeader>
      <ActionsFooter>
        <Materials>2</Materials>
        <SessionButton data-slim>Зайти в сессию</SessionButton>
        <MobileSessionButton>Зайти в сессию</MobileSessionButton>
      </ActionsFooter>
    </ActionsColumn>
  </Container>
)
