import React from "react"
import styled from "styled-components"
import { Avatar } from "@/old-components/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import { ChatHeaderMobileBackButton as MobileBackButton } from "@/feature/chat/view/content/headers/common/ChatHeaderMobileBackButton"
import { ChatHeaderTitle as Title } from "@/feature/chat/view/content/headers/common/ChatHeaderTitle"
import { ChatHeaderContainer } from "@/feature/chat/view/content/headers/common/ChatHeaderContainer"
import { Icon } from "@/old-components/icon/Icon"

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  ${MediaRange.lessThan("mobile")`
    width: 24px;
    height: 24px;
    margin-right: 4px;
  `}
`

const Container = styled(ChatHeaderContainer)`
  &[data-has-link="true"] {
    ${StyledAvatar},
    ${Title} {
      cursor: pointer;
    }
  }
`

type ChatHeaderTypes = {
  supportName?: string
  backLink?: string
  avatar?: string | null
  hasUser: boolean
}

const SupportIcon = styled(Icon).attrs({ name: "support" })`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  ${MediaRange.lessThan("mobile")`
    width: 24px;
    height: 24px;
    margin-right: 4px;
  `}
`

export const SupportChatHeader = (props: ChatHeaderTypes): JSX.Element => (
  <Container>
    <MobileBackButton to={props.backLink} />
    {!props.avatar && <SupportIcon />}
    {!!props.avatar && <StyledAvatar src={props.avatar} />}
    <Title>{props.hasUser ? props.supportName : "Чат поддержки"}</Title>
  </Container>
)
