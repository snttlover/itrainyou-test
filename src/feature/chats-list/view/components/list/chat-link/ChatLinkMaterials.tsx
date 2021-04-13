import React from "react"
import styled from "styled-components"
import { Icon } from "@/oldcomponents/icon/Icon"

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  @media screen and (max-width: 560px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const Clip = styled(Icon).attrs({ name: "clip" })`
  fill: ${props => props.theme.colors.primary};
  margin-right: 8px;
  @media screen and (max-width: 560px) {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`

export const ChatLinkMaterials = ({ children, className }: { children: React.ReactChild, className?: string }) => (
  <Container className={className}>
    <Clip />
    {children}
  </Container>
)
