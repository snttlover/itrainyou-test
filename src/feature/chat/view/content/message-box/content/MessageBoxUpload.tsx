import React, {useCallback, useEffect, useRef, useState} from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { FileRejection, useDropzone } from "react-dropzone"
import {ChatFile, createChatMessageBoxModule} from "@/feature/chat/view/content/message-box/create-message-box.module"
import SimpleBar from "simplebar-react"
import {useEvent, useStore} from "effector-react"
import { toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import {useClickOutside} from "@/components/click-outside/use-click-outside"

const UploadMenu = ({title, iconName, add, visible, setVisibility}: {
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
        const result = await heic2any({blob: file, toType: "image/jpeg"})
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
    
  const acceptMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif",".heic"]
  const maxSize = 104857600
    
  const options = title === "Фотографии" ? ({
    onDropAccepted,
    onDropRejected,
    multiple: true,
    maxSize,
    accept: acceptMimeTypes,
  }) : ({
    onDropAccepted,
    onDropRejected,
    multiple: true,
    maxSize,
  })

  const { getInputProps, open } = useDropzone(options)


  return (
    <>
      {visible ?
        <ItemContainer onClick={open}>
          <FileInput {...getInputProps()} />
          <MenuIcon iconName={iconName}/>
          <MenuItem>{title}</MenuItem>
        </ItemContainer> : null}
    </>
  )

}

export const MessageBoxUpload = ({module}: {module: ReturnType<typeof createChatMessageBoxModule>}) => {

  const addImage = useEvent(module.methods.add.addFile)
  const addDocument = useEvent(module.methods.add.addDocument)
  const images: ChatFile[] = useStore(module.data.$images)
  const deleteImage = useEvent(module.methods.delete.deleteImage)
  const uploadImage = useEvent(module.methods.send.sendImage)

  const documents = useStore(module.data.$documents)

  const [visibility, setVisibility] = useState(false)
    
  const menuItems = [
    {title: "Фотографии", iconName: "photos-icon", add: addImage, visible: !documents.length},
    {title: "Документы", iconName: "documents-icon", add: addDocument, visible: !images.length},
  ]

  const imagesRef = useRef<any>(null)

  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => {
    setVisibility(false)
  })

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
  }, [images])

  return (
    <Container listEmpty={!!documents.length}>
      {visibility ? <UploadMenuContainer ref={menuRef}>
        {menuItems.map((item,i) => (
          <UploadMenu {...item} key={i} setVisibility={setVisibility} />
        ))}
      </UploadMenuContainer> : null}
      <UploadIcon onClick={() => setVisibility(true)} />

      {!!images.length && (
        <UploaderForImages>
          <LeftArrow onClick={scrollLeft} />
          <Images>
            <StyledSimpleBar ref={imagesRef}>
              <ImagesWrapper>
                {images.map(image => (
                  <Image key={image.id} image={image.preview}>
                    <RemoveImage onClick={() => deleteImage(image.id)}>
                      <RemoveImageIcon />
                    </RemoveImage>
                    {!!image.percent && <Progress value={image.percent} />}
                  </Image>
                ))}
              </ImagesWrapper>
            </StyledSimpleBar>
          </Images>
          <RightArrow onClick={scrollRight} />
          <Send onClick={() => uploadImage()} />
        </UploaderForImages>
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


const Container = styled.div<{listEmpty: boolean}>`
  display: flex;
  align-self: ${({ listEmpty }) => !listEmpty ? "center" : "flex-end"};
  margin-bottom: ${({ listEmpty }) => !listEmpty ? "0" : "10px"};

    @media screen and (max-width: 480px) and (orientation : portrait) {
        align-self: ${({ listEmpty }) => !listEmpty ? "center" : "flex-start"};
        margin-bottom: 0;
        margin-top: ${({ listEmpty }) => !listEmpty ? "0" : "12px"};
    }
`

const UploadMenuContainer = styled.div`
  background: #FFFFFF;
  position: absolute;
  transform: translateY(-125%);
  left: 0;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
`

const MenuItem = styled.div`
  font-size: 14px;
  line-height: 22px;  
`

const UploadIcon = styled(Icon).attrs({ name: "clip" })`
  fill: #5B6670;;
  cursor: pointer;
  width: 28px;
  margin-right: 12px;
  display: flex;
  align-items: center;
`

const FileInput = styled.input`
  display: none;
`

const UploaderForImages = styled.div`
  position: absolute;
  left: 44px;
  width: calc(100% - 44px);
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  top: 0;
  background: #e1e6ea;
`

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 12px;
    width: 137px;
    height: 48px;
    cursor: pointer;
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

const MenuIcon = styled(Icon).attrs((props: any) => ({
  name: props.iconName,
  ...props
}))`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`

const Send = styled(Icon).attrs({ name: "send" })`
  fill: #5B6670;
  cursor: pointer;
  height: 17px;
  margin-right: 25px;
`
