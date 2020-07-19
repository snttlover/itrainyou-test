import React from "react"
import styled from "styled-components"
import { UserHeader } from "@/pages/client/session/content/session-page-content/UserHeader"
import { MediaRange } from "@/lib/responsive/media"

export const SessionPage = () => (
  <Container>
    <Content>
      <UserHeader />
    </Content>
    <SessionInfoWrapper>Info</SessionInfoWrapper>
  </Container>
)

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 36px 20px 20px;
  width: 100%;
  max-width: 892px;
  margin: 0 auto;
  ${MediaRange.lessThan(`tablet`)`
    max-width: 600px;
  `}
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  flex: 1;
  ${MediaRange.lessThan(`tablet`)`
    margin-right: 0;
  `}
`

const SessionInfoWrapper = styled.div`
  width: 268px;
  ${MediaRange.lessThan(`tablet`)`
    display: none;
  `}
`
