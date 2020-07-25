import React from "react"
import styled from "styled-components"

type DialogOverlayTypes = {
  children: React.ReactChild
  onClick: () => void
}

export const DialogOverlay = (props: DialogOverlayTypes) => (
  <StyledDialogOverlay onClick={props.onClick}>
    <Container>{props.children}</Container>
  </StyledDialogOverlay>
)

const StyledDialogOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  background: rgba(66, 66, 66, 0.8);
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`
