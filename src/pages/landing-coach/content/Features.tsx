import React from "react"
import styled from "styled-components"

import { Mobile } from "./features/Mobile"
import { Desktop } from "./features/Desktop"

const Wrapper = styled.section`
  background: #4858cc;
  overflow: hidden;

  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 80px;
  }

  @media (min-width: 1140px) {
    margin-bottom: 120px;
  }
`

const MobileVersion = styled(Mobile)`
  display: block;

  @media (min-width: 1140px) {
    display: none;
  }
`

const DesktopVersion = styled(Desktop)`
  display: none;

  @media (min-width: 1140px) {
    display: block;
  }
`

export const Features = () => (
  <Wrapper>
    <MobileVersion />
    <DesktopVersion />
  </Wrapper>
)
