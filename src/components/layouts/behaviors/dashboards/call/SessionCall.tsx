import React, { useEffect } from "react"
import styled, { css } from "styled-components"

import { Icon } from "#/components/icon/Icon"
import { Avatar } from "#/components/avatar/Avatar"
import { createSessionCallModule } from "#/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { useStore, useEvent } from "effector-react/ssr"
import { MediaRange } from "#/lib/responsive/media"

export const createSessionCall = ($module: ReturnType<typeof createSessionCallModule>) => {
  return () => {
    const play = useEvent($module.methods.play)

    useEffect(() => {
      play()
      return () => {}
    }, [])

    const interlocutor = useStore($module.data.$interlocutor)
    const self = useStore($module.data.$self)

    const close = useEvent($module.methods.close)

    const changeMicro = useEvent($module.methods.changeMicro)
    const changeVideo = useEvent($module.methods.changeVideo)
    const changeFullScreen = useEvent($module.methods.changeFullScreen)

    const visibility = useStore($module.data.$callsVisibility)
    const time = useStore($module.data.$time)

    return (
      <Container
        data-interlocutor-is-connected={interlocutor.connected}
        data-interlocutor-was-connected={interlocutor.wasConnected}
        data-visibility={visibility}
        data-fullscreen={self.fullscreen}
      >
        <Call>
          <WasNotConnected>Собеседник еще не присоединился</WasNotConnected>
          <NotConnected>Собеседник отключился</NotConnected>
          <Header>
            {interlocutor.info && (
              <User>
                {!interlocutor.micro && <DisabledInterlocutorMicro />}
                <StyledAvatar src={interlocutor.info.avatar} />
                <Name>{interlocutor.info.name}</Name>
              </User>
            )}
            <Time>
              {time.minutesLeft && (
                <>
                  <TimeLeftLabel>Осталось:</TimeLeftLabel>
                  <TimeLeft data-terminate={time.isCloseToTerminate}>{time.minutesLeft} минут</TimeLeft>
                </>
              )}
            </Time>
            <Close onClick={() => close()} />
          </Header>
          <InterlocutorVideo id='InterlocutorVideo' />
          {!interlocutor.video && interlocutor.connected && (
            <InterlocutorVideoPlaceholder>
              <InterlocutorIcon />
              <InterlocutorVideoPlaceholderText>Собеседник не включил камеру</InterlocutorVideoPlaceholderText>
            </InterlocutorVideoPlaceholder>
          )}
          <MyUserVideo id='MyUserVideo' />
          {!self.video && (
            <MyUserVideoPlaceholder>
              <MyUserVideoPlaceholderIcon />
            </MyUserVideoPlaceholder>
          )}

          <Actions>
            <ToggleVideo active={self.video} onClick={() => changeVideo(!self.video)} />
            <ToggleMicro active={self.micro} onClick={() => changeMicro(!self.micro)} />
            <ToggleFullscreen active={self.fullscreen} onClick={() => changeFullScreen(!self.fullscreen)} />
          </Actions>
        </Call>
      </Container>
    )
  }
}

const Tooltip = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50px;

  background: rgba(66, 66, 66, 0.8);
  border-radius: 2px;
  padding: 8px 12px;

  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  display: none;
  z-index: 3;
  text-align: center;
  width: 100%;
  justify-content: center;
`

const WasNotConnected = styled(Tooltip)``
const NotConnected = styled(Tooltip)``

const Header = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
`

const Time = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
`

const Call = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const InterlocutorVideo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`

const InterlocutorIcon = styled(Icon).attrs({ name: `user` })`
  width: 34px;
  height: 34px;
  fill: ${props => props.theme.colors.invert.primary};
`

const InterlocutorVideoPlaceholder = styled(InterlocutorVideo)`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.invert.primary};
  z-index: 1;
  background: #dbdee0;
`

const InterlocutorVideoPlaceholderText = styled.div`
  margin-top: 15px;
  display: none;
`

const MyUserVideo = styled.div`
  position: absolute;
  display: none;
  background: #dbdee0;
  z-index: 2;
`

