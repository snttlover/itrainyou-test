import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Icon } from "@/old-components/icon/Icon"

export const SystemChatLink = ({ link, newMessagesCount }: { link: string; newMessagesCount: number }) => (
  <Container to={link} data-has-messages={!!newMessagesCount}>
    <BellIcon />
    <Header>Уведомления о сессиях</Header>
  </Container>
)

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

const BellIcon = styled(Icon).attrs({ name: "bell" })`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  fill: ${props => props.theme.colors.primary};
`

const Header = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`
