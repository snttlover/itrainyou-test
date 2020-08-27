import React from "react"
import styled from "styled-components"

import enabledVideo from './images/enabled-video.svg'
import disabledVideo from './images/disabled-video.svg'
import enabledMicro from './images/enabled-micro.svg'
import disabledMicro from './images/disabled-micro.svg'
import enabledFullscreen from './images/enabled-fullscreen.svg'
import disabledFullscreen from './images/disabled-fullscreen.svg'

export const SessionCall = () => (
  <Container>
    <Call>
      <Header>
        <Time>Осталось: 25 минут</Time>
      </Header>
      <InterlocutorVideo id='InterlocutorVideo' />
      <MyUserVideo id='MyUserVideo' />

      <Actions>
        <ToggleVideo />
        <ToggleMicro />
        <ToggleFullScreen />
      </Actions>
    </Call>
  </Container>
)

const Header = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
`

const Time = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
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
`

const MyUserVideo = styled.div`
  position: absolute;
  display: none;
`

const Container = styled.div`
  position: fixed;
  right: 24px;
  bottom: 36px;
  width: 240px;
  height: 160px;
  display: flex;
`

const Actions = styled.div`

`

const ActionIcon = (inactiveImage: string, activatedImage: string) => {
  return styled.div`
    background: url("${inactiveImage}") no-repeat;
    background-size: cover;
    background-position: center center;
    &[data-activated="true"] {
      background: url("${activatedImage}") no-repeat;
    }
  `
}

const ToggleVideo = ActionIcon(enabledVideo, disabledVideo)

const ToggleMicro = ActionIcon(enabledMicro, disabledMicro)

const ToggleFullScreen = ActionIcon(enabledFullscreen, disabledFullscreen)
