import { DashedButton } from "@/old-components/button/dashed/DashedButton"
import { MediaRange } from "@/lib/responsive/media"
import { uploadImage, uploadOriginalAvatar } from "../upload-modal.model"
import { useEvent } from "effector-react"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import ReactCrop from "react-image-crop"
import rotate from "./rotate.svg"

const StyledReactCrop = styled(ReactCrop)`
  margin: 0 auto;
  & img {
    max-height: 200px;
    max-width: 300px;
  }
`

const ImageContainer = styled.div`
  width: 300px;
  height: 200px;
  margin: 20px auto 0;
  display: flex;
  justify-content: center;

  ${MediaRange.greaterThan("mobile")`
    margin: 0 20px 0 10%;
  `}
`

const ControllersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 8px;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 50px;
    flex-direction: row;
  `}
`

const Rotate = styled.div<{ reverse?: boolean }>`
  margin-top: 18px;
  padding-left: 28px;
  position: relative;
  font-size: 12px;
  line-height: 17px;
  height: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:before {
    content: url(${rotate});
    transform: rotateX(${({ reverse }) => (reverse ? 180 : 0)}deg) rotate(${({ reverse }) => (reverse ? 180 : 0)}deg);
    position: absolute;
    left: 0;
    margin-right: 12px;
    width: 16px;
    height: 20px;
  }
`

const UploadButton = styled(DashedButton)`
  margin: 24px auto 0;
`

function dataURItoFile(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1])

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  const ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString })
}
type Crop = { x: number; y: number; width: number; height: number }

const cropAndUploadImage = (image: HTMLImageElement, crop: Crop | null): Promise<Blob> => {
  const canvas = document.createElement("canvas")
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  if (crop === null) {
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
  }
  else {
    canvas.width = crop.width * 4
    canvas.height = crop.height * 4
  }
  const ctx = canvas.getContext("2d")

  if (crop === null) {
    ctx?.drawImage(
      image,
      0,
      0,
    )
  }
  else {
    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * 4,
      crop.height * 4
    )
  }
  return new Promise(resolve => {
    const dataUrl = canvas.toDataURL("image/jpeg")
    const blob = dataURItoFile(dataUrl)
    resolve(blob)
  })
}

let imageRef: HTMLImageElement | null = null

const processFile = (crop: Crop, uploadImage: Function, uploadOriginalAvatar: Function) => async () => {
  if (!imageRef) return
  const file = await cropAndUploadImage(imageRef, crop)
  const originalfile = await cropAndUploadImage(imageRef, null)
  uploadImage(file)
  uploadOriginalAvatar(originalfile)
}

const rotateImage = (image: HTMLImageElement, degrees: number, setImage: (file: string | null) => void) => {
  if (!image) return
  const canvas = document.createElement("canvas")
  canvas.width = image.naturalHeight
  canvas.height = image.naturalWidth

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx!.translate(canvas.width / 2, canvas.height / 2)
  ctx!.rotate((degrees / 180) * Math.PI)
  ctx!.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2)
  ctx!.rotate((degrees / 180) * -Math.PI)

  const dataUrl = canvas.toDataURL("image/jpeg")
  setImage(dataUrl)
}

type ProcessingImageProps = {
  image: File | string
  setImage: (img: string | null) => void
}

type CropState = {
  aspect?: number
  x?: number
  y?: number
  width?: number
  height?: number
  unit?: string
}

export const ProcessingImage = ({ image, setImage }: ProcessingImageProps) => {
  const [crop, setCrop] = useState<CropState>({ aspect: 1, unit: "%", height: 50, x: 25, y: 25 })
  const _uploadImage = useEvent(uploadImage)
  const _uploadOriginalAvatar = useEvent(uploadOriginalAvatar)
  return (
    <>
      <ControllersContainer>
        <ImageContainer>
          <StyledReactCrop
            src={image}
            crop={crop}
            onChange={setCrop}
            circularCrop
            onImageLoaded={(ref: HTMLImageElement) => (imageRef = ref)}
          />
        </ImageContainer>
        <div>
          <Rotate onClick={() => imageRef && rotateImage(imageRef, -90, setImage)}>?????????????????? ??????????</Rotate>
          <Rotate onClick={() => imageRef && rotateImage(imageRef, 90, setImage)} reverse>
            ?????????????????? ????????????
          </Rotate>
        </div>
      </ControllersContainer>
      <UploadButton onClick={processFile(crop as any, _uploadImage, _uploadOriginalAvatar)}>?????????????????? ????????????????????</UploadButton>
    </>
  )
}
