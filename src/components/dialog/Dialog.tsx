import React from "react"
import styled from "styled-components"
import { DialogOverlay } from "@/components/dialog/DialogOverlay"
import { Icon } from "@/components/icon/Icon"

type DialogProps = {
  children: React.ReactChild | React.ReactChild[]
  value: boolean
  onChange: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}

export const Dialog = (props: DialogProps) => {
  const close = () => {
    props.onChange(false)
  }

  return (
    <>
      {props.value && (
        <DialogOverlay onClick={close}>
          <StyledDialog className={props.className} onClick={e => e.stopPropagation()}>
            <Close onClick={close} />
            {props.children}
          </StyledDialog>
        </DialogOverlay>
      )}
    </>
  )
}

const Close = styled(Icon).attrs({ name: `close` })`
  width: 20px;
  cursor: pointer;
  position: absolute;
  top: 26px;
  right: 21px;
  fill: ${props => props.theme.colors.primary};
`

const StyledDialog = styled.div`
  padding: 24px;

  background: #ffffff;
  border-radius: 2px;
  cursor: default;
  position: relative;
`
