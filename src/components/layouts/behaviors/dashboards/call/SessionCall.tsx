import React, { useEffect, useRef, useState, useCallback } from "react"
import styled, { css } from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { Avatar } from "@/components/avatar/Avatar"
import { createSessionCallModule } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { useStore, useEvent } from "effector-react"
import { MediaRange } from "@/lib/responsive/media"
import { trackMouse } from "@/components/mouse-tracking/track-mouse"
import { togglePermissionGrantedModal, changeModalInfo } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { FullScreen, useFullScreenHandle } from "react-full-screen"

export const createSessionCall = ($module: ReturnType<typeof createSessionCallModule>) => {
  return () => {
    const play = useEvent($module.methods.play)
    const _update = useEvent($module.methods.update)
    const _toggleModal = useEvent(togglePermissionGrantedModal)

    const visibility = useStore($module.data.$callsVisibility)
    const permission = useStore($module.data.$userGrantedPermission)

    const [userActive, changeUserActivity] = useState(true)

    const videoCallRef = useRef(null)

    const time = useStore($module.data.$time)

    const handleFullscreen = useFullScreenHandle()

    if (visibility) {
      let timer: any
      trackMouse(videoCallRef, ((eventX, eventY) => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => changeUserActivity(false), 3000)
        !userActive ? clearTimeout(timer) : changeUserActivity(true)
      }))
    }


    useEffect(() => {
      const timer = setInterval(() => {
        if (time.minutesLeft > 0) {
          _update()
        }
      }, 60000)
      window.addEventListener('beforeunload', function() {
        const x = 200
        const a = (new Date()).getTime() + x

        close()
        while ((new Date()).getTime() < a) {}
      }, false)
      return () => {
        clearInterval(timer)
        _toggleModal(false)
      }
    }, [])

    const interlocutor = useStore($module.data.$interlocutor)
    const self = useStore($module.data.$self)

    const close = useEvent($module.methods.close)

    const changeMicro = useEvent($module.methods.changeMicro)
    const changeVideo = useEvent($module.methods.changeVideo)
    const changeFullScreen = useEvent($module.methods.changeFullScreen)

    const handleOnClickVideo = () => {
      if(permission.camera) {
        changeVideo(!self.video)
        /*navigator.mediaDevices.getUserMedia({audio: true, video: true})
                .then(function(stream) {
                  console.log("trueeeeee",stream)
                })
                .catch(function(err) {
                  console.log("errrrrrrrror",err)
                })*/
      }
      else {
        changeModalInfo("video")
        _toggleModal(true)
        /*navigator.mediaDevices.getUserMedia({audio: true, video: true})
                .then(function(stream) {
                  console.log("trueeeeee",stream)
                })
                .catch(function(err) {
                  console.log("errrrrrrrror",err)
                })*/
      }
    }

    const handleOnClickMicro = () => {
      if(permission.micro) {
        changeMicro(!self.micro)
      }
      else {
        changeModalInfo("mic")
        _toggleModal(true)
      }
    }

    const handleOnClose = () => {
      /*if (window.innerWidth <= 480) {
        handleFullscreen.exit().catch((e)=> console.log(e))
      }*/
      close()
    }

    const handleOnChangeFullscreen = () => {
      /*if (window.innerWidth <= 480) {
        handleFullscreen.enter().catch((e)=> console.log(e))
      }*/
      changeFullScreen(!self.fullscreen)
    }

    return (
      <div ref={videoCallRef}>
        <FullScreen handle={handleFullscreen}>
          <Container
            data-interlocutor-is-connected={interlocutor.connected}
            data-interlocutor-was-connected={interlocutor.wasConnected}
            data-visibility={visibility}
            data-fullscreen={self.fullscreen}
          >
            <Call>
              <WasNotConnected>Собеседник еще не присоединился</WasNotConnected>
              <NotConnected>Собеседник отключился</NotConnected>
              {time.minutesLeft && (<TimeTooltip data-terminate={time.isCloseToTerminate} visibility={userActive}>
                <Time>
                  <TimeLeftLabel>Осталось:</TimeLeftLabel>
                  <TimeLeft>{time.minutesLeft} минут</TimeLeft>
                </Time>
              </TimeTooltip>
              )}
              <Header visibility={userActive}>
                {interlocutor.info && (
                  <User>
                    {!interlocutor.micro && interlocutor.connected && <DisabledInterlocutorMicro />}
                    <StyledAvatar src={interlocutor.info.avatar} />
                    <Name>{interlocutor.info.name}</Name>
                  </User>
                )}
              </Header>
              <InterlocutorVideo id='InterlocutorVideo' >
                <InterlocutorVideoPlaceholder>
                  <InterlocutorIcon />
                  <InterlocutorVideoPlaceholderText>Собеседник не включил камеру</InterlocutorVideoPlaceholderText>
                </InterlocutorVideoPlaceholder>
              </InterlocutorVideo>
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

              <Footer visibility={userActive}>
                <Actions>
                  <IconContainer>
                    <ToggleVideo active={self.video} permission={permission.camera} onClick={handleOnClickVideo} />
                    {self.fullscreen && permission.camera && <IconToolTip>{self.video ? "Выключить камеру" : "Включить камеру" }</IconToolTip>}
                  </IconContainer>

                  <IconContainer>
                    <ToggleMicro active={self.micro} permission={permission.micro} onClick={handleOnClickMicro} />
                    {self.fullscreen && permission.micro && <IconToolTip>{self.micro ? "Выключить микрофон" : "Включить микрофон" }</IconToolTip>}
                  </IconContainer>

                  <IconFullScreenContainer>
                    <ToggleFullscreen active={self.fullscreen} onClick={handleOnChangeFullscreen} />
                    {self.fullscreen && <IconToolTip>{self.fullscreen ? "Свернуть окно" : "Развернуть окно" }</IconToolTip>}
                  </IconFullScreenContainer>

                  <IconContainer>
                    <HangUp onClick={handleOnClose} />
                    {self.fullscreen && <IconToolTip>Выйти из сессии</IconToolTip>}
                  </IconContainer>
                </Actions>
              </Footer>
            </Call>
          </Container>
        </FullScreen>
      </div>
    )
  }
}

