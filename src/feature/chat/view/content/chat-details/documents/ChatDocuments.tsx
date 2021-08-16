import React, { useEffect } from "react"
import styled from "styled-components"
import { useEvent, useList, useStore } from "effector-react"
import { createInfinityScroll } from "@/feature/pagination"
import { downloadByURL, getFileName } from "@/lib/network/get-file-by-url"
import { Icon } from "@/old-components/icon/Icon"
import { createChatDocumentsListModule } from "@/feature/chat/modules/chat-documents"

export const createChatDocuments = (imagesModule: ReturnType<typeof createChatDocumentsListModule>) => {
  const Pagination = createInfinityScroll(imagesModule.modules.pagination)

  return () => {
    const empty = useStore(imagesModule.modules.pagination.data.$listIsEmpty)

    const init = useEvent(imagesModule.methods.init)
    const reset = useEvent(imagesModule.methods.reset)

    useEffect(() => {
      init()
      return () => reset()
    }, [])

    return (
      <Container id={"chat-documents"}>
        {empty && <Empty>Пока нет документов</Empty>}
        <Pagination scrollableTarget={"chat-documents"}>
          <DocumentWrapper>
            {useList(imagesModule.data.$materials, material => (
              <Content onClick={() => downloadByURL(material.file, getFileName(material.file))}>
                <FileIconWrapper>
                  <FileIcon />
                </FileIconWrapper>
                <FileName>{getFileName(material.file)}</FileName>
              </Content>
            ))}
          </DocumentWrapper>
        </Pagination>
      </Container>
    )
  }
}

const FileName = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

const Container = styled.div`
  padding: 16px;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  cursor: pointer;
`

const DocumentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

const FileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f4f5f7;
  border-radius: 8px;
  margin-right: 8px;
`

const FileIcon = styled(Icon).attrs({ name: "file" })`
  stroke: ${props => props.theme.colors.primary};
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
