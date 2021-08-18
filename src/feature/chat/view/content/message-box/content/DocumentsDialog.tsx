import React from "react"
import styled from "styled-components"
import { Dialog } from "@/new-components/dialog/Dialog"
import { ChatFile, createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { useEvent, useStore } from "effector-react"
import { Icon } from "@/old-components/icon/Icon"
import { Button } from "@/new-components/button/Button"
import { Warning } from "@/feature/chat/view/content/message-box/content/Warning"
import { MediaRange } from "@/lib/responsive/media"

type DocumentsDialogProps = {
  module: ReturnType<typeof createChatMessageBoxModule>
}

export const DocumentsDialog = ({ module }: DocumentsDialogProps) => {
  const documents = useStore(module.data.$documents)
  const deleteDocument = useEvent(module.methods.delete.deleteDocument)
  const deleteDocuments = useEvent(module.methods.delete.deleteDocuments)
  const uploadDocument = useEvent(module.methods.send.sendDocument)
  const maxLength = documents.length > 10

  return (
    <StyledDocumentsDialog
      fullscreenOnMobile
      value={!!documents.length}
      onChange={state => !state && deleteDocuments()}
    >
      <Title>Отправка файлов</Title>
      {maxLength && (
        <StyledWarning>За один раз можно отправлять только 10 документов. Удалите лишние документы.</StyledWarning>
      )}
      <Documents>
        {documents.map((doc, i) => (
          <DocumentItem doc={doc} del={deleteDocument} key={i} />
        ))}
      </Documents>
      <Actions>
        <Send disabled={maxLength} onClick={() => uploadDocument()}>
          Отправить
        </Send>
      </Actions>
    </StyledDocumentsDialog>
  )
}

const DocumentItem = ({ doc, del }: { doc: ChatFile; del: (id: number) => void }) => (
  <FileItem>
    <Item>
      <FileIconWrapper>
        <FileIcon />
      </FileIconWrapper>
      <DocInfo>
        <Name>{doc.file.name}</Name>
        <Size>{(doc.file.size / 1048576).toFixed(2)} МБ</Size>
        {!!doc.percent && <Progress value={doc.percent} />}
      </DocInfo>
    </Item>
    <Close data-hidden={!!doc.percent} onClick={() => del(doc.id)} />
  </FileItem>
)

type ProgressProps = {
  value: number
}

const Progress = styled.div<ProgressProps>`
  flex-basis: 100px;
  width: 100px;
  height: 5px;
  background: #f6f6f6;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 5px;
  &:after {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 1;
    content: "";
    background: ${props => props.theme.colors.primary};
    width: ${props => props.value}px;
    transition: width 300ms;
  }
`

export const Close = styled(Icon).attrs({ name: "close" })`
  width: 32px;
  cursor: pointer;
  fill: #9aa0a6;
  opacity: 0.2;
  &[data-hidden="true"] {
    visibility: hidden;
  }
`

const DocInfo = styled.div`
  margin-left: 8px;
`

const Name = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 1px;
  width: 100%;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Size = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: #9aa0a6;
`

const FileItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  &:hover {
    ${Close} {
      opacity: 1;
    }
  }
`

const Item = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const StyledWarning = styled(Warning)`
  margin-top: 24px;
`

const StyledDocumentsDialog = styled(Dialog)`
  max-height: 80%;
  display: flex;
  flex-direction: column;
  max-width: 416px;
  width: 100%;
`

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #424242;
`

const Documents = styled.div`
  display: block;
  position: relative;
  overflow: auto;
  margin-top: 24px;
  margin-bottom: 24px;
  flex: 1;
  width: calc(100% + 48px);
  margin-left: -24px;
  padding: 0 24px;
`

const Send = styled(Button)`
  ${MediaRange.lessThan("mobile")`
    flex: 1;
  `}
`

const FileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f4f5f7;
  border-radius: 8px;
  margin-right: 8px;
`

const FileIcon = styled(Icon).attrs({ name: "file" })`
  stroke: ${props => props.theme.colors.primary};
`
