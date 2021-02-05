import React from "react"
import styled from "styled-components"
import {MediaRange} from "@/lib/responsive/media"

const Container = styled.div`
  max-width: 560px;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  
  ${MediaRange.lessThan("mobile")`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
  `}
`

type ChatContainerTypes = {
  className?: string
  children: React.ReactChild | React.ReactChild[] | any[]
}

export const ChatContainer = (props: ChatContainerTypes) => <Container className={props.className}>{props.children}</Container>
