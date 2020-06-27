import * as React from "react"
import styled from "styled-components"

type CardTypes = {
  text: string
  image: string
}

const StyledBenefitCard = styled.div`
  width: calc(25% - 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 52px;
  margin-right: 24px;
  order: initial;
  @media screen and (max-width: 768px) {
    width: calc(25% - 24px);
    margin-bottom: 44px;
    max-width: 160px;
  }
  @media screen and (max-width: 480px) {
    width: calc(50% - 16px);
    margin-right: 16px;
    margin-bottom: 32px;
    max-width: 140px;
    
    &:nth-child(6) {
      order: 99;
    }
    &:nth-child(5) {
      order: 100;
    }
  }
`

const Content = styled.div`
  text-align: center;
  max-width: 200px;
`

const Image = styled.img`
  width: 120px;
  height: 120px;
  opacity: 0.9;
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

const Text = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-top: 12px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`

export const BenefitCard = (props: CardTypes) => (
  <StyledBenefitCard>
    <Content>
      <Image src={props.image} />
      <Text>{props.text}</Text>
    </Content>
  </StyledBenefitCard>
)
