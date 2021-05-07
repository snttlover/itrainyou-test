import React from "react"
import { ChatHeaderTitle as Title } from "@/feature/chat/view/content/headers/common/ChatHeaderTitle"
import styled from "styled-components"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import { ChatHeaderContainer } from "@/feature/chat/view/content/headers/common/ChatHeaderContainer"
import { Icon } from "@/oldcomponents/icon/Icon"

type ChatHeaderTypes = {
  avatar: string | null,
  name: string
  showMaterials: () => void
}

export const SupportChatHeader = (props: ChatHeaderTypes) => {
  return (
    <Container>
      <StyledAvatar src={props.avatar || null} />

      <Title>{props.name}</Title>
      <MaterialsIcon onClick={() => props.showMaterials()} />
    </Container>
  )
}

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
    margin-right: 50px;
    cursor: pointer;
    ${MediaRange.lessThan(`mobile`)`
        margin-right: 16px;
    `}
`
