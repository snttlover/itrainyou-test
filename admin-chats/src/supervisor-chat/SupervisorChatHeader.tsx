import React from "react"
import styled from "styled-components"
import { ChatHeaderContainer } from "@/feature/chat/view/content/headers/common/ChatHeaderContainer"
import { Icon } from "@/oldcomponents/icon/Icon"

import { ChatHeaderTitle as Title } from "@/feature/chat/view/content/headers/common/ChatHeaderTitle"
import { MediaRange } from "@/lib/responsive/media"

export const SupervisorChatHeader = () => (
  <ChatHeaderContainer>
    <SupervisorChatIcon />
    <Title>Чат между пользователями</Title>
  </ChatHeaderContainer>
)

const SupervisorChatIcon = styled(Icon).attrs({ name: `bell` })`
  fill: ${props => props.theme.colors.primary};

  width: 40px;
  height: 40px;
  margin-right: 8px;
  ${MediaRange.lessThan(`mobile`)`
    width: 24px;
    height: 24px;
    margin-right: 4px;
  `}
`
