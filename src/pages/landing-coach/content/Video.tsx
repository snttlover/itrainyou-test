import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

import playIcon from "../assets/video/play.svg"
import bgImg from "../assets/video/bg.jpg"

const Wrapper = styled.section`
  background: white;
  margin-bottom: 72px;
`

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const VideoContainer = styled.div`
  width: 716px;
  height: 402px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5c5c5c;
  background: url("${bgImg}");
  background-size: cover;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 38px;
  color: #ffffff;
  width: 379px;
  position: absolute;
  top: 20px;
  left: 30px;
`

const PlayButton = styled.i`
  display: block;
  width: 44px;
  height: 44px;
  background: url("${playIcon}");
  cursor: pointer;
`

type Props = any

type State = {
  isVideoOpen: boolean
}

export class Video extends React.Component<Props, State> {
  state: State = {
    isVideoOpen: false,
  }

  openVideo() {
    this.setState({
      isVideoOpen: true,
    })
  }

  render() {
    return (
      <Wrapper>
        <StyledContainer>
          <VideoContainer>
            {this.state.isVideoOpen ? (
              <iframe
                width='716'
                height='402'
                src='https://www.youtube.com/embed/6at5gBa4ZbI?controls=1&autoplay=1'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <Title>Кто мы такие и почему мы это делаем?</Title>
                <PlayButton onClick={() => this.openVideo()} />
              </>
            )}
          </VideoContainer>
        </StyledContainer>
      </Wrapper>
    )
  }
}
