import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { Icon } from "@/oldcomponents/icon/Icon"
import { createTestCallModule, changeCallModal, $testCallModal, testCall, $compatibility } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { useStore, useEvent } from "effector-react"
import { MediaRange } from "@/lib/responsive/media"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { Tab, Tabs } from "@/oldcomponents/tabs/Tabs"
import { ProgressBar } from "@/oldcomponents/progress-bar/ProgressBar"
import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { NotCompatibleDialog } from "@/oldcomponents/layouts/behaviors/dashboards/call/NotCompatibleDialog"
import { Title as Header } from "@/pages/coach/schedule/CoachSchedulePage"


const StyledTabs = styled(Tabs)`
  display: flex;
  position: relative;
  margin-bottom: 24px;
`

const StyledTab = styled(Tab)`
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2px 12px;
  background: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  max-width: 50px;
  &[data-active="true"] {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    background: transparent;
  }
`

const StyledDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 24px;
  width: 90%;
  min-height: unset;

  ${StyledTab}:not(:first-child) {
    margin-left: 24px;
  }
`

const SpeakersCheckButton = styled(DashedButton)`
  width: 185px;
`

//${props => (props.progress ? props.progress : "10")}%
const Progress = styled.div<{ progress: number }>`
  height: 4px;
  width: 100%;
  background: red;
  border-radius: 8px;

  &::after {
    position: absolute;
    content: "";
    height: 4px;
    width: 30%;
    left: 0px;
    top: 0px;
    background: #ffffff;
    border-radius: 8px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-top: 8px;
  margin-bottom: 18px;
`

const VideoTest = styled.div`
  margin-top: 16px;
  width: 360px;
  height: 240px;
  display: flex;
  background: #424242;

  ${MediaRange.lessThan("mobile")`
    width: 250px;
    height: 180px;
  `}
`

const MyUserVideo = styled.div`
  position: absolute;
  display: none;
  background: #dbdee0;
  z-index: 2;
`

const VideoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: #424242;
`

const MyUserVideoPlaceholderIcon = styled(Icon).attrs({ name: "user" })`
  width: 50px;
  height: 50px;
  fill: #ffffff;
`

const CameraIcon = styled(Icon).attrs({ name: "camera" })`
  fill: #424242;
  height: 14px;
  margin-right: 17px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #F4EFF7;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  padding: 17px 21px;
  margin-bottom: 44px;
  cursor: pointer;
`

const VideoTabContainer = ($module: ReturnType<typeof createTestCallModule>) => {
  return () => {
    const _mounted = useEvent($module.methods.mounted)
    const close = useEvent($module.methods.close)

    useEffect(() => {
      _mounted("video")

      return () => {
        close()
      }
    }, [])

    return (
      <Container>
        <Description>Если вы видите свое изображение, значит камера работает.</Description>
        <VideoTest id='VideoTest' >
          {/*<MyUserVideoPlaceholder>
            <MyUserVideoPlaceholderIcon />
          </MyUserVideoPlaceholder>*/}
        </VideoTest>
      </Container>
    )
  }
}

const AudioTabContainer = ($module: ReturnType<typeof createTestCallModule>) => {
  return () => {
    const audioLevel = useStore($module.data.$audioLevel)
    const _mounted = useEvent($module.methods.mounted)
    const close = useEvent($module.methods.close)

    useEffect(() => {
      _mounted("audio")

      return () => {
        close()
      }
    }, [])

    const handleOnClick = () => {

      const audioPlayer = document.getElementById("SpeakersTest")
      // @ts-ignore
      !!audioPlayer && audioPlayer.play()
    }

    return (
      <Container>
        <Title>Микрофон</Title>
        <Description>Если вы видите зеленый индикатор, то микрофон работает хорошо</Description>
        {/*<Progress progress={audioLevel} />*/}
        <ProgressBar percent={audioLevel} />
        <Title>Динамик</Title>
        <Description>Если вы слышите звук, то динамик работает</Description>
        <SpeakersCheckButton onClick={handleOnClick}>Проверить динамик</SpeakersCheckButton>
        <audio src="/speakers_test.mp3" id="SpeakersTest">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </Container>
    )
  }
}

const VideoTab = VideoTabContainer(testCall)
const AudioTab = AudioTabContainer(testCall)

const TestCallModal = () => {
  const [tab, changeTab] = useState<"audio" | "video">("video")
  const toggle = useEvent(changeCallModal)
  const visibility = useStore($testCallModal)

  return (
    <StyledDialog value={visibility} onChange={toggle}>
      <Header>Проверка связи</Header>
      <>
        <StyledTabs value={tab} onChange={changeTab}>
          <StyledTab value='video'>Видео</StyledTab>
          <StyledTab value='audio'>Аудио</StyledTab>
        </StyledTabs>
        {tab === "audio" ? <AudioTab /> : null}
        {tab === "video" ? <VideoTab /> : null}
      </>
    </StyledDialog>
  )
}

export const CheckMediaDevices = () => {

  const showModal = useEvent(changeCallModal)
  const toggle = useEvent(changeCallModal)
  const visibility = useStore($testCallModal)
  const compatibility = useStore($compatibility)

  return (
    <InfoContainer onClick={() => showModal(true)}>
      {!compatibility ? <NotCompatibleDialog visibility={visibility} close={() => toggle(false)} /> :<TestCallModal /> }
      <CameraIcon />
      <div>Проверьте камеру и микрофон до встречи с клиентом</div>
    </InfoContainer>
  )
}
