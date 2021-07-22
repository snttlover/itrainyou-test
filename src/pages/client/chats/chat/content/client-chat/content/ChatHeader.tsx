import React from "react"
import styled from "styled-components"
import {Avatar} from "@/old-components/avatar/Avatar"
import {Icon} from "@/old-components/icon/Icon"
import {MediaRange} from "@/lib/responsive/media"

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e5e5;
  align-items: center;
  ${MediaRange.lessThan("mobile")`
    padding: 14px 8px;
  `}
`

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

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  flex: 1;
  ${MediaRange.lessThan("mobile")`
    font-family: Roboto;
    font-size: 16px;
    line-height: 22px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`

const MobileBackButton = styled(Icon).attrs({ name: "left-icon" })`
  width: 18px;
  height: 18px;
  cursor: pointer;
  fill: ${props => props.theme.colors.primary};
  margin-right: 12px;
  display: none;
  ${MediaRange.lessThan("mobile")`
    display: flex;
  `}
`

export const ChatHeader = () => (
  <Container>
    <MobileBackButton />
    <StyledAvatar src='https://avatars.mds.yandex.net/get-ott/374297/2a000001616b87458162c9216ccd5144e94d/orig' />
    <Title>Константин Константинович</Title>
  </Container>
)
