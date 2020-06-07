import * as React from "react"
import styled, { keyframes } from "styled-components"

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const LoaderSvg = ({ className }: { className?: string }) => (
  <svg
    style={{ margin: "auto", background: "rgb(255, 255, 255, 0)", display: "block", shapeRendering: "auto" }}
    width='200px'
    height='200px'
    className={className}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMidYMid'
  >
    <circle
      cx='50'
      cy='50'
      fill='none'
      strokeWidth='2'
      r='8'
      strokeDasharray='37.69911184307752 14.566370614359172'
      transform='rotate(12.1817 50 50)'
    />
  </svg>
)

export const Loader = styled(LoaderSvg)`
  width: auto;
  height: auto;
  stroke: ${props => props.theme.colors.primary};
  animation: ${rotate} 1s linear infinite;
`

type SpinnerTypes = {
  className?: string
}

export const Spinner = (props: SpinnerTypes) => (
  <Wrapper className={props.className}>
    <Loader />
  </Wrapper>
)
