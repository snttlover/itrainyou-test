import React, {useRef, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Avatar } from "@/components/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import { BanTooltip } from "@/feature/chat/view/content/headers/personal/ban/BanTooltip"
import { ChatHeaderMobileBackButton as MobileBackButton } from "@/feature/chat/view/content/headers/common/ChatHeaderMobileBackButton"
import { ChatHeaderTitle as Title } from "@/feature/chat/view/content/headers/common/ChatHeaderTitle"
import { ChatHeaderContainer } from "@/feature/chat/view/content/headers/common/ChatHeaderContainer"
import { MobileChatHeaderMenu } from "@/feature/chat/view/content/headers/personal/MobileMenu"

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
  link: string
  type: string
  blocked: boolean
  restricted: boolean
  userId: number
}

export const PersonalChatHeader = (props: ChatHeaderTypes) => {
  return (
    <Container data-has-link={!!props.link}>
      <MobileBackButton to={props.backLink} />

      <Link to={props.link!}>
        <StyledAvatar src={props.avatar || null} />
      </Link>
      <Title>
        <Link to={props.link!}>{props.name}</Link>
      </Title>
      <MobileChatHeaderMenu />
      {props.type === `coach` && (
        <BanTooltip userId={props.userId} blocked={props.blocked} restricted={props.restricted} />
      )}
    </Container>
  )
}
