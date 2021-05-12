import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { Icon } from "@/oldcomponents/icon/Icon"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import { createTestCallModule, changeCallModal, $testCallModal, testCall } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { useStore, useEvent } from "effector-react"
import { MediaRange } from "@/lib/responsive/media"
import { trackMouse } from "@/oldcomponents/mouse-tracking/track-mouse"
import { togglePermissionGrantedModal, changeModalInfo } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { NotCompatibleDialog } from "@/oldcomponents/layouts/behaviors/dashboards/call/NotCompatibleDialog"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { Tab, Tabs } from "@/oldcomponents/tabs/Tabs"
import { ProgressBar } from "@/oldcomponents/progress-bar/ProgressBar"

const StyledDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 24px;
  width: 90%;
  min-height: unset;
`

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
  max-width: 200px;
  &[data-active="true"] {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    background: transparent;
  }
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

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`

const VideoTest = styled.div`
  margin-top: 16px;
  width: 360px;
  height: 240px;
  display: flex;
`

const MyUserVideo = styled.div`
  position: absolute;
  display: none;
  background: #dbdee0;
  z-index: 2;
`

const MyUserVideoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: #dbdee0;
`

const MyUserVideoPlaceholderIcon = styled(Icon).attrs({ name: "user" })`
  width: 50px;
  height: 50px;
  fill: #ffffff;
`

const VideoTabContainer = ($module: ReturnType<typeof createTestCallModule>) => {
  return () => {
    const audioLevel = useStore($module.data.$audioLevel)
    const _mounted = useEvent($module.methods.mounted)

    useEffect(() => {
      console.log("video test")
      _mounted("video")

    }, [])

    return (
      <Container>
        <Text>Если вы видите свое изображение, значит камера работает.</Text>
        <VideoTest id='VideoTest' >
          <MyUserVideoPlaceholder>
            <MyUserVideoPlaceholderIcon />
          </MyUserVideoPlaceholder>
        </VideoTest>
      </Container>
    )
  }
}

const AudioTabContainer = ($module: ReturnType<typeof createTestCallModule>) => {
  return () => {
    const audioLevel = useStore($module.data.$audioLevel)
    const _mounted = useEvent($module.methods.mounted)

    useEffect(() => {
      console.log("audio test")
      _mounted("audio")

    }, [])

    return (
      <Container>
        <Text>Микрофон</Text>
        {/*<Progress progress={audioLevel} />*/}
        <ProgressBar percent={audioLevel}></ProgressBar>
      </Container>
    )
  }
}

const VideoTab = VideoTabContainer(testCall)
const AudioTab = AudioTabContainer(testCall)

export const TestCallModal = () => {
  const [tab, changeTab] = useState<"audio" | "video">("video")
  const toggle = useEvent(changeCallModal)
  const visibility = useStore($testCallModal)

  return (
    <StyledDialog value={visibility} onChange={toggle}>
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