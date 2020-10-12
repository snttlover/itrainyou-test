import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { CoachUser } from "@/lib/api/coach"
import { Client } from "@/lib/api/client/clientInfo"
import { MessageUserHeader } from "@/feature/chat/view/content/messages/content/system/MessageUserHeader"

type ContainerTypes = {
  "data-self": boolean
}

const Time = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: rgba(66, 66, 66, 0.5);
`

const Container = styled.div<ContainerTypes>`
  padding: 5px 8px;

  background: #eceff1;
  border-radius: 12px 12px 12px 0px;
  width: auto;
  max-width: 472px;
  color: #424242;
  margin-bottom: 8px;

  font-size: 16px;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;

  &[data-self="true"] {
    background: ${props => props.theme.colors.primary};
    border-radius: 12px 12px 0px 12px;
    color: #ffffff;
    align-self: flex-end;
    ${Time} {
      color: #9aa0a6;
    }
  }

  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 22px;
    ${Time} {
      font-size: 12px;
    }
  `}
`

const Image = styled.img`
  width: auto;
  max-width: 100%;
  display: inline-block;
  cursor: pointer;
`

type ChatMessageTypes = {
  id: string
  time: string
  text: string
  image: string
  showUser?: boolean
  user: CoachUser | Client | null
  imageClick?: (index: number) => void
  imageIndex: number
} & ContainerTypes

export const ChatMessage = (props: ChatMessageTypes) => (
  <>
    {props.showUser && (
      <MessageUserHeader
        right={props["data-self"]}
        hideDate={true}
        showUser={true}
        name={`${props.user?.firstName} ${props.user?.lastName}`}
        avatar={props.user?.avatar || null}
      />
    )}
    <Container id={props.id} data-self={props["data-self"]}>
      {!!props.image && (
        <Image
          src={props.image}
          className='message-image'
          onClick={() => props.imageClick && props.imageClick(props.imageIndex)}
        />
      )}
      {props.text}
      <Time>{props.time}</Time>
    </Container>
  </>
)
