import React from "react"
import styled from "styled-components"
import {MediaRange} from "@/lib/responsive/media"

const Container = styled.div`
  width: 100%;
  max-width: 560px;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  ${MediaRange.lessThan("mobile")`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  `}
`

type ChatContainerTypes = {
  children: React.ReactChild | React.ReactChild[]
}

export const ChatContainer = (props: ChatContainerTypes) => <Container>{props.children}</Container>
