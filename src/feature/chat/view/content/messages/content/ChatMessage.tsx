import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { CoachUser } from "@/lib/api/coach"
import { Client } from "@/lib/api/client/clientInfo"
import { MessageUserHeader } from "@/feature/chat/view/content/messages/content/system/MessageUserHeader"
import FilePreview from "@/feature/chat/view/content/message-box/content/file-preview.svg"
import { downloadByURL, getFileName } from "@/lib/network/get-file-by-url"
import { Icon } from "@/old-components/icon/Icon"

type ContainerTypes = {
  "data-self": boolean
}

const Time = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: rgba(66, 66, 66, 0.5);
`

export const ChatMessageContainer = styled.div<ContainerTypes>`
  padding: 5px 8px;
  background: #F4F5F7;
  border-radius: 12px 12px 12px 0px;
  max-width: 400px;
  color: #424242;
  margin-bottom: 8px;
  
  float:left;
  white-space: pre-wrap;
  word-wrap: break-word;
  
  display: block;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  
  &[data-self="true"] {
    background: ${props => props.theme.colors.primary};
    border-radius: 12px 12px 0px 12px;
    color: #ffffff;
    float: right;
    align-self: flex-end;
    ${Time} {
      color: #9aa0a6;
    }
  }

  ${MediaRange.lessThan("mobile")`
    ${Time} {
      font-size: 12px;
    }
  `}
`
const MessageText = styled.div<{doc?: boolean}>`
  font-size: 16px;
  line-height: 22px;
  max-width: ${({ doc }) => doc ? "320px" : "100%"};
  margin-left: ${({ doc }) => doc ? "8px" : "0"};
  cursor: ${({ doc }) => doc ? "pointer" : "default"};
  text-overflow: ${({ doc }) => doc ? "ellipsis" : "unset"};
  white-space: ${({ doc }) => doc ? "nowrap" : "unset"};
  overflow: ${({ doc }) => doc ? "hidden" : "unset"};
    
  ${MediaRange.lessThan("mobile")`
    max-width: 240px;
  `}
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Image = styled.img`
  width: auto;
  max-width: 100%;
  display: inline-block;
  cursor: pointer;
`

const FileIcon = styled(Icon).attrs({ name: "file-preview" })`
  fill: ${props => props.theme.colors.primary};
  background: white;  
  cursor: pointer;
  width: 40px;
  min-width: 40px;
  height: 40px;
`

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
    <ChatMessageContainer id={props.id} data-self={props["data-self"]}>
      {!!props.image && (
        <Image
          src={props.image}
          className='message-image'
          onClick={() => props.imageClick && props.imageClick(props.imageIndex)}
        />
      )}
      {!!props.document && (
        <Content onClick={() => downloadByURL(props.document,getFileName(props.document))}>
          {props["data-self"] ?
            <FileIcon />
            :
            <Image
              src={FilePreview}
              className='message-document'
            />
          }
          <MessageText doc={true}>{getFileName(props.document)}</MessageText>
        </Content>
      )}
      <MessageText>{props.text}</MessageText>
      <Time>{props.time}</Time>
    </ChatMessageContainer>
  </>
)
