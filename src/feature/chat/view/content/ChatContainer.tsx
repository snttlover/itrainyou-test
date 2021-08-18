import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { useStore } from "effector-react"
import { $showDetailsOnMobile } from "@/feature/chat/modules/chat-details"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;

  ${MediaRange.lessThan("mobile")`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;

    &[data-show-details-on-modile="true"] {
      display: none;
    }
  `}
`

type ChatContainerTypes = {
  className?: string
  children: React.ReactChild | React.ReactChild[] | any[]
}

export const ChatContainer = (props: ChatContainerTypes) => {
  const detailsVisibility = useStore($showDetailsOnMobile)
  return (
    <Container data-show-details-on-modile={detailsVisibility} className={props.className}>
      {props.children}
    </Container>
  )
}
