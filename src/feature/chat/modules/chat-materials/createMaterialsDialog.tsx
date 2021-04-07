import React from "react"
import { useEvent, useList, useStore } from "effector-react"
import { createChatMaterialsModule } from "@/feature/chat/modules/chat-materials/create-chat-materials"
import styled from "styled-components"
import { Close, Dialog } from "@/components/dialog/Dialog"
import { createInfinityScroll } from "@/feature/pagination"
import { ImagesViewModal } from "@/pages/search/coach-by-id/ImagesViewModal"
import { MediaRange } from "@/lib/responsive/media"
import { Tab, Tabs } from "@/components/tabs/Tabs"
import FilePreview from "@/feature/chat/view/content/message-box/content/file-preview.svg"
import { getFileName, downloadByURL } from "@/lib/network/get-file-by-url"
import { Icon } from "@/components/icon/Icon"

type MaterialProps = {
    material: {
        id: number
        type: string
        file: string
    }
    handleOnClick: (file: string) => void
}

const MaterialsItem = (props: MaterialProps) => (
  <>
    {props.material.type === "IMAGE" ?
      <Image image={props.material.file} onClick={() => props.handleOnClick(props.material.file)}/>
      :
      <Content>
        <Content>
          <FileIcon src={FilePreview}/>
          <Name>{getFileName(props.material.file)}</Name>
        </Content>
        <DownLoad onClick={() => downloadByURL(props.material.file,getFileName(props.material.file))} />
      </Content>
    }
  </>
)


export const createMaterialsDialog = ($module: ReturnType<typeof createChatMaterialsModule>) => {
  const InfinityScroll = createInfinityScroll($module.modules.pagination)

  return () => {
    const visibility = useStore($module.data.$dialogVisibility)
    const changeVisibility = useEvent($module.methods.changeDialogVisibility)
    const changeTab = useEvent($module.methods.changeTab)
    const isEmpty = useStore($module.data.$isEmpty)
    const tab = useStore($module.data.$tab)

    const previewDialogVisibility = useStore($module.modules.imagesDialog.$visibility)
    const changePreviewDialogVisibility = useEvent($module.modules.imagesDialog.changeVisibility)
    const openImage = useEvent($module.modules.imagesDialog.openImage)
    const initialSlide = useStore($module.modules.imagesDialog.$initialSlide)
    const previewDialogImages = useStore($module.modules.imagesDialog.$images)
    const loadMore = useEvent($module.methods.load)
    const itemsCount = useStore($module.modules.imagesDialog.$itemsCount)

    const handleOnClick = (file: string) => {
      if (tab === "images") {
        openImage(file)
      }
    }

    return (
      <>
        <StyledDialog id='materials-dialog' value={visibility} onChange={changeVisibility}>
          <Container>
            <Header>Материалы диалога</Header>
            <StyledTabs value={tab} onChange={changeTab}>
              <StyledTab value='images'>Фотографии</StyledTab>
              <StyledTab value='documents'>Файлы</StyledTab>
            </StyledTabs>
            {isEmpty && <Empty>Нет файлов</Empty>}
            <Images>
              <InfinityScroll scrollableTarget='materials-dialog'>
                <MaterialsWrapper materials={tab}>
                  {useList($module.data.$materials, material => (
                    <MaterialsItem material={material} handleOnClick={handleOnClick} />
                  ))}
                </MaterialsWrapper>
              </InfinityScroll>
            </Images>
          </Container>
        </StyledDialog>

        {previewDialogVisibility && (
          <ImagesViewModal
            count={itemsCount}
            close={() => changePreviewDialogVisibility(false)}
            initialSlide={initialSlide}
            photos={previewDialogImages}
            loadMore={() => loadMore()}
          />
        )}
      </>
    )
  }
}

const Name = styled.div`
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #5B6670;
    margin-left: 15px;
    max-width: 280px;
`

const MaterialsWrapper = styled.div<{ materials: "images" | "documents"}>`
  display: flex;
  flex-wrap: ${({ materials,theme }) => materials === "images" ? "wrap" : "nowrap"};
  width: ${({ materials,theme }) => materials === "images" ? "unset" : "100%"};
  flex-direction: ${({ materials,theme }) => materials === "images" ? "unset" : "column"};  
`

const Empty = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
  position: absolute;
  font-size: 16px;
  line-height: 22px;
  color: #9aa0a6;
`

const StyledDialog = styled(Dialog)`
  max-width: 800px;
  width: 100%;
  height: 100%;
  ${MediaRange.lessThan("mobile")`

      padding: 12px;
      ${Close} {
        width: 30px;
        height: 30px;
        top: 20px;
      }
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  font-family: Roboto Slab;
  margin-bottom: 12px;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  ${MediaRange.lessThan("mobile")`
      margin-bottom: 34px;
      margin-top: 10px;
  `}
`

const Images = styled.div`
  flex: 1;
  overflow: auto;
  flex-wrap: wrap;
  min-height: 200px;
`

type ImageType = {
  image: string
}

const Image = styled.div<ImageType>`
  width: calc(25% - 8px);
  height: 144px;
  margin-right: 8px;
  margin-bottom: 8px;
  background: url("${props => props.image}");
  background-size: cover;
  position: relative;
  ${MediaRange.lessThan("mobile")`  
    width: calc(33% - 8px);
    height: 72px;
  `}
`

const FileIcon = styled.img`
  width: 40px;
  height: 40px;
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 4px;  
`

const StyledTabs = styled(Tabs)`
  display: flex;
  position: relative;
  margin-bottom: 16px;  
`

const StyledTab = styled(Tab)`
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2px;
  background: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  &[data-active="true"] {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    background: transparent;
  }
`

const DownLoad = styled(Icon).attrs({ name: "download" })`
  width: 32px;
  cursor: pointer;
  fill: ${props => props.theme.colors.primary};
  margin-right: 10px;  
`
