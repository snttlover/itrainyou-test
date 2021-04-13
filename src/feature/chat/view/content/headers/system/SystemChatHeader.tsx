import React from "react"
import styled from "styled-components"
import { ChatHeaderContainer } from "@/feature/chat/view/content/headers/common/ChatHeaderContainer"
import { Icon } from "@/oldcomponents/icon/Icon"

import { ChatHeaderMobileBackButton as MobileBackButton } from "@/feature/chat/view/content/headers/common/ChatHeaderMobileBackButton"
import { ChatHeaderTitle as Title } from "@/feature/chat/view/content/headers/common/ChatHeaderTitle"
import { MediaRange } from "@/lib/responsive/media"

export const SystemChatHeader = ({ backLink }: { backLink: string }) => (
  <ChatHeaderContainer>
    <MobileBackButton to={backLink} />
    <SystemChatIcon />
    <Title>Уведомления о сессиях</Title>
  </ChatHeaderContainer>
)

const SystemChatIcon = styled(Icon).attrs({ name: "bell" })`
  fill: ${props => props.theme.colors.primary};

  width: 40px;
  height: 40px;
  margin-right: 8px;
  ${MediaRange.lessThan("mobile")`
    width: 24px;
    height: 24px;
    margin-right: 4px;
  `}
`

const Container = styled.div``