const MyUserVideoPlaceholderIcon = styled(Icon).attrs({ name: `user` })`
  width: 50px;
  height: 50px;
  fill: ${props => props.theme.colors.invert.primary};
`

const MyUserVideoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: #dbdee0;
`

const DisabledInterlocutorMicro = styled(Icon).attrs({ name: `disabled-interlocutor-micro` })`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`

const Actions = styled.div`
  position: absolute;
  bottom: 4px;
  width: 208px;
  display: flex;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`

type ActionIconTypes = {
  active: boolean
}

const ActionIcon = styled(Icon)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const ToggleVideo = styled(ActionIcon).attrs(({ active }: ActionIconTypes) => ({
  name: active ? "enabled-video" : "disabled-video",
}))<ActionIconTypes>``
const ToggleMicro = styled(ActionIcon).attrs(({ active }: ActionIconTypes) => ({
  name: active ? "enabled-micro" : "disabled-micro",
}))<ActionIconTypes>``
const ToggleFullscreen = styled(ActionIcon).attrs(({ active }: ActionIconTypes) => ({
  name: active ? "disabled-fullscreen" : "enabled-fullscreen",
}))<ActionIconTypes>``

const User = styled.div`
  display: none;
  align-items: center;
`
const StyledAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
`

const Name = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  margin-left: 4px;
`

const Close = styled(Icon).attrs({ name: `close` })`
  width: 36px;
  height: 36px;
  display: none;
  cursor: pointer;
  fill: #fff;
`

const TimeLeftLabel = styled.div``
const TimeLeft = styled.div`
  &[data-terminate="true"] {
    color: #ffa666;
  }
`

const fullscreenCSS = css`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  ${Tooltip} {
    max-width: 259px;
  }

  ${InterlocutorIcon} {
    width: 50px;
    height: 50px;
  }
  ${InterlocutorVideoPlaceholderText} {
    display: flex;
  }
  ${InterlocutorVideoPlaceholder} {
    background: #9aa0a6;
  }

  ${Header} {
    padding: 4px 20px;
    justify-content: space-between;
  }
  ${User} {
    display: flex;
  }
  ${Close} {
    display: flex;
  }
  ${MyUserVideoPlaceholder},
  ${MyUserVideo} {
    display: flex;

    width: 240px;
    height: 160px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    position: absolute;
    right: 20px;
    bottom: 16px;
  }
  ${Actions} {
    bottom: 16px;
  }
  ${ActionIcon} {
    width: 52px;
    height: 52px;
  }

  ${MediaRange.lessThan(`tablet`)`
      ${MyUserVideoPlaceholder},
      ${MyUserVideo} {
        top: 76px;
        right: 16px;
        width: 240px;
        height: 160px;
      }
      ${Actions} {
        bottom: 52px;
      }
    `}
`

const Container = styled.div`
  position: fixed;
  right: 24px;
  bottom: 36px;
  width: 240px;
  height: 160px;
  display: flex;
  background: #9aa0a6;
  z-index: 200;
  border-radius: 2px;
  overflow: hidden;

  &[data-visibility="false"] {
    display: none !important;
  }

  &[data-fullscreen="true"] {
    ${fullscreenCSS}
  }
  ${MediaRange.lessThan(`mobile`)`
    ${fullscreenCSS}
    
    ${ToggleFullscreen} {
      display: none;
    }
    ${Actions} {
      bottom: 40px;
    }
    ${MyUserVideoPlaceholder},
    ${MyUserVideo} {
      width: 120px;
      height: 80.36px;      
    }
  `}

  &[data-interlocutor-was-connected="false"],
  &[data-interlocutor-is-connected="false"] {
    ${MyUserVideoPlaceholder},
    ${MyUserVideo} {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: unset;
      bottom: unset;
      display: flex;
    }
  }
  &[data-interlocutor-is-connected="false"] {
    ${NotConnected} {
      display: flex;
    }
  }
  &[data-interlocutor-was-connected="false"] {
    ${WasNotConnected} {
      display: flex;
    }
    ${NotConnected} {
      display: none !important;
    }
  }
`
