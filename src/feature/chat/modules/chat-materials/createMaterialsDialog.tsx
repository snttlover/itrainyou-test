import React from "react"
import { useEvent, useList, useStore } from "effector-react/ssr"
import { createChatMaterialsModule } from "@/feature/chat/modules/chat-materials/create-chat-materials"
import styled from "styled-components"
import { Close, Dialog } from "@/components/dialog/Dialog"
import { createInfinityScroll } from "@/feature/pagination"
import { ImagesViewModal } from "@/pages/search/coach-by-id/ImagesViewModal"
import { DialogOverlayContainer } from "@/components/dialog/DialogOverlay"
import { MediaRange } from "@/lib/responsive/media"

export const createMaterialsDialog = ($module: ReturnType<typeof createChatMaterialsModule>) => {
  const InfinityScroll = createInfinityScroll($module.modules.pagination)

  return () => {
    const visibility = useStore($module.data.$dialogVisibility)
    const changeVisibility = useEvent($module.methods.changeDialogVisibility)
    const isEmpty = useStore($module.data.$isEmpty)

    const previewDialogVisibility = useStore($module.modules.imagesDialog.$visibility)
    const changePreviewDialogVisibility = useEvent($module.modules.imagesDialog.changeVisibility)
    const openImage = useEvent($module.modules.imagesDialog.openImage)
    const initialSlide = useStore($module.modules.imagesDialog.$initialSlide)
    const previewDialogImages = useStore($module.modules.imagesDialog.$images)
    const loadMore = useEvent($module.methods.load)
    const itemsCount = useStore($module.modules.imagesDialog.$itemsCount)

    return (
      <>
        <Wrapper>
          <StyledDialog id='materials-dialog' value={visibility} onChange={changeVisibility}>
            <Container>
              <Header>Материалы диалога</Header>
              {isEmpty && <Empty>Нет файлов</Empty>}
              <Images>
                <InfinityScroll scrollableTarget='materials-dialog'>
                  <ImagesWrapper>
                    {useList($module.data.$materials, image => (
                      <Image image={image.file} onClick={() => openImage(image.file)} />
                    ))}
                  </ImagesWrapper>
                </InfinityScroll>
              </Images>
            </Container>
          </StyledDialog>
        </Wrapper>

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

const Wrapper = styled.div`
  ${DialogOverlayContainer} {
    ${MediaRange.lessThan(`mobile`)`
        padding: 0;
        flex-direction: column;
    `}
  }
`

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  ${MediaRange.lessThan(`mobile`)`
      width: 100%;
      height: 100vh;
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
  ${MediaRange.lessThan(`mobile`)`
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
  ${MediaRange.lessThan(`mobile`)`  
    width: calc(33% - 8px);
    height: 72px;
  `}
`
