import React, { useEffect } from "react"
import styled from "styled-components"
import { DialogOverlay } from "@/oldcomponents/dialog/DialogOverlay"
import { Icon } from "@/oldcomponents/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

type DialogProps = {
  children: React.ReactChild | React.ReactChild[]
  value: boolean
  onChange: (val: boolean) => any | React.Dispatch<React.SetStateAction<boolean>>
  className?: string
  notClosable?: boolean
  id?: string
}

export const Dialog = (props: DialogProps) => {
  const close = () => props.onChange(false)

  const documentKeypressHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      close()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", documentKeypressHandler)
    return () => document.removeEventListener("keydown", documentKeypressHandler)
  }, [])

  return (
    <>
      {props.value && (
        <DialogOverlay id={props.id} onClick={close}>
          <StyledDialog className={props.className} onClick={e => e.stopPropagation()}>
            {!props.notClosable? <Close onClick={close} /> : null}
            {props.children}
          </StyledDialog>
        </DialogOverlay>
      )}
    </>
  )
}

export const Close = styled(Icon).attrs({ name: "close" })`
  width: 20px;
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 21px;
  fill: ${props => props.theme.colors.primary};
  z-index: 1;
`

const StyledDialog = styled.div`
  padding: 24px;
  margin: 0 auto;

  background: #ffffff;
  border-radius: 2px;
  cursor: default;
  position: relative;
  
  max-width: 560px;
  min-width: 288px;
  
  ${MediaRange.lessThan("mobile")`
    padding: 16px;
    width: 90%;
  `}
`
