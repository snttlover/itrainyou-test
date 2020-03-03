import * as React from "react"
import styled from "styled-components"



const StyledSlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1000px) {
    align-items: flex-start;
  }
  @media screen and (max-width: 638px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

const DescriptionContainer = styled.div`
  width: 284px;
  margin-right: 26px;
  @media screen and (max-width: 1000px) {
    width: 220px;
  }
  @media screen and (max-width: 638px) {
    order: 2;
    margin-right: 0;
  }
`

const DescriptionTitle = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 26px;
  color: #544274;
  margin-bottom: 24px;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 12px;
  }
  @media screen and (max-width: 638px) {
    margin-top: 24px;
    text-align: center;
  }
`

const DescriptionSubTitle = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  @media screen and (max-width: 638px) {
    text-align: center;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const Image = styled.img`
  width: 424.86px;
  height: 407.03px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
  @media screen and (max-width: 638px) {
    order: 1;
  }
`

export type AdvantageSlideTypes = {
  title: string,
  description: () => React.ReactNode,
  image: string,
  className?: string
}

export const AdvantageSlide = (props: AdvantageSlideTypes) => (
  <StyledSlide className={props.className}>
    <DescriptionContainer>
      <DescriptionTitle>{props.title}</DescriptionTitle>
      <DescriptionSubTitle>{props.description()}</DescriptionSubTitle>
    </DescriptionContainer>
    <Image src={props.image} />
  </StyledSlide>
)
