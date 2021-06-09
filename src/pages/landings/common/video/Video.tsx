import React, { useState } from "react"
import styled from "styled-components"

import { Container } from "../Container"

import playIcon from "./assets/play.svg"

const Wrapper = styled.section`
  background: white;
  padding: 40px 0;

  @media (min-width: 768px) {
    padding: 80px 0 60px;
  }

  @media (min-width: 1140px) {
    padding: 120px 0;
  }
`

const StyledContainer = styled(Container)`
  @media (min-width: 1140px) {
    width: 905px;
  }
`

const VideoContainer = styled.div<{ bgImage: any }>`
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  background-color: #5c5c5c;
  background: url("${props => props.bgImage}");
  background-size: cover;
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #4858cc;
  margin-bottom: 16px;
  max-width: 100%;

  @media (min-width: 558px) {
    max-width: 690px;
  }

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 44px;
    margin-bottom: 32px;
  }
`

const PlayButton = styled.i`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: block;
  width: 44px;
  height: 44px;
  background: url("${playIcon}");
  cursor: pointer;
`

type Props = {
  videoData: any
}

export const Video = ({ videoData }: Props) => {
  const [isVideoOpen, openVideo] = useState(false)

  return (
    <Wrapper>
      <StyledContainer>
        <Title>{videoData.title}</Title>
        <VideoContainer bgImage={videoData.bgImage}>
          {isVideoOpen ? (
            <iframe
              width='716'
              height='402'
              src={`https://www.youtube.com/embed/${videoData.videoId}?controls=1&autoplay=1`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <PlayButton onClick={() => openVideo(true)} />
            </>
          )}
        </VideoContainer>
      </StyledContainer>
    </Wrapper>
  )
}
