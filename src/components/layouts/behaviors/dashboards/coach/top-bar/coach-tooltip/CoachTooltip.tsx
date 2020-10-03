import styled from "styled-components"
import { useState } from "react"
import { ClickOutside } from "@/components/click-outside/ClickOutside"
import { CoachTooltipRow } from "@/components/layouts/behaviors/dashboards/coach/top-bar/coach-tooltip/CoachTooltipRow"
import { useEvent, useStore } from "effector-react/ssr"
import { $userData } from "@/feature/user/user.model"
import { changeBlueLayoutMobileMenuVisibility } from "@/components/layouts/behaviors/dashboards/client/menu/blue-layout.mobile-menu"
import * as React from "react"
import { clientChatsSocket, coachChatsSocket } from "@/feature/socket/chats-socket"
import { logout } from "@/lib/network/token"

const Tooltip = styled.div`
  position: absolute;
  top: 100%;
  display: flex;
  right: 0;
  flex-direction: column;
  z-index: 2;
`

const Container = styled.div`
  position: relative;
`

type CoachTooltipTypes = {
  children: React.ReactChild
  className?: string
  withBack?: boolean
}

const CoachRow = styled(CoachTooltipRow)`
  background: #7d36a8;
  margin-bottom: 1px;
  cursor: pointer;
  &:hover {
    background: #75309e;
  }
`

const ClientRow = styled(CoachTooltipRow)`
  background: #4858cc;
  cursor: pointer;
  &:hover {
    background: #3746b0;
  }
`

const Back = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #424242;
  opacity: 0.6;
`

const Logout = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  background: #fff;
  cursor: pointer;
  height: 42px;
  display: flex;
  align-items: center;
  padding: 12px 13px;
  border-radius: 4px;
  margin-top: 2px;
  min-width: 120px;
  width: 100%;
`

export const CoachTooltip = (props: CoachTooltipTypes) => {
  const user = useStore($userData)
  const exit = useEvent(logout)

  const clientChatsCount = useStore(clientChatsSocket.data.$chatsCount)
  const coachChatsCount = useStore(coachChatsSocket.data.$chatsCount)

  const [visibility, changeVisibility] = useState(false)

  const backClick = (e: React.SyntheticEvent) => {
    changeVisibility(false)
    e.stopPropagation()
  }

  const hideSideBar = () => {
    changeBlueLayoutMobileMenuVisibility(false)
  }

  return (
    <ClickOutside onClickOutside={() => changeVisibility(false)}>
      <Container className={props.className} onClick={() => changeVisibility(true)}>
        {props.children}
        {visibility && (
          <>
            <Tooltip onClick={hideSideBar}>
              {!!user.coach && (
                <>
                  <CoachRow label='Коуч' notificationsCount={0} messagesCount={coachChatsCount} to='/coach' />
                  <ClientRow label='Клиент' notificationsCount={0} messagesCount={clientChatsCount} to='/client' />
                </>
              )}
              <Logout onClick={() => exit()}>Выйти</Logout>
            </Tooltip>
            {props.withBack && <Back onClick={backClick} />}
          </>
        )}
      </Container>
    </ClickOutside>
  )
}
