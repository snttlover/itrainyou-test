import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Icon } from "@/old-components/icon/Icon"

type SystemChatLinkProps = {
  link: string
  newMessagesCount: number
  systemMessage: string
}

export const SystemChatLink = ({ link, newMessagesCount, systemMessage }: SystemChatLinkProps) => (
  <Container to={link}>
    <BellIcon />
    <Info>
      <Header>Уведомления</Header>
      <LastMessage>{systemMessage}</LastMessage>
    </Info>
    <MessageInfo>
      <Counter data-hide={!newMessagesCount}>{newMessagesCount}</Counter>
    </MessageInfo>
  </Container>
)

const Info = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  width: 50%;
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

const Container = styled(Link)`
  position: relative;
  cursor: pointer;
  display: flex;
  padding: 16px 12px;
  border-radius: 2px;
  align-items: center;
  padding-left: 8px;
`

const BellIcon = styled(Icon).attrs({ name: "circle-bell" })`
  width: 40px;
  height: 40px;
  min-width: 40px;
  margin-right: 12px;
  fill: ${props => props.theme.colors.primary};
`

const Header = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
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
  margin-right: 3px;

  &[data-hide="true"] {
    visibility: hidden;
  }
`
