import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { FileRejection, useDropzone } from "react-dropzone"
import { ChatImage } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { createEvent } from "effector"

type MessageBoxUploadProps = {
  images: ChatImage[]
  add: (file: File) => void
  delete: (id: number) => void
  upload: (p: void) => void
}

export const MessageBoxUpload = (props: MessageBoxUploadProps) => {
  const onDropAccepted = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: File) => {
      props.add(file)
    })
  }, [])

  const [error, setError] = useState<"large-file" | "mime-type" | null>(null)

  const onDropRejected = useCallback((files: FileRejection[]) => {
    if (files[0].file.size > maxSize) setError("large-file")
    else setError("mime-type")
  }, [])

  const acceptMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"]
  const maxSize = 2097152

  const { getInputProps, open } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: true,
    maxSize,
    accept: acceptMimeTypes,
  })

  const imagesRef = useRef<HTMLDivElement>(null)

  const scroll = (to: number) => {
    if (imagesRef.current) {
      imagesRef.current.scrollLeft = to
    }
  }

  const scrollHandler = (e: MouseWheelEvent) => {
    if (imagesRef.current) {
      scroll(imagesRef.current.scrollLeft + e.deltaY)
      e.preventDefault()
    }
  }

  const scrollRight = () => {
    if (imagesRef.current) {
      scroll(imagesRef.current.clientWidth + imagesRef.current.scrollLeft)
    }
  }

  useEffect(() => {
    if (imagesRef.current) {
      // @ts-ignore
      imagesRef.current.addEventListener("mousewheel", scrollHandler)
    }
    return () => {
      if (imagesRef.current) {
        // @ts-ignore
        imagesRef.current.removeEventListener("mousewheel", scrollHandler)
      }
    }
  }, [props.images])

  return (
    <Container>
      <UploadIcon onClick={open} />
      <FileInput {...getInputProps()} />

      {!!props.images.length && (
        <Uploader>
          <Images ref={imagesRef}>
            <ImagesWrapper>
              {props.images.map(image => (
                <Image key={image.id} image={image.preview}>
                  <RemoveImage onClick={() => props.delete(image.id)}>
                    <RemoveImageIcon />
                  </RemoveImage>
                  {!!image.percent && <Progress value={image.percent} />}
                </Image>
              ))}
            </ImagesWrapper>
          </Images>
          <ImagesArrow onClick={scrollRight} />
          <Send onClick={() => props.upload()} />
        </Uploader>
      )}
    </Container>
  )
}

const Container = styled.div``

const UploadIcon = styled(Icon).attrs({ name: `clip` })`
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
  width: 20px;
  margin-right: 12px;
  display: flex;
  align-items: center;
`

const FileInput = styled.input`
  display: none;
`

const Uploader = styled.div`
  position: absolute;
  left: 44px;
  width: calc(100% - 44px);
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  top: 0;
  background: #dbdee0;
`

const Images = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
  flex-wrap: nowrap;
  align-items: center;
  overflow-x: auto;
`

type ImageProps = {
  image: string | null
}

const Image = styled.div<ImageProps>`
  position: relative;
  display: inline-table;
  height: 44px;
  width: 44px;
  background: #eee;
  background-image: url("${props => props.image}");
  background-size: cover;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-right: 3px;
`

const RemoveImage = styled.div`
  width: 10px;
  height: 10px;
  padding: 3px;
  background: #ffffff;
  border-radius: 10px;
  right: -5px;
  top: -5px;
  cursor: pointer;
  fill: ${props => props.theme.colors.primary};
  position: relative;
  z-index: 2;
`

const ImagesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const RemoveImageIcon = styled(Icon).attrs({ name: `cross` })`
  width: 10px;
  height: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

type ProgressProps = {
  value: number
}

const Progress = styled.div<ProgressProps>`
  width: 100%;
  height: 2px;
  position: relative;
  background: #fff;
  &:after {
    content: "";
    display: ${props => (props.value === 0 ? `none` : `block`)};
    position: absolute;
    height: 100%;
    width: ${props => props.value}%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`

const ImagesArrow = styled(Icon).attrs({ name: `right-icon` })`
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
  margin-left: 10px;
  margin-right: 13px;
  height: 14px;
`

const Send = styled(Icon).attrs({ name: `send` })`
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
  height: 17px;
  margin-right: 25px;
`
