import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { ImagesLimitDialog, DocumentsLimitDialog } from "@/feature/chat/view/content/message-box/content/ImagesLimitDialog"
import { MessageBoxUpload } from "@/feature/chat/view/content/message-box/content/MessageBoxUpload"
import { createChatMessageBoxModule, ChatFile } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { useStore, useEvent } from "effector-react"
import { Icon } from "@/components/icon/Icon"
import FilePreview from "@/feature/chat/view/content/message-box/content/file-preview.svg"

type ChatMessageBoxTypes = {
  blockedText?: string | null
}

const DocumentList = ({ doc, del }: {doc: ChatFile, del: (id: number) => void}) => (
  <Item>
    <FileIcon src={FilePreview} />
    <DocInfo>
      <Name>{doc.file.name}</Name>
      <Size>{(doc.file.size / 1048576).toFixed(2)} МБ</Size>
    </DocInfo>
    <Close onClick={() => del(doc.id)} />
  </Item>
)

export const createChatMessageBox = ($module: ReturnType<typeof createChatMessageBoxModule>) => (
  props: ChatMessageBoxTypes
) => {
  const value = useStore($module.data.$message)
  const change = useEvent($module.methods.changeMessage)
  const send = useEvent($module.methods.sendTextMessage)

  const input = useRef<HTMLInputElement>(null)
    
  const images = useStore($module.data.$images)
  const documents = useStore($module.data.$documents)
  const deleteDocument = useEvent($module.methods.delete.deleteDocument)
  const uploadDocument = useEvent($module.methods.send.sendDocument)

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

  //<MessageBoxUpload module={$module} images={images} add={addImage} delete={deleteImage} upload={uploadImage} />
  return (
    <Container>
      <MessageContainer>

        <MessageBoxUpload module={$module} />

          {documents.length === 0 ? <InputContainer>
          <StyledInput
            ref={input}
            value={value}
            disabled={!!props.blockedText}
            placeholder={props.blockedText || "Напишите сообщение..."}
            onChange={e => change(e.target.value)}
            onKeyDown={keydownHandler}
          />
          <Send onClick={handleOnClick} />
        </InputContainer> :
                  <>
          <ListContainer>
              {documents.map((doc,i) => (<DocumentList doc={doc} del={deleteDocument} key={i} />))}
          </ListContainer>
          <Send onClick={() => uploadDocument()} />
          </>
          }

        <ImagesLimitDialog
          images={images}
          visibility={showImagesLimitDialog}
          onChangeVisibility={changeLimitImagesDialogVisibility}
          send={() => sendTenImages()}
        />
      </MessageContainer>
      {/*documents.length > 0 ?
        <MessageContainer>
          <ListContainer>
            {documents.map((doc,i) => (<DocumentList doc={doc} del={deleteDocument} key={i} />))}
          </ListContainer>
          <Send onClick={() => uploadDocument()} />
        </MessageContainer>
        : null*/}
    </Container>
  )
}

const DocInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 240px;
  margin-left: 8px;
`

const Name = styled.div`
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #5B6670;
`

const Size = styled.div`
    font-family: Roboto;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #9AA0A6;
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;  
`

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

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;  
`

const Send = styled(Icon).attrs({ name: "send" })`
  fill: #424242;;
  cursor: pointer;
  height: 17px;
  position: absolute; 
  right: 22px;
  top: 21px; 
`

const Close = styled(Icon).attrs({ name: "close" })`
  width: 32px;
  cursor: pointer;
  fill: #9AA0A6;
  margin-right: 40px;  
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
