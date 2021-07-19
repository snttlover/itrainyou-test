import React, { useState } from "react"
import styled from "styled-components"
import { Dialog } from "@/old-components/dialog/Dialog"
import { Avatar } from "@/old-components/avatar/Avatar"
import { Button } from "@/old-components/button/normal/Button"
import { createStartSessionDialogModel } from "@/feature/session/start-session-dialog/create-start-session-dialog.model"
import { useEvent, useStore } from "effector-react"

export const createStartSessionDialog = ($module: ReturnType<typeof createStartSessionDialogModel>) => () => {
  const visibility = useStore($module.data.$dialogVisibility)
  const session = useStore($module.data.$session)
  const hide = useEvent($module.methods.hideDialog)
  const connectToSession = useEvent($module.methods.connectToSession)
  const callVisibility = useStore($module.data.$callsVisibility)

  const start = () => {
    connectToSession(session.id)
    hide()
  }

  return (
    <StyledDialog value={visibility && !callVisibility} onChange={() => hide()}>
      <Container>
        <Title>До сессии менее 5 минут!</Title>
        <Time>{session.time}</Time>
        <StyledAvatar src={session.avatar} />
        <Name>{session.name}</Name>
        <StartButton onClick={start}>Зайти в сессию</StartButton>
      </Container>
    </StyledDialog>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.div`
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #424242;
  margin-top: 3px;
`

const Time = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
  margin-top: 19px;
`

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin-top: 8px;
  background: #f6f6f6;
`

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
`

const StartButton = styled(Button)`
  margin-top: 48px;
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
`
