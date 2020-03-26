import { MediaRange } from "@/application/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"
import cross from "./cross.svg"

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: rgba(66, 66, 66, 0.6);
  ${MediaRange.greaterThan('mobile')`
    padding: 44px;
  `}
`

const Container = styled.div`
  background: #ffffff;
  border-radius: 4px;
  width: 100%;
  position: relative;
  padding: 24px;
  outline: none;
  ${MediaRange.greaterThan('laptop')`
    width: 680px;
  `}
`

const Cross = styled.img.attrs({ src: cross })`
  position: absolute;
  right: 16px;
  top: 12px;
  cursor: pointer;
  ${MediaRange.greaterThan('mobile')`
    right: 24px;
    top: 24px;
  `}
`

type Props = {
  children: React.ReactNode
  onCrossClick: () => void
}

export const Modal = React.forwardRef<HTMLDivElement, Props>(({ children, onCrossClick, ...props }: Props, ref) => (
  <Backdrop>
    <Container {...props} ref={ref}>
      <Cross onClick={onCrossClick} />
      {children}
    </Container>
  </Backdrop>
))
