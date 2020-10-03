import React, { useState } from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent } from "effector-react/ssr"
import { changeSessionsMobileVisibility } from "@/feature/chat/modules/chat-sessions"

type MobileChatHeaderMenuProps = {
  openMaterials: () => void
}

export const MobileChatHeaderMenu = (props: MobileChatHeaderMenuProps) => {
  const [opened, changeOpened] = useState(false)
  const changeSessionsVisibility = useEvent(changeSessionsMobileVisibility)

  const openSessions = () => {
    changeSessionsVisibility(true)
    changeOpened(false)
  }

  return (
    <StyledMobileMoreButton>
      <MobileMoreIcon onClick={() => changeOpened(true)} />
      {opened && (
        <>
          <Back onClick={() => changeOpened(false)} />
          <Menu>
            <MenuItem onClick={() => openSessions()}>
              <SessionIcon /> Сессии
            </MenuItem>
            <MenuItem onClick={() => props.openMaterials()}>
              <MaterialsIcon /> Материалы диалога
            </MenuItem>
          </Menu>
        </>
      )}
    </StyledMobileMoreButton>
  )
}

const Back = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
`

const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  border-radius: 2px;
  background: #fff;
  z-index: 2; 
`

const MenuItem = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;

  font-size: 16px;
  line-height: 22px;
  color: #424242;
  white-space: nowrap;
`

const SessionIcon = styled(Icon).attrs({ name: `video2` })`
  fill: ${props => props.theme.colors.primary};
  margin-right: 10px;
`

const MaterialsIcon = styled(Icon).attrs({ name: `chat-files` })`
  fill: ${props => props.theme.colors.primary};
  margin-right: 10px;
`

const StyledMobileMoreButton = styled.div`
  display: none;
  cursor: pointer;
  margin-left: 15px;
  position: relative;
  ${MediaRange.lessThan(`mobile`)`
     display: flex;
     align-items: center;
     justify-content: center;
   `}
`

const MobileMoreIcon = styled(Icon).attrs({ name: `more` })`
  fill: ${props => props.theme.colors.primary};
`
