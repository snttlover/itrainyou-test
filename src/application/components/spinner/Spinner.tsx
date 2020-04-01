import * as React from "react"
import styled, { keyframes } from "styled-components"
import spinner from "./spinner.svg"

const Wrapper = styled.div`
  position: absolute;
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
`;

const Loader = styled.img.attrs({ src: spinner })`
  width: auto;
  height: auto;
  animation: ${rotate} 1s linear infinite;
`

export const Spinner = () => (
  <Wrapper>
    <Loader />
  </Wrapper>
)
