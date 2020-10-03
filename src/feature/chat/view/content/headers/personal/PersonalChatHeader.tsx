import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Avatar } from "#/components/avatar/Avatar"
import { MediaRange } from "#/lib/responsive/media"
import { BanTooltip } from "#/feature/chat/view/content/headers/personal/ban/BanTooltip"
import { ChatHeaderMobileBackButton as MobileBackButton } from "#/feature/chat/view/content/headers/common/ChatHeaderMobileBackButton"
import { ChatHeaderTitle as Title } from "#/feature/chat/view/content/headers/common/ChatHeaderTitle"
import { ChatHeaderContainer } from "#/feature/chat/view/content/headers/common/ChatHeaderContainer"
import { MobileChatHeaderMenu } from "#/feature/chat/view/content/headers/personal/MobileMenu"
import { Icon } from "#/components/icon/Icon"

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

const MaterialsIcon = styled(Icon).attrs({ name: "chat-files" })`
  width: 20px;
  height: 20px;
  fill: #9aa0a6;
  margin-right: 21px;
  cursor: pointer;
  ${MediaRange.lessThan(`mobile`)`
      display: none;
  `}
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
  openMaterials: () => void
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
      <MobileChatHeaderMenu openMaterials={props.openMaterials} />
      <MaterialsIcon onClick={props.openMaterials} />
      {props.type === `coach` && (
        <BanTooltip userId={props.userId} blocked={props.blocked} restricted={props.restricted} />
      )}
    </Container>
  )
}
