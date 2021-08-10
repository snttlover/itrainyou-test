import React, { useEffect } from "react"
import styled from "styled-components"
import { createStartSessionToolbarModel } from "@/feature/session/started-sessions-toolbar/create-start-session-toolbar.model"
import { useEvent, useList } from "effector-react"
import { MediaRange } from "@/lib/responsive/media"
import { Icon } from "@/old-components/icon/Icon"

export const createStartedSessionsToolbar = ($model: ReturnType<typeof createStartSessionToolbarModel>) => {
  return () => {
    const load = useEvent($model.methods.load)
    const reset = useEvent($model.methods.reset)
    const connectToSession = useEvent($model.methods.connectToSession)

    useEffect(() => {
      load()
      return () => {
        reset()
      }
    }, [])

    return (
      <div>
        {useList($model.data.$sessions, session => (
          <Container>
            <Toolbar onClick={() => connectToSession(session.id)}>
              <CircleIcon />
              <Message>
                <StartedText>
                  {session.sessionIsStarted ? "Сессия началась" : "До сессии осталось меньше 5 минут!"}
                </StartedText>
                <Time>{session.time}</Time>
              </Message>
              <Info>
                <StartButton>Присоединиться</StartButton>
                <RightArrow />
              </Info>
            </Toolbar>
          </Container>
        ))}
      </div>
    )
  }
}

const CircleIcon = styled(Icon).attrs({ name: "circle" })`
  width: 20px;
  height: 20px;
  margin-right: 16px;
  animation: pulse 1.4s infinite;
`

const RightArrow = styled(Icon).attrs({ name: "right-arrow" })`
  display: none;
  height: 12px;
  stroke: #9bdcb9;
  ${MediaRange.lessThan("mobile")`
    display: block;
  `}
`

const Message = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1060px;
  width: 100%;
  padding: 0 40px;
  align-items: center;
  ${MediaRange.lessThan("tablet")`
      padding: 0;
  `}
`

const Container = styled.div`
  padding: 10px 24px;
  background: #3eb273;
  color: #ffffff;
  display: flex;
  justify-content: center;
  ${MediaRange.lessThan("mobile")`
      padding: 8px 16px;
  `}
`

const StartedText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
`

const Info = styled.div`
  display: flex;
  align-items: center;
`

const Time = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
`

const StartButton = styled.div`
  background: #fff;
  border-radius: 32px;
  padding: 5px 24px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  color: #3eb273;
  &:hover {
    opacity: 0.9;
  }
  ${MediaRange.lessThan("mobile")`
    display: none;
  `}
`
