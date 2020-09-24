import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { ImagesLimitDialog } from "@/feature/chat/view/content/message-box/content/ImagesLimitDialog"
import { MessageBoxUpload } from "@/feature/chat/view/content/message-box/content/MessageBoxUpload"
import { createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { useStore, useEvent } from "effector-react/ssr"


type ChatMessageBoxTypes = {
  blockedText?: string | null
}

export const createChatMessageBox = ($module: ReturnType<typeof createChatMessageBoxModule>) => (props: ChatMessageBoxTypes) => {

  const value = useStore($module.data.$message)
  const change = useEvent($module.methods.changeMessage)
  const send = useEvent($module.methods.sendTextMessage)

  const input = useRef<HTMLInputElement>(null)

  const addImage = useEvent($module.methods.addFile)
  const images = useStore($module.data.$images)
  const deleteImage = useEvent($module.methods.deleteImage)
  const upload = useEvent($module.methods.upload)

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      send(value)
      change(``)
    }
  }

  useEffect(() => {
    if (input.current && window.innerWidth > 768) {
      input.current.focus()
    }
  }, [])

  return (
    <Container>
      <ImagesLimitDialog visibility={false} onChangeVisibility={() => {}} />
      <MessageBoxUpload images={images} add={addImage} delete={deleteImage} upload={upload} />

      <StyledInput
        ref={input}
        value={value}
        disabled={!!props.blockedText}
        placeholder={props.blockedText || "Напишите сообщение..."}
        onChange={e => change(e.target.value)}
        onKeyDown={keydownHandler}
      />
    </Container>
  )
}

const Container = styled.div`
  background: #dbdee0;
  border-radius: 0px 0px 2px 2px;
  padding: 12px;
  display: flex;
  align-items: center;
  position: relative;
`

const StyledInput = styled.input`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  padding: 7px 15px;
  border-radius: 18px;
  background: #fff;
  border: none;
  outline: none;
  flex: 1;

  &::placeholder {
    color: #9aa0a6;
  }

  &:disabled::placeholder {
    color: #ff6b00;
  }

  ${MediaRange.lessThan(`mobile`)`
    padding: 7px 15px;
  `}
`

