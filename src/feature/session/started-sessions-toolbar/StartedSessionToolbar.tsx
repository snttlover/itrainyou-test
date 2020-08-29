import React, { useEffect } from "react"
import styled from "styled-components"
import { Avatar } from "@/components/avatar/Avatar"
import { createStartSessionToolbarModel } from "@/feature/session/started-sessions-toolbar/create-start-session-toolbar.model"
import { useEvent, useList } from "effector-react"

export const createStartedSessionsToolbar = ($model: ReturnType<typeof createStartSessionToolbarModel>) => {
  return () => {
    const load = useEvent($model.methods.load)
    const reset = useEvent($model.methods.reset)
    const connectToSession = useEvent($model.methods.connectToSession)

    useEffect(() => {
      load()
      return () => reset()
    }, [])

    return (
      <div>
        {useList($model.data.$sessions, session => (
          <Container>
            <Toolbar>
              <StartedText>Сессия началась</StartedText>
              <User>
                <StyledAvatar src={session.avatar} />
                <Name>{session.name}</Name>
              </User>
              <Info>
                <Time>{session.time}</Time>
                <StartButton onClick={() => connectToSession(session.id)}>Зайти в сессию</StartButton>
              </Info>
            </Toolbar>
          </Container>
        ))}
      </div>
    )
  }
}

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1060px;
  width: 100%;
  padding: 0 40px;
`

const Container = styled.div`
  padding: 10px 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  display: flex;
  justify-content: center;
`

const StartedText = styled.div`
  font-size: 16px;
  line-height: 22px;
`
const User = styled.div`
  display: flex;
  align-items: center;
`
const StyledAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
`
const Name = styled.div`
  margin-left: 8px;

  font-size: 16px;
  line-height: 22px;
`
const Info = styled.div`
  display: flex;
  align-items: center;
`
const Time = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  margin-right: 20px;
`
const StartButton = styled.div`
  background: #fff;
  border-radius: 32px;
  padding: 4px 24px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`
