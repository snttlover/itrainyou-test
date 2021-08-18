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
  <Container to={link} data-has-messages={!!newMessagesCount}>
    <BellIcon />
    <Info>
      <Header>Уведомления</Header>
      <LastMessage>{systemMessage}</LastMessage>
    </Info>
  </Container>
)

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
  cursor: pointer;
  display: flex;
  padding: 16px 12px;
  border-radius: 2px;
  align-items: center;
  &[data-has-messages="true"] {
    background: ${props => props.theme.colors.primaryBackground};
  }
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
