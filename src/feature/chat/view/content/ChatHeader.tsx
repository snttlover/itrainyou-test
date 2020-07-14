import React from "react"
import styled from "styled-components"
import { Avatar } from "@/components/avatar/Avatar"
import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent } from "effector-react/ssr"
import { navigatePush } from "@/feature/navigation"
import { Link } from "react-router-dom"

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

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  flex: 1;
  ${MediaRange.lessThan(`mobile`)`
    font-family: Roboto;
    font-size: 16px;
    line-height: 22px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e5e5;
  align-items: center;
  ${MediaRange.lessThan(`mobile`)`
    padding: 14px 8px;
  `}
  
  &[data-has-link="true"] {
    ${StyledAvatar},
    ${Title} {
      cursor: pointer;
    }
  }
`

const MobileBackButton = styled(Icon).attrs({ name: `left-icon` })`
  width: 18px;
  height: 18px;
  cursor: pointer;
  fill: ${props => props.theme.colors.primary};
  margin-right: 12px;
  display: none;
  ${MediaRange.lessThan(`mobile`)`
    display: flex;
  `}
`

type ChatHeaderTypes = {
  avatar: string | null
  name: string
  backLink: any
  link?: any
}

export const ChatHeader = (props: ChatHeaderTypes) => {
  const navigate = useEvent(navigatePush)
  const userClick = () => {
    if (props.link) {
      navigate(props.link)
    }
  }

  return (
    <Container data-has-link={!!props.link}>
      <Link to={props.backLink} >
        <MobileBackButton />
      </Link>
      <StyledAvatar src={props.avatar} onClick={userClick} />
      <Title onClick={userClick}>{props.name}</Title>
    </Container>
  )
}
