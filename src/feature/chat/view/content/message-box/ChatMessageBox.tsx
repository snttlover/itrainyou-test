import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { ImagesLimitDialog, DocumentsLimitDialog } from "@/feature/chat/view/content/message-box/content/ImagesLimitDialog"
import { MessageBoxUpload } from "@/feature/chat/view/content/message-box/content/MessageBoxUpload"
import { createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { useStore, useEvent } from "effector-react"
import { Icon } from "@/components/icon/Icon"
import FilePreview from "@/feature/chat/view/content/message-box/content/file-preview.svg"

type ChatMessageBoxTypes = {
  blockedText?: string | null
}

export const createChatMessageBox = ($module: ReturnType<typeof createChatMessageBoxModule>) => (
  props: ChatMessageBoxTypes
) => {
  const value = useStore($module.data.$message)
  const change = useEvent($module.methods.changeMessage)
  const send = useEvent($module.methods.sendTextMessage)

  const input = useRef<HTMLInputElement>(null)

  const addImage = useEvent($module.methods.add.addFile)
  const images = useStore($module.data.$images)
    const documents = useStore($module.data.$documents)
  const deleteImage = useEvent($module.methods.delete.deleteImage)
  const uploadImage = useEvent($module.methods.send.sendImage)
    const uploadDocument = useEvent($module.methods.send.sendImage)

  const showImagesLimitDialog = useStore($module.data.$limitDialogVisibility.$limitImagesDialogVisibility)
    const showDocumentsLimitDialog = useStore($module.data.$limitDialogVisibility.$limitDocumentsDialogVisibility)
  const changeLimitImagesDialogVisibility = useEvent($module.methods.changeLimitDialogVisibility.changeLimitImagesDialogVisibility)
  const sendTenImages = useEvent($module.methods.sendTen.sendTenImages)

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

  return (
    <Container>
      <MessageContainer>

        <MessageBoxUpload module={$module} images={images} add={addImage} delete={deleteImage} upload={uploadImage} />

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

        <ImagesLimitDialog
          images={images}
          visibility={showImagesLimitDialog}
          onChangeVisibility={changeLimitImagesDialogVisibility}
          send={() => sendTenImages()}
        />
      </MessageContainer>
        {documents ? <MessageContainer>

          <InputContainer>
            <FileIcon src={FilePreview} />
          <Send onClick={handleOnClick} />
        </InputContainer>

      </MessageContainer> : null}
    </Container>
  )
}

const MessageContainer = styled.div`
  background: #dbdee0;
  border-radius: 0px 0px 2px 2px;
  padding: 12px;
  display: flex;
  align-items: center;
  position: relative;
`

const Container = styled.div`
  background: #dbdee0;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Send = styled(Icon).attrs({ name: "send" })`
  fill: #424242;;
  cursor: pointer;
  height: 17px;
  position: absolute; 
  right: 22px;
  top: 21px; 
`

const FileIcon = styled.img`
  width: 40px;
  height: 40px;
`

const InputContainer = styled.div`
  width: 100%; 
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
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;  

  &::placeholder {
    color: #9aa0a6;
  }

  &:disabled::placeholder {
    color: #ff6b00;
  }

  ${MediaRange.lessThan("mobile")`
    padding: 7px 15px;
  `}
`
