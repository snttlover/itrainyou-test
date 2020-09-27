import React from "react"
import styled from "styled-components"

type DialogOverlayTypes = {
  children: React.ReactChild | React.ReactChild[]
  onClick?: () => void
  className?: string
}

export const DialogOverlay = (props: DialogOverlayTypes) => {
  return (
    <StyledDialogOverlay className={props.className} onClick={props.onClick}>
      <DialogOverlayContainer>{props.children}</DialogOverlayContainer>
    </StyledDialogOverlay>
  )
}

const StyledDialogOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 998;
  background: rgba(66, 66, 66, 0.8);
`

export const DialogOverlayContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;
`
