import * as React from "react"
import styled from "styled-components"
import spinner from "./spinner.svg"

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`

const Loader = styled.img.attrs({ src: spinner })`
  width: auto;
  height: auto;
`

export const Spinner = () => (
  <Wrapper>
    <Loader />
  </Wrapper>
)
