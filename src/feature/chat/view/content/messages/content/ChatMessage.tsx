import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { CoachUser } from "@/lib/api/coach"
import { Client } from "@/lib/api/client/clientInfo"
import { MessageUserHeader } from "@/feature/chat/view/content/messages/content/system/MessageUserHeader"
import FilePreview from "@/feature/chat/view/content/message-box/content/file-preview.svg"
import { downloadByURL, getFileName } from "@/lib/network/get-file-by-url"
import { Icon } from "@/old-components/icon/Icon"

type ChatMessageTypes = {
  id: string
  time: string
  text: string
  image: string
  document: string
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
    <ChatMessageContainer
      id={props.id}
      data-self={props["data-self"]}
      data-image={!!props.image}
      data-document={!!props.document}
    >
      {!!props.image && (
        <Image
          src={props.image}
          className='message-image'
          onClick={() => props.imageClick && props.imageClick(props.imageIndex)}
        />
      )}
      {!!props.document && (
        <Content onClick={() => downloadByURL(props.document, getFileName(props.document))}>
          <FileIconWrapper>
            <FileIcon />
          </FileIconWrapper>
          <MessageText doc={true}>{getFileName(props.document)}</MessageText>
        </Content>
      )}
      <MessageText>{props.text}</MessageText>
      <Time>{props.time}</Time>
      {props["data-self"] ? <RightMessageTail /> : <LeftMessageTail />}
    </ChatMessageContainer>
  </>
)

type ContainerTypes = {
  "data-self": boolean
}

const Time = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #9aa0a6;
  margin-left: 15px;
`

const RightMessageTail = styled(Icon).attrs({ name: "right-message-tail" })`
  fill: ${props => props.theme.colors.primary};
  position: absolute;
  right: -8px;
  width: 8px;
  bottom: 0px;
  height: 15px;
`

const LeftMessageTail = styled(Icon).attrs({ name: "left-message-tail" })`
  fill: #fff;
  position: absolute;
  left: -8px;
  width: 8px;
  bottom: 0px;
  height: 15px;
`

const Image = styled.img`
  width: auto;
  max-width: 100%;
  display: inline-block;
  cursor: pointer;
`

export const ChatMessageContainer = styled.div<ContainerTypes>`
  padding: 5px 8px;
  background: #fff;
  border-radius: 12px 12px 12px 0px;
  font-weight: 300;

  &[data-document="true"] {
    padding: 8px;
  }

  ${Image} {
    border-radius: 12px 12px 12px 0px;
  }

  font-size: 14px;
  line-height: 22px;
  color: #424242;
  max-width: 400px;

  float: left;
  white-space: pre-wrap;
  word-wrap: break-word;

  display: flex;
  align-items: flex-end;
  position: relative;

  &[data-self="true"] {
    background: ${props => props.theme.colors.primary};
    border-radius: 16px 16px 0px 16px;
    color: #ffffff;
    float: right;
    align-self: flex-end;

    ${Image} {
      border-radius: 16px 16px 0px 16px;
    }
    ${Time} {
      color: #dfd0e7;
    }
  }

  &[data-image="true"] {
    padding: 0;
    ${Time} {
      position: absolute;
      right: 8px;
      bottom: 8px;
      padding: 4px 8px;
      color: #ffffff !important;
      background: rgba(66, 66, 66, 0.8);
      border-radius: 16px;
      margin-left: 0;
    }
  }

  ${MediaRange.lessThan("mobile")`
    ${Time} {
      font-size: 12px;
    }
  `}
`
const MessageText = styled.div<{ doc?: boolean }>`
  font-size: 16px;
  line-height: 22px;
  max-width: ${({ doc }) => (doc ? "320px" : "100%")};
  margin-left: ${({ doc }) => (doc ? "8px" : "0")};
  cursor: ${({ doc }) => (doc ? "pointer" : "default")};
  text-overflow: ${({ doc }) => (doc ? "ellipsis" : "unset")};
  white-space: ${({ doc }) => (doc ? "nowrap" : "unset")};
  overflow: ${({ doc }) => (doc ? "hidden" : "unset")};

  ${MediaRange.lessThan("mobile")`
    max-width: 240px;
  `}
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 88%;
`

const FileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f4f5f7;
  border-radius: 8px;
`

const FileIcon = styled(Icon).attrs({ name: "file" })`
  stroke: ${props => props.theme.colors.primary};
`
