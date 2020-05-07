import cross from "@/application/components/modal/cross.svg"
import { ProgressBar } from "@/application/components/progress-bar/ProgressBar"
import { MediaRange } from "@/application/lib/responsive/media"
import { $uploadPercent, uploadImageFx } from "@/application/pages/auth/pages/signup/content/step-3/upload-modal.model"
import { ProcessingImage } from "@/application/pages/auth/pages/signup/content/step-3/upload-steps/ProcessingImage"
import { SelectImage } from "@/application/pages/auth/pages/signup/content/step-3/upload-steps/SelectImage"
import { useStore } from "effector-react"
import * as React from "react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
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

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  color: #424242;
  font-size: 16px;
  line-height: 22px;
  margin: 28px -5px 0;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
    margin-top: 0;
    text-align: left;
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
  const [largeFileError, setError] = useState(false)

  const onDropAccepted = useCallback(acceptedFiles => {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      setImage(reader.result as string)
    })
    reader.readAsDataURL(acceptedFiles[0])
  }, [])

  const onDropRejected = useCallback(_ => setError(true), [])

  const { getRootProps, getInputProps, open, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    noClick: true,
    maxSize: 2097152,
    accept: "image/*"
  })

  let component = <SelectImage open={open} largeFileError={largeFileError} />

  if (image) component = <ProcessingImage image={image} setImage={setImage} />
  if (isUploading) component = <ProgressBar percent={uploadPercent} />

  return (
    <Backdrop>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        fullscreen={!!image || isUploading || largeFileError}
      >
        <Cross onClick={onClose} />
        <Content>
          <Title>Загрузка фотографии профиля</Title>
          {component}
          <input {...getInputProps()} />
        </Content>
      </Container>
    </Backdrop>
  )
}
