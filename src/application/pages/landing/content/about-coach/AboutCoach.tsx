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
  @media screen and (max-width: 768px) {
    margin: 52px 19px 64px 44px;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    margin-left: 12px;
    margin-right: 12px;
  }
`

const MobileBr = styled.div`
  display: none;

  @media screen and (max-width: 480px) {
    display: block;
  }
`

const TextColumn = styled.div`
  flex: 1;
  max-width: 460px;
  @media screen and (max-width: 768px) {
    margin-right: 24px;
  }
  @media screen and (max-width: 480px) {
    margin-right: 0;
  }
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  color: #544274;
  @media screen and (max-width: 768px) {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
  }
`

const Subtitle = styled.h5`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  padding-top: 8px;
  color: #424242;
  margin-bottom: 32px;
  @media screen and (max-width: 768px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
  }
`

const Paragraph = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 8px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`

const VideoColumn = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;

  @media screen and (max-width: 768px) {
    align-items: flex-start;
    padding-left: 0;
  }
  @media screen and (max-width: 480px) {
    display: flex;
    justify-content: center;
  }
`

const Video = styled.iframe.attrs({
  src: `https://www.youtube.com/embed/ilu61IUs0IA`,
  frameBorder: 0,
  allow: `accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture`
})`
  width: 100%;
  height: 100%;
`

const VideoWrapper = styled.div`
  position: relative;
  width: 427px;
  height: 239px;
  &:after {
    position: absolute;
    content: "";
    z-index: -1;
    right: -20px;
    top: -20px;
    width: 100%;
    height: 100%;
    background: linear-gradient(211.29deg, #a3cff3 14.5%, rgba(255, 255, 255, 0) 85.5%), #9f8dc1;
  }
  @media screen and (max-width: 768px) {
    width: 269.38px;
    height: 148.61px;
    margin-top: 70px;
  }
  @media screen and (max-width: 480px) {
    width: 269px;
    height: 148.61px;
  }
`

const SecondParagraph = styled(Paragraph)`
  @media screen and (max-width: 480px) {
    display: none;
  }
`

export const AboutCoach = () => (
  <StyledContainer>
    <TextColumn>
      <Title>Коуч — необходимость нашего времени</Title>
      <Subtitle>Сила у тех, кто понял это раньше остальных</Subtitle>
      <Paragraph>
        <b>Коуч</b> — это наставник и тренер в одном лице.
        <MobileBr /> Он помогает человеку решить проблему, поставить жизненные задачи, найти мотивацию на успех
      </Paragraph>
      <SecondParagraph>
        Коучи комбинируют методики педагогики, клинической, спортивной и социальной психологии, чтобы подобрать подход к
        каждому клиенту. Благодаря наставничеству люди достигают личных и профессиональных целей, которые ранее считали
        недоступными.
      </SecondParagraph>
    </TextColumn>
    <VideoColumn>
      <VideoWrapper>
        <Video />
      </VideoWrapper>
    </VideoColumn>
  </StyledContainer>
)
