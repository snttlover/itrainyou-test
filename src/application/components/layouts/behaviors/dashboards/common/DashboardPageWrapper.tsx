import styled from "styled-components"
import React from "react"

const Container = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  overflow-x: hidden;
`

type DashboardPageWrapperTypes = {
  children: React.ReactChild
}

export const DashboardPageWrapper = (props: DashboardPageWrapperTypes) => <Container id='page-wrapper'>{props.children}</Container>
