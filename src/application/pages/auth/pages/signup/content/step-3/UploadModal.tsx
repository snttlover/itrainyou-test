import { DashedButton } from "@app/components/button/dashed/DashedButton"
import { Button } from "@app/components/button/normal/Button"
import { Modal } from "@app/components/modal/Modal"
import { ProgressBar } from "@app/components/progress-bar/ProgressBar"
import { MediaRange } from "@app/lib/responsive/media"
import {
  $uploadPercent,
  uploadImage,
  uploadImageFx
} from "@app/pages/auth/pages/signup/content/step-3/upload-modal.model"
import { useStore } from "effector-react"
import * as React from "react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import styled from "styled-components"

const StyledReactCrop = styled(ReactCrop)``

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

  ${StyledReactCrop} {
    margin-top: 20px;
  }
`

const Title = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-top: 28px;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
    margin-top: 0;
    text-align: left;
  `}
`

const Description = styled.p`
  font-size: 14px;
  line-height: 18px;

  text-align: center;

  color: #424242;
  margin-top: 12px;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 63px;
    font-size: 16px;
    line-height: 22px;
    width: 100%;
    text-align: center;
  `}
`

const Warning = styled.p`
  font-size: 12px;
  line-height: 16px;
  width: 100%;
  text-align: center;
  color: #d5584d;
  margin-top: 12px;
`

const SelectPhotoButton = styled(Button)`
  margin-top: 56px;
  margin-left: auto;
  margin-right: auto;

  ${MediaRange.greaterThan("mobile")`    
    margin-top: 30px;
  `}
`

const DragText = styled.div`
  width: 100%;
  display: none;
  text-align: center;
  margin-top: 24px;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 60px;

  ${MediaRange.greaterThan("mobile")`    
    display: block;
  `}
`

const BlueText = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #449bd9;
`
const UploadButton = styled(DashedButton)`
  margin-top: 76px;
`

type UploadModalProps = {
  onClose: () => void
}

function dataURItoFile(dataURI: string, filename: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1])

  // separate out the mime component
  const mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  const ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  return new File([ab], filename, { type: mimeString })
}
type Crop = { x: number; y: number; width: number; height: number }

const cropAndUploadImage = (image: any, crop: Crop, filename: string): Promise<File> => {
  const canvas = document.createElement("canvas")
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext("2d")

  ctx?.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  )

  return new Promise(resolve => {
    const dataUrl = canvas.toDataURL("image/jpeg")
    const blob = dataURItoFile(dataUrl, filename)
    resolve(blob)
  })
}

let imageRef: any = null

const processFile = (crop: Crop, fileName: string) => async () => {
  const file = await cropAndUploadImage(imageRef, crop, fileName)
  uploadImage(file)
}

export const UploadModal = ({ onClose }: UploadModalProps) => {
  const isUploading = useStore(uploadImageFx.pending)
  const uploadPercent = useStore($uploadPercent)
  const [image, setImage] = useState<string | null>(null)
  const [filename, setFilename] = useState<string>('')
  const [crop, setCrop] = useState({ aspect: 1 })

  const onDropAccepted = useCallback(acceptedFiles => {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      setImage(reader.result as string)
      setFilename(acceptedFiles[0].name)
    })
    reader.readAsDataURL(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, open, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDropAccepted,
    multiple: false,
    noClick: true,
    maxSize: 2097152,
    accept: ["image/gif", "image/png", "image/jpg", "image/jpeg"]
  })

  let component = (
    <>
      <Description>Вы можете загрузить фотографию в формате PNG, JPG или GIF</Description>
      <Warning>*Максимальный размер 2 Мбайта</Warning>
      <SelectPhotoButton onClick={open}>Выберите фотографию</SelectPhotoButton>
      <DragText>
        или <br />
        <BlueText>Перетащите ее на экран</BlueText>
      </DragText>
    </>
  )

  if (image)
    component = (
      <>
        <StyledReactCrop src={image} crop={crop} onChange={setCrop} onImageLoaded={(ref: any) => (imageRef = ref)} />
        <UploadButton onClick={processFile(crop as any, filename)}>Загрузить фотографию</UploadButton>
      </>
    )
  if (isUploading) component = <ProgressBar percent={uploadPercent} />

  return (
    <Modal onCrossClick={onClose} {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <Content>
        <Title>Загрузка фотографии профиля</Title>
        {component}
        <input {...getInputProps()} />
      </Content>
    </Modal>
  )
}
