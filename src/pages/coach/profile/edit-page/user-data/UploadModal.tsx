import cross from "@/components/modal/cross.svg"
import { ProgressBar } from "@/components/progress-bar/ProgressBar"
import { MediaRange } from "@/lib/responsive/media"
import { $uploadPercent, uploadImageFx } from "./upload-modal.model"
import { ProcessingImage } from "./upload-steps/ProcessingImage"
import { SelectImage } from "./upload-steps/SelectImage"
import { useStore } from "effector-react"
import * as React from "react"
import { useCallback, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import styled from "styled-components"

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(66, 66, 66, 0.6);
  ${MediaRange.greaterThan("mobile")`
    padding: 44px;
  `}
`

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  ${MediaRange.greaterThan("mobile")`
    align-items: flex-start;
  `}

  ${ProgressBar} {
    margin-top: 20px;
  }
`

const Title = styled.h2<{ small: boolean }>`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  color: #424242;
  font-size: ${({ small }) => (small ? "16px" : "20px")};
  line-height: 26px;
  margin: 28px -5px 0;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
    width: 100%;
    margin-top: 0;
  `}
`

const Container = styled.div<{ fullscreen: boolean }>`
  background: #ffffff;
  border-radius: 4px;
  margin: ${({ fullscreen }) => (fullscreen ? "0" : "12px")};
  width: 100%;
  height: ${({ fullscreen }) => (fullscreen ? "100%" : "auto")};
  position: relative;
  padding: 24px;
  outline: none;

  ${({ fullscreen }) =>
    fullscreen &&
    MediaRange.lessThan("mobile")`
    padding: 12px;
    ${Content} {
      ${Title} {
        font-size: 20px;
        line-height: 24px;
        margin-top: 112px;
      }
    }
  `}

  ${MediaRange.greaterThan("mobile")`
    max-height: 460px;
    height: auto;
  `} 
  ${MediaRange.greaterThan("tablet")`    
    width: 680px;
  `}
`

const Cross = styled.img.attrs({ src: cross })`
  position: absolute;
  right: 16px;
  top: 12px;
  cursor: pointer;
  ${MediaRange.greaterThan("mobile")`
    right: 24px;
    top: 24px;
  `}
`

type UploadModalProps = {
  onClose: () => void
}

export const UploadModal = ({ onClose }: UploadModalProps) => {
  const isUploading = useStore(uploadImageFx.pending)
  const uploadPercent = useStore($uploadPercent)
  const [image, setImage] = useState<File | string | null>(null)
  const [error, setError] = useState<"large-file" | "mime-type" | null>(null)

  const onDropAccepted = useCallback(acceptedFiles => {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      setImage(reader.result as string)
    })
    reader.readAsDataURL(acceptedFiles[0])
  }, [])

  const acceptMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"]
  const maxSize = 2097152

  const onDropRejected = useCallback((files: FileRejection[]) => {
    if (files[0].file.size > maxSize) setError("large-file")
    else setError("mime-type")
  }, [])

  const { getRootProps, getInputProps, open, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    noClick: true,
    maxSize,
    accept: acceptMimeTypes,
  })

  let component = <SelectImage open={open} error={error} />

  if (image) component = <ProcessingImage image={image} setImage={setImage} />
  if (isUploading) component = <ProgressBar percent={uploadPercent} />

  return (
    <Backdrop>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        fullscreen={!!image || isUploading || !!error}
      >
        <Cross onClick={onClose} />
        <Content>
          <Title small={!image && !isUploading}>Загрузка фотографии профиля</Title>
          {component}
          <input {...getInputProps()} />
        </Content>
      </Container>
    </Backdrop>
  )
}