const Tooltip = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30px;

  background: rgba(66, 66, 66, 0.8);
  border-radius: 2px;
  padding: 8px 12px;

  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  display: none;
  text-align: center;
  width: 100%;
  justify-content: center;
  z-index: 3;
`

const WasNotConnected = styled(Tooltip)``
const NotConnected = styled(Tooltip)``
const TimeTooltip = styled(Tooltip)<{visibility: boolean}>`
  &[data-terminate="true"] {
    background: rgba(255, 107, 0, 1);
  }

  &[data-terminate="false"] {
    opacity: ${({ visibility }) => (visibility ? "1" : "0")};
    transition: opacity 0.5s ease;
  }
`

const Header = styled.div<{visibility: boolean}>`
  z-index: 10;
  opacity: ${({ visibility }) => (visibility ? "1" : "0")};
  transition: opacity 0.5s ease;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  padding: 4px 8px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
`

const Footer = styled.div<{visibility: boolean}>`
  z-index: 10;
  opacity: ${({ visibility }) => (visibility ? "1" : "0")};
  display: flex;
  transition: opacity 0.5s ease;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
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

const InterlocutorIcon = styled(Icon).attrs({ name: "user" })`
  width: 34px;
  height: 34px;
  fill: #ffffff;
`

const InterlocutorVideoPlaceholder = styled(InterlocutorVideo)`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: #ffffff;
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

const MyUserVideoPlaceholderIcon = styled(Icon).attrs({ name: "user" })`
  width: 50px;
  height: 50px;
  fill: #ffffff;
`

const MyUserVideoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: #dbdee0;
`

const DisabledInterlocutorMicro = styled(Icon).attrs({ name: "disabled-interlocutor-micro" })`
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
  active?: boolean
  permission?: boolean
}

const ActionIcon = styled(Icon)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const IconToolTip = styled.span`
  width: 136px;
  height: auto;
  position: absolute;
  z-index: 1;
  padding: 12px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  bottom: 120%;
  left: 50%;
  margin-left: -68px;
  display: none;

  &:after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover ${IconToolTip} {
    display: block;
  }
  ${MediaRange.lessThan("mobile")`
      position: unset;
      
      &:hover ${IconToolTip} {
      display: none;
      }
  `}
`

const IconFullScreenContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover ${IconToolTip} {
    display: block;
  }
  ${MediaRange.lessThan("mobile")`
      position: unset;
      
      &:hover ${IconToolTip} {
      display: none;
      }
  `}
`

