import React, { useState } from "react"
import styled from "styled-components"
import { Tab, Tabs } from "@/oldcomponents/tabs/Tabs"
import { Documents } from "@/pages/client/session/content/session-page-content/session-materials/documents/Documents"
import { Pictures } from "@/pages/client/session/content/session-page-content/session-materials/pictures/Pictures"
import { Videos } from "@/pages/client/session/content/session-page-content/session-materials/videos/Videos"
import { MediaRange } from "@/lib/responsive/media"

export const SessionMaterials = () => {
  const [tab, changeTab] = useState("documents")

  return (
    <Container>
      <Header>Материалы сессии</Header>
      <FilesPicker>
        <Tabs value={tab} onChange={changeTab}>
          <StyledTab value='documents'>документы</StyledTab>
          <StyledTab value='pictures'>фотографии</StyledTab>
          <StyledTab value='videos'>видео</StyledTab>
        </Tabs>
        <FilesContainer>
          {tab === "documents" && <Documents />}
          {tab === "pictures" && <Pictures />}
          {tab === "videos" && <Videos />}
        </FilesContainer>
      </FilesPicker>
    </Container>
  )
}

const StyledTab = styled(Tab)`
  ${MediaRange.lessThan("mobile")`
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    padding: 8px 0;
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  ${MediaRange.lessThan("mobile")`
    margin-top: 12px;
  `}
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;

  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 26px;
  `}
`

const FilesPicker = styled.div`
  margin-top: 16px;
  ${MediaRange.lessThan("mobile")`
    margin-top: 8px;
  `}
`

const FilesContainer = styled.div`
  background: #fff;
`
