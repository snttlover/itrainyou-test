import React from "react"
import styled from "styled-components"

type DialogOverlayTypes = {
  children: React.ReactChild | React.ReactChild[]
  onClick?: () => void
  className?: string
  id?: string
}

export const DialogOverlay = (props: DialogOverlayTypes) => {
  return (
    <StyledDialogOverlay className={props.className} onClick={props.onClick}>
      <DialogOverlayContainer id={props.id}>{props.children}</DialogOverlayContainer>
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
  
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DialogOverlayContainer = styled.div`
  max-height: 100%;
  width: 100%;
  display: block;
  overflow: auto;
  padding: 20px;
`
