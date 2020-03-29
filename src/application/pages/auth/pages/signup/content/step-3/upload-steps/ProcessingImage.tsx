import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { MediaRange } from "@/application/lib/responsive/media"
import { uploadImage } from "@/application/pages/auth/pages/signup/content/step-3/upload-modal.model"
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
  margin: 0 auto;
  display: flex;
  justify-content: center;

  ${MediaRange.greaterThan("mobile")`
    margin: 0 20px 0 10%;
  `}
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  ${MediaRange.greaterThan("mobile")`
    align-items: flex-start;
  `}

  ${ImageContainer} {
    margin-top: 20px;
  }
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
  margin: 76px auto 0;
`

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

const cropAndUploadImage = (image: HTMLImageElement, crop: Crop, filename: string): Promise<File> => {
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

let imageRef: HTMLImageElement | null = null

const processFile = (crop: Crop, fileName: string) => async () => {
  if (!imageRef) return
  const file = await cropAndUploadImage(imageRef, crop, fileName)
  uploadImage(file)
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
  filename: string
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

export const ProcessingImage = ({ image, filename, setImage }: ProcessingImageProps) => {
  const [crop, setCrop] = useState<CropState>({ aspect: 1, unit: "%", width: 50, height: 50, x: 25, y: 25 })
  return (
    <Container>
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
          <Rotate onClick={() => imageRef && rotateImage(imageRef, -90, setImage)}>Повернуть влево</Rotate>
          <Rotate onClick={() => imageRef && rotateImage(imageRef, 90, setImage)} reverse>
            Повернуть вправо
          </Rotate>
        </div>
      </ControllersContainer>
      <UploadButton onClick={processFile(crop as any, filename)}>Загрузить фотографию</UploadButton>
    </Container>
  )
}
