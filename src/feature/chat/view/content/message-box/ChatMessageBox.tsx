import React, { useEffect, useRef, useState } from "react"
import styled, {ThemeProps} from "styled-components"
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
    <Item>
      <FileIcon src={FilePreview} />
      <DocInfo>
        <Name>{doc.file.name}</Name>
        <Size>{(doc.file.size / 1048576).toFixed(2)} МБ</Size>
      </DocInfo>
    </Item>
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
  const changeLimitDocumentsDialogVisibility = useEvent($module.methods.changeLimitDialogVisibility.changeLimitDocumentsDialogVisibility)

  const sendTenImages = useEvent($module.methods.sendTen.sendTenImages)
  const sendTenDocuments = useEvent($module.methods.sendTen.sendTenDocuments)

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
            <SendDocument listEmpty={!!documents.length} onClick={() => uploadDocument()} />
          </>
        }

        <ImagesLimitDialog
          images={images}
          visibility={showImagesLimitDialog}
          onChangeVisibility={changeLimitImagesDialogVisibility}
          send={() => sendTenImages()}
        />

        <DocumentsLimitDialog
          visibility={showDocumentsLimitDialog}
          onChangeVisibility={changeLimitDocumentsDialogVisibility}
          documents={documents.slice(0,10)}
          send={() => sendTenDocuments()}
        />
      </MessageContainer>
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
  align-items: center;
`

const MessageContainer = styled.div`
  background: #e1e6ea;
  border-radius: 0px 0px 2px 2px;
  padding: 12px;
  display: flex;
  align-items: center;
  position: relative;
`

const Container = styled.div`
  background: #e1e6ea;
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
  fill: #5B6670;
  cursor: pointer;
  height: 17px;
  position: absolute; 
  right: 22px;
  top: 21px; 
`

const SendDocument = styled(Icon).attrs((props: any) => ({
  name: "send",
  ...props
}))<{listEmpty: boolean}>`
  fill: #5B6670;
  cursor: pointer;
  height: 17px;
  align-self: flex-end;
  margin-bottom: ${({ listEmpty }) => !listEmpty ? "0" : "13px"};

  @media screen and (max-width: 480px) and (orientation : portrait) {
    align-self: ${({ listEmpty }) => !listEmpty ? "center" : "flex-start"};
    margin-bottom: 0;
    margin-top: ${({ listEmpty }) => !listEmpty ? "0" : "24px"};
  }
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
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;  
  width: 100%;
  height: auto;  

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
