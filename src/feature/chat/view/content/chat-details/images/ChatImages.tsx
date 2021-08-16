import React, { useEffect } from "react"
import styled from "styled-components"
import { useEvent, useList, useStore } from "effector-react"
import { createChatImagesListModule } from "@/feature/chat/modules/chat-images"
import { createInfinityScroll } from "@/feature/pagination"
import { ImagesViewModal } from "@/pages/search/coach-by-id/ImagesViewModal"

export const createChatImages = (imagesModule: ReturnType<typeof createChatImagesListModule>) => {
  const Pagination = createInfinityScroll(imagesModule.modules.pagination)

  return () => {
    const previewDialogVisibility = useStore(imagesModule.modules.imagesDialog.$visibility)
    const changePreviewDialogVisibility = useEvent(imagesModule.modules.imagesDialog.changeVisibility)
    const openImage = useEvent(imagesModule.modules.imagesDialog.openImage)
    const initialSlide = useStore(imagesModule.modules.imagesDialog.$initialSlide)
    const previewDialogImages = useStore(imagesModule.modules.imagesDialog.$images)
    const loadMore = useEvent(imagesModule.methods.load)
    const itemsCount = useStore(imagesModule.modules.imagesDialog.$itemsCount)
    const empty = useStore(imagesModule.modules.pagination.data.$listIsEmpty)

    const init = useEvent(imagesModule.methods.init)
    const reset = useEvent(imagesModule.methods.reset)

    useEffect(() => {
      init()
      return () => reset()
    }, [])

    return (
      <Container id={"chat-images"}>
        {empty && <Empty>Пока нет фото</Empty>}
        <Pagination scrollableTarget={"chat-images"}>
          <ImagesWrapper>
            {useList(imagesModule.data.$materials, material => (
              <Picture src={material.file} onClick={() => openImage(material.file)} />
            ))}
          </ImagesWrapper>
        </Pagination>

        {previewDialogVisibility && (
          <ImagesViewModal
            count={itemsCount}
            close={() => changePreviewDialogVisibility(false)}
            initialSlide={initialSlide}
            photos={previewDialogImages}
            loadMore={() => loadMore()}
          />
        )}
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 16px;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
`

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

type PictureTypes = {
  src: string
}

const Picture = styled.div<PictureTypes>`
  cursor: pointer;
  position: relative;
  height: 90px;
  width: calc(33% - 8px);
  margin-right: 8px;
  margin-bottom: 8px;
  background: url("${props => props.src}");
  background-position: center;
  background-size: cover;
`

const Empty = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
  font-size: 16px;
  line-height: 22px;
  color: #9aa0a6;
`
