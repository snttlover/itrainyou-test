import React from "react"
import styled from "styled-components"
import { Avatar } from "@/components/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent } from "effector-react/ssr"
import { navigatePush } from "@/feature/navigation"
import { BanTooltip } from "@/feature/chat/view/content/headers/personal/ban/BanTooltip"
import { ChatHeaderMobileBackButton as MobileBackButton } from "@/feature/chat/view/content/headers/common/ChatHeaderMobileBackButton"
import { ChatHeaderTitle as Title } from "@/feature/chat/view/content/headers/common/ChatHeaderTitle"
import { ChatHeaderContainer } from "@/feature/chat/view/content/headers/common/ChatHeaderContainer"

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  ${MediaRange.lessThan(`mobile`)`
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
  avatar?: string | null
  name: string
  backLink: any
  link?: any
  type: string
}

export const PersonalChatHeader = (props: ChatHeaderTypes) => {
  const navigate = useEvent(navigatePush)
  const userClick = () => {
    if (props.link) {
      navigate(props.link)
    }
  }

  return (
    <Container data-has-link={!!props.link}>
      <MobileBackButton to={props.backLink} />
      <StyledAvatar src={props.avatar || null} onClick={userClick} />
      <Title onClick={userClick}>{props.name}</Title>
      {props.type === `coach` && <BanTooltip />}
    </Container>
  )
}