const ToggleVideo = styled(ActionIcon).attrs(({ active, permission }: ActionIconTypes) => {
  if (permission) {
    return { name: active ? "enabled-video" : "disabled-video", }
  }
  else {
    return { name: "no-cam-permission", }
  }
})<ActionIconTypes>``
const ToggleMicro = styled(ActionIcon).attrs(({ active, permission }: ActionIconTypes) => {
  if (permission) {
    return { name: active ? "enabled-micro" : "disabled-micro", }
  }
  else {
    return { name: "no-mic-permission", }
  }
})<ActionIconTypes>``
const ToggleFullscreen = styled(ActionIcon).attrs(({ active }: ActionIconTypes) => ({
  name: active ? "disabled-fullscreen" : "enabled-fullscreen",
}))<ActionIconTypes>``
const HangUp = styled(ActionIcon).attrs(({ active }: ActionIconTypes) => ({
  name: "hang-up",
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
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #ffffff;
  margin-left: 4px;
`

const TimeLeftLabel = styled.div`
  font-size: 14px;
  line-height: 22px;
`

const TimeLeft = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`

const fullscreenCSS = css`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 990;
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
  }

  ${Footer} {
    height: 84px;
  }
  
  ${User} {
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
    top: 24px;
    right: 20px;
    bottom: 16px;
  }
  ${Actions} {
    bottom: 16px;
  }
  ${ActionIcon} {
    width: 44px;
    height: 44px;
  }

  ${MediaRange.lessThan("tablet")`
      ${MyUserVideoPlaceholder},
      ${MyUserVideo} {
        top: 24px;
        right: 16px;
        width: 240px;
        height: 160px;
      }
      ${Actions} {
        bottom: 16px;
      }
    `}

  @media screen and (max-width: 900px) and (orientation : landscape) {
  height: 100vh;
  ${MyUserVideoPlaceholder},
  ${MyUserVideo} {
    top: unset;
    bottom: 86px;
    right: 16px;
    width: 160px;
    height: 100px;
  }
  ${Header} {
    padding: 4px 20px;
    justify-content: flex-start;
  }
  }

  @media screen and (max-width: 480px) and (orientation : portrait) {
    ${MyUserVideoPlaceholder},
    ${MyUserVideo} {
      top: unset;
      bottom: 86px;
      right: 16px;
      width: 160px;
      height: 100px;
    }
    ${Header} {
      padding: 4px 20px;
      justify-content: center;
    }
  }
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
  
  &[data-fullscreen="false"] {
    ${WasNotConnected}{
      top: 0;
    }

    ${NotConnected}{
      top: 0;
    }
    
    ${TimeTooltip}{
      top: 0;
      width: 160px;
      height: 26px;
    }

    ${TimeLeft}{
      font-size: 12px;
      line-height: 18px;
    }
    
    ${Footer}{
      padding: 0;
    }
    
  }
  
  @media screen and (max-width: 900px) and (orientation : landscape) {
  ${fullscreenCSS}
    
    ${ToggleFullscreen} {
      display: none;
    }
    ${IconFullScreenContainer} {
    display: none;
    }
    ${Actions} {
      bottom: 16px;
    }
    ${MyUserVideoPlaceholder},
    ${MyUserVideo} {
      width: 120px;
      height: 80.36px;      
    }
  }
  
  @media screen and (max-width: 480px) and (orientation : portrait) {
    ${fullscreenCSS}
    
    ${ToggleFullscreen} {
      display: none;
    }
    ${IconFullScreenContainer} {
    display: none;
    }
    ${Actions} {
      bottom: 16px;
    }
    ${MyUserVideoPlaceholder},
    ${MyUserVideo} {
      width: 120px;
      height: 80.36px;      
    }
  }

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
    ${InterlocutorVideo} {
      display: none;
    }
  }
  &[data-interlocutor-is-connected="false"] {
    ${NotConnected} {
      display: flex;
    }

    ${TimeTooltip} {
      top: 72px;
      display: flex;
    }

    ${MediaRange.lessThan("mobile")`
    ${NotConnected} {
      top: 30px;
      display: flex;
    }
  `}
  }
  
  &[data-interlocutor-is-connected="true"] {
    ${TimeTooltip} {
      display: flex;
    }

    ${MediaRange.lessThan("mobile")`
    ${TimeTooltip}{
      display: flex;
      top: 30px;
    }
  `}
  }
  &[data-interlocutor-was-connected="false"] {
    ${WasNotConnected} {
      display: flex;
    }
    ${NotConnected} {
      display: none !important;
    }
    ${TimeTooltip} {
      top: 72px;
      display: flex;
    }
    
    ${MediaRange.lessThan("mobile")`
    ${WasNotConnected} {
      top: 30px;
      display: flex;
    }
  `}
    
  }
`
/*
${MediaRange.lessThan("mobile")`
      ${MyUserVideoPlaceholder},
      ${MyUserVideo} {
        top: unset;
        bottom: 86px;
        right: 16px;
        width: 160px;
        height: 100px;
      }
      ${Header} {
      padding: 4px 20px;
      justify-content: center;
    }
    `}
 */