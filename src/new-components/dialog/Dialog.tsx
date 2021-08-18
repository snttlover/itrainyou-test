import React, { useEffect } from "react"
import styled from "styled-components"
import { DialogOverlay } from "@/old-components/dialog/DialogOverlay"
import { Icon } from "@/old-components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

type DialogProps = {
  value: boolean
  onChange?: (val: boolean) => any | React.Dispatch<React.SetStateAction<boolean>>
  className?: string
  notClosable?: boolean
  id?: string
  fullscreenOnMobile?: boolean
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  fullscreenOnMobile,
  onChange,
  notClosable,
  value,
  className,
  id,
}) => {
  const close = () => {
    onChange && onChange(false)
  }

  const documentKeypressHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 27 && !notClosable) {
      close()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", documentKeypressHandler)
    return () => document.removeEventListener("keydown", documentKeypressHandler)
  }, [])

  return (
    <>
      {value && (
        <DialogOverlay id={id} onClick={close}>
          <StyledDialog
            className={className}
            onClick={e => e.stopPropagation()}
            data-fullscreen-on-modile={fullscreenOnMobile}
          >
            {!notClosable ? <Close onClick={close} /> : null}
            {children}
          </StyledDialog>
        </DialogOverlay>
      )}
    </>
  )
}

export const Close = styled(Icon).attrs({ name: "close" })`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 14px;
  fill: #9aa0a6;
  z-index: 1;
`

const StyledDialog = styled.div`
  padding: 24px;
  margin: 0 auto;

  background: #ffffff;
  border-radius: 8px;
  cursor: default;
  position: relative;

  max-width: 560px;
  min-width: 288px;

  ${MediaRange.lessThan("mobile")`
    padding: 16px;
    width: 90%;
    &[data-fullscreen-on-modile="true"] {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      overflow: hidden;
    }
  `}
`
