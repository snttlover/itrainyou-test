import { DashedButton } from "@app/components/button/dashed/DashedButton"
import { MediaRange } from "@app/lib/responsive/media"
import { uploadImage } from "@app/pages/auth/pages/signup/content/step-3/upload-modal.model"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

const StyledReactCrop = styled(ReactCrop)``

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

  ${StyledReactCrop} {
    margin-top: 20px;
  }
`

const ControllersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const UploadButton = styled(DashedButton)`
  margin-top: 76px;
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
  const ctx = canvas.getContext("2d")

  ctx!.translate(canvas.width / 2, canvas.height / 2)
  ctx!.rotate(Math.PI / 2)
  ctx!.drawImage(image, -image.width / 2, -image.height / 2)
  ctx!.rotate(-Math.PI / 2)
  ctx!.translate(-canvas.width / 2, -canvas.height / 2)
  ctx!.fillRect(0, 0, 25, 10)

  const dataUrl = canvas.toDataURL("image/jpeg")
  setImage(null)
  setImmediate(() => setImage(dataUrl))
}

type ProcessingImageProps = {
  image: File | string
  filename: string
  setImage: (img: string | null) => void
}

export const ProcessingImage = ({ image, filename, setImage }: ProcessingImageProps) => {
  const [crop, setCrop] = useState({ aspect: 1 })
  //const [degrees, setDegrees] = useState(0)
  return (
    <Container>
      <ControllersContainer>
        <StyledReactCrop
          src={image}
          crop={crop}
          onChange={setCrop}
          onImageLoaded={(ref: HTMLImageElement) => (imageRef = ref)}
          /*imageStyle={{ transform: `rotate(${degrees}deg)` }}*/
        />
        {/*<div onClick={() => setDegrees(degrees + 90)}>Повернуть влево</div>
        <div onClick={() => setDegrees(degrees - 90)}>Повернуть вправо</div>*/}
      </ControllersContainer>
      <UploadButton onClick={processFile(crop as any, filename)}>Загрузить фотографию</UploadButton>
    </Container>
  )
}
