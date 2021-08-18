import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Avatar } from "@/old-components/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import { BanTooltip } from "@/feature/chat/view/content/headers/personal/ban/BanTooltip"
import { ChatHeaderMobileBackButton as MobileBackButton } from "@/feature/chat/view/content/headers/common/ChatHeaderMobileBackButton"
import { ChatHeaderTitle as Title } from "@/feature/chat/view/content/headers/common/ChatHeaderTitle"
import { ChatHeaderContainer } from "@/feature/chat/view/content/headers/common/ChatHeaderContainer"
import { MobileChatHeaderMenu } from "@/feature/chat/view/content/headers/personal/MobileMenu"
import { Icon } from "@/old-components/icon/Icon"
import { useEvent, useStore } from "effector-react"
import { $showDetailsOnMobile, changeDetailsVisibilityOnMobile } from "@/feature/chat/modules/chat-details"

type ChatHeaderTypes = {
  avatar?: string | null
  name: string
  backLink?: any
  link: string
  type: string
  blocked: boolean
  restricted: boolean
  userId: number
  openMaterials: () => void
}

export const PersonalChatHeader = (props: ChatHeaderTypes) => {
  const showOnMobile = useStore($showDetailsOnMobile)
  const changeMobileVisibility = useEvent(changeDetailsVisibilityOnMobile)
  return (
    <Container data-has-link={!!props.link}>
      <MobileBackButton to={props.backLink} />

      <Link to={props.link!}>
        <StyledAvatar src={props.avatar || null} />
      </Link>
      <Title>
        <Link to={props.link!}>{props.name}</Link>
      </Title>
      <DetailsWrapper onClick={() => changeMobileVisibility(!showOnMobile)}>
        <DetailsIcon />
        <DetailsText>Делали</DetailsText>
      </DetailsWrapper>
      {props.type === "coach" && (
        <BanTooltip userId={props.userId} blocked={props.blocked} restricted={props.restricted} />
      )}
    </Container>
  )
}

const DetailsWrapper = styled.div`
  display: none;
  align-items: center;
  @media screen and (max-width: 1225px) {
    display: flex;
  }
`

const DetailsIcon = styled(Icon).attrs({ name: "info" })`
  fill: ${props => props.theme.colors.primary};
  width: 19px;
  height: 19px;
  margin-right: 10px;
`

const DetailsText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.colors.primary};
`

const StyledAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
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
  ${MediaRange.lessThan("mobile")`
      display: none;
  `}
`
