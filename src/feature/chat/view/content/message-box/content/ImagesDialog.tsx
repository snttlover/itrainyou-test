import React from "react"
import styled from "styled-components"
import { Dialog } from "@/new-components/dialog/Dialog"
import { createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { useEvent, useStore } from "effector-react"
import { Icon } from "@/old-components/icon/Icon"
import { Button } from "@/new-components/button/Button"
import { Warning } from "@/feature/chat/view/content/message-box/content/Warning"
import { FullContentProgress } from "@/feature/chat/view/content/message-box/content/FullContentProgress"
import { MediaRange } from "@/lib/responsive/media"

type ImagesDialogProps = {
  module: ReturnType<typeof createChatMessageBoxModule>
}

export const ImagesDialog = ({ module }: ImagesDialogProps) => {
  const images = useStore(module.data.$images)
  const deleteImage = useEvent(module.methods.delete.deleteImage)
  const deleteImages = useEvent(module.methods.delete.deleteImages)
  const uploadImage = useEvent(module.methods.send.sendImage)
  const maxLength = images.length > 10

  return (
    <StyledImagesDialog fullscreenOnMobile value={!!images.length} onChange={state => !state && deleteImages()}>
      <Title>Отправка фото</Title>
      {maxLength && (
        <StyledWarning>За один раз можно отправлять только 10 фотографий. Удалите лишние изображения.</StyledWarning>
      )}
      <Images>
        {images.map(image => (
          <ImageWrapper key={image.id}>
            <Image src={`${image.preview}`} />
            {!image.percent && (
              <RemoveImage onClick={() => deleteImage(image.id)}>
                <RemoveImageIcon />
              </RemoveImage>
            )}
            {!!image.percent && <FullContentProgress value={image.percent} />}
          </ImageWrapper>
        ))}
      </Images>
      <Actions>
        <Send disabled={maxLength} onClick={() => uploadImage()}>
          Отправить
        </Send>
      </Actions>
    </StyledImagesDialog>
  )
}

const StyledWarning = styled(Warning)`
  margin-top: 24px;
`

const StyledImagesDialog = styled(Dialog)`
  max-height: 80%;
  display: flex;
  flex-direction: column;
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

const Images = styled.div`
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

const ImageWrapper = styled.div`
  position: relative;
  display: inline-table;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
  overflow: hidden;
  width: auto;
  height: auto;
  border-radius: 8px;
`

const Image = styled.img`
  width: 100%;
  background: #eee;
`

const RemoveImage = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 10px;
  right: 10px;
  top: 10px;
  cursor: pointer;
  fill: ${props => props.theme.colors.primary};
  position: absolute;
  z-index: 2;
`

const RemoveImageIcon = styled(Icon).attrs({ name: "cross" })`
  width: 15px;
  height: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Send = styled(Button)`
  ${MediaRange.lessThan("mobile")`
    flex: 1;
  `}
`
