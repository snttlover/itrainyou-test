import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Icon } from "@/components/icon/Icon"

export const SystemChatLink = ({ link }: { link: string }) => (
  <Container to={link}>
    <BellIcon />
    <Header>Системный чат</Header>
  </Container>
)

const Container = styled(Link)`
  cursor: pointer;
  display: flex;
  padding: 12px 8px;
  border-radius: 2px;
  align-items: center;
  background: ${props => props.theme.colors.primaryBackground};
  margin-bottom: 12px;
`

const BellIcon = styled(Icon).attrs({ name: `bell` })`
  width: 52px;
  height: 52px;
  margin-right: 12px;
  fill: ${props => props.theme.colors.primary};
`

const Header = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
`
