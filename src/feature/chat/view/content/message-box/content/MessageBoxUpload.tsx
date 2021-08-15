import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"
import { FileRejection, useDropzone } from "react-dropzone"
import { ChatFile, createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"
import SimpleBar from "simplebar-react"
import { useEvent, useStore } from "effector-react"
import { toasts } from "@/old-components/layouts/behaviors/dashboards/common/toasts/toasts"
import { useClickOutside } from "@/old-components/click-outside/use-click-outside"
import { ImagesDialog } from "@/feature/chat/view/content/message-box/content/ImagesDialog"

const UploadMenu = ({
  title,
  iconName,
  add,
  visible,
  setVisibility,
}: {
  title: string
  iconName: string
  add: (file: File) => void
  visible: boolean
  setVisibility: (e: boolean) => void
}) => {
  const addToast = useEvent(toasts.add)

  const onDropAccepted = useCallback(acceptedFiles => {
    setVisibility(false)
    const heic2any = require("heic2any")
    acceptedFiles.forEach(async (file: File) => {
      if ((file.type.length === 0 || file.type === "image/heic") && title === "Фотографии") {
        const result = await heic2any({ blob: file, toType: "image/jpeg" })
        add(result)
      } else {
        add(file)
      }
    })
  }, [])

  const onDropRejected = useCallback((files: FileRejection[]) => {
    setVisibility(false)
    files.forEach(error => {
      if (error.file.size > maxSize) {
        addToast({
          type: "error",
          text: `Размер файла ${error.file.name} превышает 100mb, он не будет загружен.`,
        })
        return
      }
      addToast({
        type: "error",
        text: `Файл ${error.file.name} имеет неверное расширение`,
      })
    })
  }, [])

  const acceptMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", ".heic"]
  const maxSize = 104857600

  const options =
    title === "Фотографии"
      ? {
          onDropAccepted,
          onDropRejected,
          multiple: true,
          maxSize,
          accept: acceptMimeTypes,
        }
      : {
          onDropAccepted,
          onDropRejected,
          multiple: true,
          maxSize,
        }

  const { getInputProps, open } = useDropzone(options)

  return (
    <>
      {visible ? (
        <ItemContainer onClick={open}>
          <FileInput {...getInputProps()} />
          <MenuIcon iconName={iconName} />
          <MenuItem>{title}</MenuItem>
        </ItemContainer>
      ) : null}
    </>
  )
}

export const MessageBoxUpload = ({ module }: { module: ReturnType<typeof createChatMessageBoxModule> }) => {
  const addImage = useEvent(module.methods.add.addFile)
  const addDocument = useEvent(module.methods.add.addDocument)
  const images: ChatFile[] = useStore(module.data.$images)

  const documents = useStore(module.data.$documents)

  const [visibility, setVisibility] = useState(false)

  const menuItems = [
    { title: "Фотографии", iconName: "photos-icon", add: addImage, visible: !documents.length },
    { title: "Документы", iconName: "documents-icon", add: addDocument, visible: !images.length },
  ]

  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => {
    setVisibility(false)
  })

  return (
    <Container listEmpty={!!documents.length}>
      {visibility ? (
        <UploadMenuContainer ref={menuRef}>
          {menuItems.map((item, i) => (
            <UploadMenu {...item} key={i} setVisibility={setVisibility} />
          ))}
        </UploadMenuContainer>
      ) : null}
      <UploadIcon onClick={() => setVisibility(true)} />

      <ImagesDialog module={module} />
    </Container>
  )
}

const Container = styled.div<{ listEmpty: boolean }>`
  display: flex;
  align-self: ${({ listEmpty }) => (!listEmpty ? "center" : "flex-end")};
  margin-bottom: ${({ listEmpty }) => (!listEmpty ? "0" : "10px")};

  @media screen and (max-width: 480px) and (orientation: portrait) {
    align-self: ${({ listEmpty }) => (!listEmpty ? "center" : "flex-start")};
    margin-bottom: 0;
    margin-top: ${({ listEmpty }) => (!listEmpty ? "0" : "12px")};
  }
`

const UploadMenuContainer = styled.div`
  position: absolute;
  transform: translateY(-125%);
  z-index: 100;

  width: 149px;
  left: 10px;
  bottom: -110px;
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.14);
  border-radius: 8px;
`

const MenuItem = styled.div`
  font-size: 14px;
  line-height: 22px;
`

const UploadIcon = styled(Icon).attrs({ name: "clip" })`
  fill: #5b6670;
  cursor: pointer;
  width: 20px;
  margin-right: 18px;
  display: flex;
  align-items: center;
`

const FileInput = styled.input`
  display: none;
`

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  width: 137px;
  height: 48px;
  cursor: pointer;
`

const MenuIcon = styled(Icon).attrs((props: any) => ({
  name: props.iconName,
  ...props,
}))`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`
