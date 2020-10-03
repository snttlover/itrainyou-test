import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing/common/LandingPageContainer"
import { LeftColumn } from "./LeftColumn"
import { RightColumn } from "./RightColumn"
import manImage from "./images/man.svg"

const Title = styled.h3`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #544274;
  margin-bottom: 36px;
  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
    padding-top: 12px;
  }
`

const AdvantagesColumns = styled.div`
  display: flex;
  padding-bottom: 128px;

  @media screen and (max-width: 768px) {
    padding-right: 18px;
    padding-bottom: 64px;
  }
  @media screen and (max-width: 580px) {
    flex-direction: column;
  }
  @media screen and (max-width: 480px) {
    padding-bottom: 30px;
  }
`

const Man = styled.img.attrs({ src: manImage })`
  width: 115.31px;
  height: 340px;
  margin: 40px 24px 0;
  @media screen and (max-width: 768px) {
    width: 81.4px;
    height: 240px;
    margin: 49px 0 0;
  }
  @media screen and (max-width: 580px) {
    display: none;
  }
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
