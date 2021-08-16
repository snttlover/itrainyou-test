import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { MessageBoxUpload } from "@/feature/chat/view/content/message-box/content/MessageBoxUpload"
import { createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { useEvent, useStore } from "effector-react"
import { Icon } from "@/old-components/icon/Icon"
import { ChatContentContainer } from "@/feature/chat/view/content/messages/content/ChatContentContainer"

type ChatMessageBoxTypes = {
  blockedText?: string | null
}

export const createChatMessageBox = ($module: ReturnType<typeof createChatMessageBoxModule>) => (
  props: ChatMessageBoxTypes
) => {
  const value = useStore($module.data.$message)
  const change = useEvent($module.methods.changeMessage)
  const send = useEvent($module.methods.sendTextMessage)

  const input = useRef<HTMLTextAreaElement>(null)

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      send(value)
      change("")
    }
  }

  const handleOnClick = () => {
    send(value)
    change("")
  }

  useEffect(() => {
    if (input.current && window.innerWidth > 768) {
      input.current.focus()
    }
  }, [])

  useEffect(() => {
    const textareaRef = input.current
    if (textareaRef) {
      textareaRef.style.height = "auto"
      textareaRef.style.height = `${textareaRef.scrollHeight - 22}px`
      textareaRef.style.height = `${textareaRef.scrollHeight}px`
    }
  }, [value])

  return (
    <Container>
      <ChatContentContainer>
        <MessageContainer>
          {props.blockedText && <BlockedText>{props.blockedText}</BlockedText>}
          {!props.blockedText && (
            <>
              <MessageBoxUpload module={$module} />
              <InputContainer>
                <StyledInput
                  ref={input}
                  value={value}
                  disabled={!!props.blockedText}
                  placeholder={props.blockedText || "Напишите сообщение..."}
                  onChange={e => change(e.target.value)}
                  onKeyDown={keydownHandler}
                />
                <Send onClick={handleOnClick} />
              </InputContainer>
            </>
          )}
        </MessageContainer>
      </ChatContentContainer>
    </Container>
  )
}

const BlockedText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #ff6b00;
  background: #fff;
  height: 48px;
`

export const DocInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 240px;
  margin-left: 8px;
`

const MessageContainer = styled.div`
  background: #fff;
  padding: 8px 0;
  display: flex;
  align-items: center;
  position: relative;
`

const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Send = styled(Icon).attrs({ name: "send" })`
  fill: #5b6670;
  cursor: pointer;
  height: 20px;
  margin-left: 18px;
`

export const Close = styled(Icon).attrs({ name: "close" })`
  width: 32px;
  cursor: pointer;
  fill: #9aa0a6;
  margin-right: 40px;

  ${MediaRange.lessThan("mobile")`
    margin-right: 0;
  `}
`

const InputContainer = styled.div`
  width: 100%;
  border-radius: 18px;
  background: #fff;
  display: flex;
  align-items: center;
`

const StyledInput = styled.textarea`
  color: #424242;
  padding: 5px 16px;
  border: none;
  outline: none;
  flex: 1;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
  width: calc(100% - 40px);
  max-height: 7em;
  block-size: 22px;
  resize: none;

  font-size: 14px;
  line-height: 22px;

  background: #f4f5f7;
  border-radius: 16px;
  &::placeholder {
    color: #9aa0a6;
  }

  &:disabled::placeholder {
    color: #ff6b00;
  }
`
