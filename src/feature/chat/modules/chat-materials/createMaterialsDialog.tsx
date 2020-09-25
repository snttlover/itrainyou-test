import React from "react"
import { useEvent, useList, useStore } from "effector-react/ssr"
import { createChatMaterialsModule } from "@/feature/chat/modules/chat-materials/create-chat-materials"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { createInfinityScroll } from "@/feature/pagination"

export const createMaterialsDialog = ($module: ReturnType<typeof createChatMaterialsModule>) => {
  const InfinityScroll = createInfinityScroll($module.modules.pagination)

  return () => {
    const visibility = useStore($module.data.$dialogVisibility)
    const changeVisibility = useEvent($module.methods.changeDialogVisibility)
    const isEmpty = useStore($module.data.$isEmpty)

    return (
      <StyledDialog value={visibility} onChange={changeVisibility}>
        <Container>
          <Header>Материалы диалога</Header>
          {isEmpty && <Empty>Нет файлов</Empty>}
          <Images>
            <InfinityScroll>
              {useList($module.data.$materials, file => (
                <Image image={file.image} />
              ))}
            </InfinityScroll>
          </Images>
        </Container>
      </StyledDialog>
    )
  }
}

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
  max-height: 540px;
  width: 100%;
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
  margin-right: 8px;
  margin-bottom: 8px;
  background: url("${props => props.image}");
  background-size: cover;
  position: relative;
  padding-top: 100%;
`
