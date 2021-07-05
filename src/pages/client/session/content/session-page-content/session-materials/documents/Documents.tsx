import React from "react"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

export const Documents = () => (
  <Container>
    <File>
      <FileIcon />
      <FileInfo>
        <Name>fugiat mollit duis elit aliquip.pdf</Name>
        <Extension>PDF</Extension>
        <Size>381 КБ</Size>
      </FileInfo>
    </File>


    <File>
      <FileIcon />
      <FileInfo>
        <Name>fugiat mollit duis elit aliquip.pdf</Name>
        <Extension>PDF</Extension>
        <Size>381 КБ</Size>
      </FileInfo>
    </File>


    <File>
      <FileIcon />
      <FileInfo>
        <Name>fugiat mollit duis elit aliquip.pdf</Name>
        <Extension>PDF</Extension>
        <Size>381 КБ</Size>
      </FileInfo>
    </File>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`

const Extension = styled.div`
  display: none;

  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;

  ${MediaRange.lessThan("mobile")`
     display: flex;
     margin-right: 8px;
   `}
`

const FileInfo = styled.div`
  flex: 1;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
`

const File = styled.div`
  display: flex;
  align-items: center;
  padding: 11px;
  border-bottom: 1px solid #eceff1;

  ${MediaRange.lessThan("mobile")`
    padding: 10px 0;
    border-bottom: 0px;
  `}
`

const FileIcon = styled(Icon).attrs({ name: "document" })`
  width: 14px;
  fill: ${({ theme }) => theme.colors.primary};
  margin-right: 10px;
  ${MediaRange.lessThan("mobile")`
    align-self: flex-start;
  `}
`

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
  flex: 1;

  ${MediaRange.lessThan("mobile")`
     width: 100%;
     flex-basis: 100%;
  `}
`

const Size = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #9aa0a6;
  ${MediaRange.lessThan("mobile")`
    font-size: 12px;
    line-height: 16px;
  `}
`
