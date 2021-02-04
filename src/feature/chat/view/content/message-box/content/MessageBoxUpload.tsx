import React, { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { FileRejection, useDropzone } from "react-dropzone"
import { ChatImage } from "@/feature/chat/view/content/message-box/create-message-box.module"
import SimpleBar from "simplebar-react"
import { useEvent } from "effector-react"
import { toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"

type MessageBoxUploadProps = {
  images: ChatImage[]
  add: (file: File) => void
  delete: (id: number) => void
  upload: (p: void) => void
}

export const MessageBoxUpload = (props: MessageBoxUploadProps) => {
  const addToast = useEvent(toasts.add)

  const onDropAccepted = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: File) => {
      props.add(file)
    })
  }, [])

  const onDropRejected = useCallback((files: FileRejection[]) => {
    files.forEach(error => {
      if (error.file.size > maxSize) {
        addToast({
          type: "error",
          text: `Размер файла ${error.file.name} превышает 100mb, он не будет загружен.`
        })
        return
      }
      addToast({
        type: "error",
        text: `Файл ${error.file.name} имеет неверное расширение`
      })
    })
  }, [])

  const acceptMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"]
  const maxSize = 104857600

  const { getInputProps, open } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: true,
    maxSize,
    accept: acceptMimeTypes,
  })

  const imagesRef = useRef<any>(null)

  const getScrollLeft = () => {
    return imagesRef.current.getScrollElement("x").scrollLeft
  }

  const scroll = (to: number) => {
    if (imagesRef.current?.el) {
      imagesRef.current.getScrollElement("x").scrollLeft = to
    }
  }

  const scrollHandler = (e: MouseWheelEvent) => {
    if (imagesRef.current?.el) {
      scroll(getScrollLeft() + e.deltaY)
      e.preventDefault()
    }
  }

  const scrollRight = () => {
    if (imagesRef.current?.el) {
      scroll(imagesRef.current?.el.clientWidth + getScrollLeft())
    }
  }

  const scrollLeft = () => {
    if (imagesRef.current?.el) {
      scroll(getScrollLeft() - imagesRef.current?.el.clientWidth)
    }
  }

  useEffect(() => {
    if (imagesRef.current?.el) {
      // @ts-ignore
      imagesRef.current?.el.addEventListener("mousewheel", scrollHandler)
    }
    return () => {
      if (imagesRef.current?.el) {
        // @ts-ignore
        imagesRef.current?.el.removeEventListener("mousewheel", scrollHandler)
      }
    }
  }, [props.images])

  return (
    <Container>
      <UploadIcon onClick={open} />
      <FileInput {...getInputProps()} />

      {!!props.images.length && (
        <Uploader>
          <LeftArrow onClick={scrollLeft} />
          <Images>
            <StyledSimpleBar ref={imagesRef}>
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
            </StyledSimpleBar>
          </Images>
          <RightArrow onClick={scrollRight} />
          <Send onClick={() => props.upload()} />
        </Uploader>
      )}
    </Container>
  )
}

const StyledSimpleBar = styled(SimpleBar)`
  width: 100%;
  & .simplebar-content {
    display: flex;
    align-items: center;
  }
`

const Container = styled.div``

const UploadIcon = styled(Icon).attrs({ name: "clip" })`
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
  position: absolute;
  z-index: 2;
`

const ImagesWrapper = styled.div`
  height: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const RemoveImageIcon = styled(Icon).attrs({ name: "cross" })`
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
  background: #fff;
  position: absolute;
  bottom: 0;
  &:after {
    content: "";
    display: ${props => (props.value === 0 ? "none" : "block")};
    position: absolute;
    height: 100%;
    width: ${props => props.value}%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`


const LeftArrow = styled(Icon).attrs({ name: "left-icon" })`
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
  margin-right: 13px;
  height: 14px;
`

const RightArrow = styled(Icon).attrs({ name: "right-icon" })`
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
  margin-left: 10px;
  margin-right: 13px;
  height: 14px;
`

const Send = styled(Icon).attrs({ name: "send" })`
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
  height: 17px;
  margin-right: 25px;
`
