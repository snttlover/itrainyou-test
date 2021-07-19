import React from "react"
import styled from "styled-components"
import { Dialog } from "@/old-components/dialog/Dialog"
import { DashedButton } from "@/old-components/button/dashed/DashedButton"
import { Button } from "@/old-components/button/normal/Button"
import { MediaRange } from "@/lib/responsive/media"
import { ChatFile } from "@/feature/chat/view/content/message-box/create-message-box.module"
import FilePreview from "@/feature/chat/view/content/message-box/content/file-preview.svg"

type ImagesLimitDialogProps = {
  visibility: boolean
  onChangeVisibility: (val: boolean) => any
  images: ChatFile[]
  send: () => void
}

export const ImagesLimitDialog = (props: ImagesLimitDialogProps) => (
  <StyledDialog value={props.visibility} onChange={props.onChangeVisibility}>
    <Container>
      <Header>Превышен лимит отправки фотографий</Header>
      <Description>За один раз возможно отправлять только 10 фотографий. Отправить эти фотографии?</Description>
      <Images>
        {props.images.map(image => <Image
          key={image.id}
          style={{ backgroundImage: `url("${image.preview}")` }}
        />)}
      </Images>
      <Actions>
        <Cancel onClick={() => props.onChangeVisibility(false)}>Отмена</Cancel>
        <Confirm onClick={() => props.send()}>Отправить </Confirm>
      </Actions>
    </Container>
  </StyledDialog>
)

type DocumentsLimitDialogProps = {
    visibility: boolean
    onChangeVisibility: (val: boolean) => any
    documents: ChatFile[]
    send: () => void
}

export const DocumentsLimitDialog = (props: DocumentsLimitDialogProps) => (
  <StyledDialog value={props.visibility} onChange={props.onChangeVisibility}>
    <Container>
      <Header>Превышен лимит отправки файлов</Header>
      <Description>За один раз возможно отправлять только 10 файлов. Отправить эти файлы?</Description>
      <ListContainer>
        {props.documents.map((document, id) => (
          <Item key={id}>
            <FileIcon src={FilePreview} />
            <DocInfo>
              <Name>{document.file.name}</Name>
              <Size>{(document.file.size / 1048576).toFixed(2)} МБ</Size>
            </DocInfo>
          </Item>
        ))}
      </ListContainer>
      <Actions>
        <Cancel onClick={() => props.onChangeVisibility(false)}>Отмена</Cancel>
        <Confirm onClick={() => props.send()}>Отправить </Confirm>
      </Actions>
    </Container>
  </StyledDialog>
)

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 560px;

  ${MediaRange.lessThan("mobile")`
    min-width: 100%;
    min-height: 100%;
    width: auto;
    overflow: auto;
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 432px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #424242;
  margin-bottom: 16px;  
  ${MediaRange.lessThan("mobile")`
      padding-top: 40px;
  `}
`

const Description = styled.div`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #5b6670;
  margin-bottom: 24px;
`

const Images = styled.div`
  margin-top: 20px;
  height: 168px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px 8px;
  width: 100%;
  ${MediaRange.lessThan("mobile")`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    width: 250px;
    height: 350px;
  `}
`

const Image = styled.div`
  background-size: cover;
`

const Actions = styled.div`
  margin-top: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${MediaRange.lessThan("mobile")`
      margin-top: 40px;
  `}
`

const Cancel = styled(DashedButton)`
  width: 180px;
  margin-right: 16px;
  padding: 7px 24px;  
  ${MediaRange.lessThan("mobile")`
      width: 144px;
      margin-right: 8px;
  `}
`

const Confirm = styled(Button)`
  width: 180px;
  padding: 7px 24px;
  ${MediaRange.lessThan("mobile")`
      width: 144px;
  `}
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;  
`

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
    max-width: 440px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    ${MediaRange.lessThan("mobile")`
        max-width: 150px;
    `}
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
  justify-content: flex-start;  
`

const FileIcon = styled.img`
  width: 40px;
  height: 40px;
`