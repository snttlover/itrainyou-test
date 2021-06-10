import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { content as messages } from "./before-after/content"

import { Container } from "../../common/Container"

import beforeImg from "../assets/before-after/1.png"
import afterImg from "../assets/before-after/2.png"

const Wrapper = styled.section`
  background: #4858cc;

  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 80px;
  }

  @media (min-width: 1140px) {
    margin-bottom: 120px;
  }
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 58px 0 24px;

  @media (min-width: 768px) {
    padding: 60px 0 117px;
  }

  @media (min-width: 1140px) {
    padding: 91px 0 122px;
    flex-direction: row;
  }
`

const Section = styled.div`
  position: relative;
`

const BeforeSection = styled(Section)`
  width: 288px;
  margin: 0 auto;
  margin-bottom: 42px;

  @media (min-width: 768px) {
    width: 348px;
    margin: 0;
    margin-bottom: 86px;
  }

  @media (min-width: 1140px) {
    margin-right: 210px;
  }
`

const AfterSection = styled(Section)`
  width: 288px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 348px;
    margin: 0;
  }
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #ffffff;

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 44px;
  }
`

const BeforeTitle = styled(Title)`
  margin-bottom: 50px;

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`

const AfterTitle = styled(Title)`
  margin-bottom: 50px;
  max-width: 117px;

  @media (min-width: 768px) {
    max-width: 100%;
    margin-bottom: 24px;
  }

  @media (min-width: 1140px) {
    margin-bottom: 119px;
  }
`

const Card = styled.p`
  padding: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  min-height: 140px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  background: #ffffff;

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    min-height: 128px;
  }
`

const BeforeCard = styled(Card)`
  border-radius: 8px 0px 8px 8px;
  color: #ff6b00;

  @media (min-width: 768px) {
    border-radius: 8px 8px 0px 8px;
  }
`

const AfterCard = styled(Card)`
  border-radius: 8px 0px 8px 8px;
  color: #4858cc;
`

const Image = styled.img`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;

  @media (min-width: 768px) {
    width: 200px;
    right: -260px;
  }
`

const BeforeImage = styled(Image)`
  z-index: 2;
  top: -30px;

  @media (min-width: 768px) {
    top: 30px;
  }

  @media (min-width: 1140px) {
    width: 162px;
    top: 160px;
    right: -95px;
  }
`

const AfterImage = styled(Image)`
  top: -18px;

  @media (min-width: 768px) {
    top: 31px;
  }

  @media (min-width: 1140px) {
    width: 255px;
    top: -24px;
    right: -184px;
  }
`

export const BeforeAfter = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      currentMessageIndex === messages.length - currentMessageIndex
        ? setCurrentMessageIndex(0)
        : setCurrentMessageIndex(currentMessageIndex + 1)
    }, 3000)

    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <Wrapper>
      <StyledContainer>
        <BeforeSection>
          <BeforeTitle>До ITrainYou</BeforeTitle>
          <BeforeCard>{messages[currentMessageIndex].before}</BeforeCard>
          <BeforeImage src={beforeImg} />
        </BeforeSection>
        <AfterSection>
          <AfterTitle>После ITrainYou</AfterTitle>
          <AfterCard>{messages[currentMessageIndex].after}</AfterCard>
          <AfterImage src={afterImg} />
        </AfterSection>
      </StyledContainer>
    </Wrapper>
  )
}
