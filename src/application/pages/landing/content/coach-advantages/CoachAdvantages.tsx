import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import { LeftColumn } from "./LeftColumn"
import { RightColumn } from "./RightColumn";
import manImage from "./images/man.svg"

const Title = styled.h3`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #544274;
  margin-bottom: 36px;
`

const AdvantagesColumns = styled.div`
  display: flex;
  padding-bottom: 128px;
`

const Man = styled.img.attrs({ src: manImage })`
  width: 115.31px;
  height: 340px;
  flex: 0;
  margin: 0 24px;
`

export const CoachAdvantages = () => (
  <LandingPageContainer>
    <Title>Коуч полезен:</Title>
    <AdvantagesColumns>
      <LeftColumn />
      <Man />
      <RightColumn />
    </AdvantagesColumns>
  </LandingPageContainer>
)
