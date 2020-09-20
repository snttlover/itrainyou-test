import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { FileRejection, useDropzone } from "react-dropzone"

export const MessageBoxUpload = () => {
  const [files, setFiles] = useState<string[]>([])

  const addFile = (file: string) => {
    setFiles([...files, file])
  }

  const onDropAccepted = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        addFile(reader.result as string)
      })
      reader.readAsDataURL(file)
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

  return (
    <Container>
      <UploadIcon onClick={open} />
      <FileInput {...getInputProps()} />

      <Uploader>
        <Images>
          {files.map((image, index) => (
            <Image key={index} image={image}>
              <RemoveImage>
                <RemoveImageIcon />
              </RemoveImage>
              <Progress value={20} />
            </Image>
          ))}
        </Images>
        <Arrow />
        <Send />
      </Uploader>
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
  height: 44px;
  flex: 1;
  display: flex;
  position: relative;
`

type ImageProps = {
  image: string
}

const Image = styled.div<ImageProps>`
  position: relative;
  width: 44px;
  height: 100%;
  background: url("${props => props.image}");
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
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

const Arrow = styled.div``
const Send = styled.div``
