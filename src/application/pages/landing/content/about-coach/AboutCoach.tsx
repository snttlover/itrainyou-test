import * as React from "react"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import styled from "styled-components"
// @ts-ignore
import videoPlaceholderImage from "./video-placeholder.png"

const StyledContainer = styled(LandingPageContainer)`
  margin-top: 70px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
`

const TextColumn = styled.div`
  width: 460px;
  color: #544274;
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
`

const Subtitle = styled.h5`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  padding-top: 8px;
  color: #424242;
  margin-bottom: 32px;
`

const Paragraph = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 8px;
`

const VideoColumn = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
`

const Video = styled.div`
  background-image: url("${videoPlaceholderImage}");
  width: 427px;
  height: 239px;
  position: relative;
  &:after {
    position: absolute;
    content: "";
    z-index: -1;
    right: -20px;
    top: -20px;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        211.29deg,
        #a3cff3 14.5%,
        rgba(255, 255, 255, 0) 85.5%
      ),
      #9f8dc1;
  }
`

export const AboutCoach = () => (
  <StyledContainer>
    <TextColumn>
      <Title>Коуч — необходимость нашего времени</Title>
      <Subtitle>Сила у тех, кто понял это раньше остальных</Subtitle>
      <Paragraph>
        <b>Коуч</b> — это наставник и тренер в одном лице. Он помогает человеку
        решить проблему, поставить жизненные задачи, найти мотивацию на успех
      </Paragraph>
      <Paragraph>
        Коучи комбинируют методики педагогики, клинической, спортивной и
        социальной психологии, чтобы подобрать подход к каждому клиенту.
        Благодаря наставничеству люди достигают личных и профессиональных целей,
        которые ранее считали недоступными.
      </Paragraph>
    </TextColumn>
    <VideoColumn>
      <Video />
    </VideoColumn>
  </StyledContainer>
)
