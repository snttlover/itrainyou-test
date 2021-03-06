import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"
import {
  changeCallModal,
  $testCallModal,
  $compatibility,
} from "@/old-components/layouts/behaviors/dashboards/call/create-session-call.model"
import { useStore, useEvent } from "effector-react"
import { MediaRange } from "@/lib/responsive/media"
import { Dialog } from "@/old-components/dialog/Dialog"
import { Tab, Tabs } from "@/old-components/tabs/Tabs"
import { ProgressBar } from "@/old-components/progress-bar/ProgressBar"
import { DashedButton } from "@/old-components/button/dashed/DashedButton"
import { NotCompatibleDialog } from "@/old-components/layouts/behaviors/dashboards/call/NotCompatibleDialog"
import { Title as Header } from "@/pages/coach/schedule/CoachSchedulePage"
import { Informer } from "@/new-components/informer/Informer"
import {
  createTestCallModule,
  testCall,
} from "@/old-components/layouts/behaviors/dashboards/call/create-test-call.module"

const StyledTabs = styled(Tabs)`
  display: flex;
  position: relative;
  margin-bottom: 24px;
`

const StyledTab = styled(Tab)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
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
  color: #5b6670;
`

const VideoTest = styled.div`
  width: 360px;
  height: 240px;
  display: flex;
  background: #424242;
  border-radius: 8px;
  z-index: 2;

  ${MediaRange.lessThan("mobile")`
    width: 250px;
    height: 180px;
  `}
`

const VideoPlaceholder = styled(VideoTest)`
  align-items: center;
  justify-content: center;
  display: flex;
  color: #ffffff;
  z-index: 1;
`

const NoCamText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #e1e6ea;
  text-align: center;

  ${MediaRange.lessThan("mobile")`
    width: 224px;
  `}
`

const StyledLink = styled.div`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 8px;
`

const CameraIcon = styled(Icon).attrs({ name: "camera" })`
  fill: #424242;
  width: 24px;
  height: 24px;
  margin-right: 17px;
`

const InfoContainer = styled.div<{ type: "coach" | "client" }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  padding: 17px 21px;
  margin-bottom: 24px;
  margin-top: ${({ type }) => (type === "client" ? "16px" : "0")};
  cursor: pointer;
  color: #5b6670;
  max-width: 600px;
`

const StyledProgressBar = styled(ProgressBar)`
  margin-top: 16px;
  margin-bottom: 24px;
  max-width: 364px;

  ${MediaRange.lessThan("mobile")`
    max-width: 256px;
  `}
`

const VideoTabContainer = ($module: ReturnType<typeof createTestCallModule>) => {
  return () => {
    const _mounted = useEvent($module.methods.mounted)
    const permission = useStore($module.data.$userGrantedPermission)
    const close = useEvent($module.methods.close)

    useEffect(() => {
      _mounted("video")

      return () => {
        close()
      }
    }, [])

    const handleOnLinkClick = () => {
      if ((navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf("OPR")) != -1) {
        window.open("https://help.opera.com/ru/latest/web-preferences/#????????????????????-????????????????-??-????????????")
      } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        window.open("https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DDesktop&hl=ru")
      } else if (navigator.userAgent.indexOf("Safari") != -1) {
        if (window.innerWidth >= 480) {
          window.open("https://support.apple.com/ru-ru/guide/safari/ibrw7f78f7fe/mac")
        } else {
          window.open("https://ipadstory.ru/kak-upravlyat-nastrojkami-privatnosti-v-safari-na-iphone-i-ipad.html")
        }
      } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        window.open("https://support.mozilla.org/ru/kb/upravlenie-razresheniyami-dlya-kamery-i-mikrofona-")
      }
    }

    return (
      <Container>
        {permission.camera ? (
          <>
            <Description>???????? ???? ???????????? ???????? ??????????????????????, ???????????? ???????????? ????????????????.</Description>
            <VideoTest id='VideoTest'>
              <VideoPlaceholder>
                <NoCamText>???????????????? ???????????????? ?? ??????????????</NoCamText>
              </VideoPlaceholder>
            </VideoTest>
          </>
        ) : (
          <>
            <Informer colorful backGround={"no"}>
              ?????? ?????????????? ?? ??????????????????????
            </Informer>
            <StyledLink onClick={handleOnLinkClick}>?????? ?????????????????? ???????????? ?? ??????????????????????</StyledLink>
          </>
        )}
      </Container>
    )
  }
}

const AudioTabContainer = ($module: ReturnType<typeof createTestCallModule>) => {
  return () => {
    const audioLevel = useStore($module.data.$audioLevel)
    const permission = useStore($module.data.$userGrantedPermission)
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

    const handleOnLinkClick = () => {
      if ((navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf("OPR")) != -1) {
        window.open("https://help.opera.com/ru/latest/web-preferences/#????????????????????-????????????????-??-????????????")
      } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        window.open("https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DDesktop&hl=ru")
      } else if (navigator.userAgent.indexOf("Safari") != -1) {
        if (window.innerWidth >= 480) {
          window.open("https://support.apple.com/ru-ru/guide/safari/ibrw7f78f7fe/mac")
        } else {
          window.open("https://ipadstory.ru/kak-upravlyat-nastrojkami-privatnosti-v-safari-na-iphone-i-ipad.html")
        }
      } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        window.open("https://support.mozilla.org/ru/kb/upravlenie-razresheniyami-dlya-kamery-i-mikrofona-")
      }
    }

    return (
      <Container>
        {permission.micro ? (
          <>
            <Title>????????????????</Title>
            <Description>???????? ???? ???????????? ?????????????? ??????????????????, ???? ???????????????? ???????????????? ????????????</Description>
            <StyledProgressBar percent={audioLevel} colorful />
            <Title>??????????????</Title>
            <Description>???????? ???? ?????????????? ????????, ???? ?????????????? ????????????????</Description>
            <SpeakersCheckButton onClick={handleOnClick}>?????????????????? ??????????????</SpeakersCheckButton>
            <audio src='/speakers_test.mp3' id='SpeakersTest'>
              ?????? ?????????????? ???? ???????????????????????? ?????????????????????????????? mp3 ????????????.
            </audio>
          </>
        ) : (
          <>
            <Informer colorful backGround={"no"}>
              ?????? ?????????????? ?? ??????????????????
            </Informer>
            <StyledLink onClick={handleOnLinkClick}>?????? ?????????????????? ???????????? ?? ??????????????????</StyledLink>
          </>
        )}
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
      <Header>???????????????? ??????????</Header>
      <>
        <StyledTabs value={tab} onChange={changeTab}>
          <StyledTab value='video'>??????????</StyledTab>
          <StyledTab value='audio'>??????????</StyledTab>
        </StyledTabs>
        {tab === "audio" ? <AudioTab /> : null}
        {tab === "video" ? <VideoTab /> : null}
      </>
    </StyledDialog>
  )
}

export const CheckMediaDevices = (props: { type: "coach" | "client" }) => {
  const showModal = useEvent(changeCallModal)
  const toggle = useEvent(changeCallModal)
  const visibility = useStore($testCallModal)
  const compatibility = useStore($compatibility)

  return (
    <InfoContainer type={props.type} onClick={() => showModal(true)}>
      {!compatibility ? <NotCompatibleDialog visibility={visibility} close={() => toggle(false)} /> : <TestCallModal />}
      <CameraIcon />
      <div>?????????????????? ???????????? ?? ???????????????? ???? ?????????????? ?? {props.type === "client" ? "????????????" : "????????????????"}</div>
    </InfoContainer>
  )
}
