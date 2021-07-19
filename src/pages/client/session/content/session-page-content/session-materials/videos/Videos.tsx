import React from "react"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

export const Videos = () => (
  <Container>
    <Video
      name='laborum excepteur ex'
      src='https://don16obqbay2c.cloudfront.net/wp-content/uploads/ru/SMM-Images-1476097720.png'
    />
    <Video
      name='laborum excepteur ex'
      src='https://don16obqbay2c.cloudfront.net/wp-content/uploads/ru/SMM-Images-1476097720.png'
    />
    <Video
      name='laborum excepteur ex'
      src='https://don16obqbay2c.cloudfront.net/wp-content/uploads/ru/SMM-Images-1476097720.png'
    />
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
`

type VideoTypes = {
  src: string
  name: string
}

const Video = (props: VideoTypes) => (
  <VideoItem>
    <Name>{props.name}</Name>
    <Preview src={props.src} />
    <Play />
  </VideoItem>
)

const VideoItem = styled.div`
  display: flex;
  position: relative;
  width: calc(33% - 4px);
  margin-right: 4px;
  margin-bottom: 4px;
  height: 145px;
  
  ${MediaRange.lessThan("mobile")`
    width: 100%;
    margin-right: 0;
    margin-bottom: 8px;
    height: 155px;
  `}
`

const Name = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding: 3px 8px;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
`

const Preview = styled.img`
  width: 100%;
  height: 100%;
`

const Play = styled(Icon).attrs({ name: "play" })`
  width: 36px;
  height: 36px;
  position: absolute;
  left: 50%;
  top: 50%;
  fill: #424242;
  cursor: pointer;
  transform: translate(-50%, -50%);
`
