import styled from "styled-components"
import { useState } from "react"
import { ClickOutside } from "@/application/components/click-outside/ClickOutside"
import { CoachTooltipRow } from "@/application/components/layouts/behaviors/dashboards/coach/top-bar/coach-tooltip/CoachTooltipRow"
import { useStore } from "effector-react"
import { $userData } from "@/application/feature/user/user.model"

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
  &:hover {
    background: #75309e;
  }
`

const ClientRow = styled(CoachTooltipRow)`
  background: #4858cc;
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

export const CoachTooltip = (props: CoachTooltipTypes) => {
  const user = useStore($userData)

  const [visibility, changeVisibility] = useState(false)

  const backClick = (e: React.SyntheticEvent) => {
    changeVisibility(false)
    e.stopPropagation()
  }

  if (!user.coach) {
    return null
  }

  return (
    <ClickOutside onClickOutside={() => changeVisibility(false)}>
      <Container className={props.className} onClick={() => changeVisibility(true)}>
        {props.children}
        {visibility && (
          <>
            <Tooltip>
              <CoachRow label='Коуч' notificationsCount={0} messagesCount={0} to='/coach' />
              <ClientRow label='Клиент' notificationsCount={0} messagesCount={0} to='/client' />
            </Tooltip>
            {props.withBack && <Back onClick={backClick} />}
          </>
        )}
      </Container>
    </ClickOutside>
  )
}
