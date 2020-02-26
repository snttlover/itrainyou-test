import * as React from "react"
import styled from "styled-components"

type CardTypes = {
  text: string
  image: string
}

const StyledBenefitCard = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 52px;
`

const Content = styled.div`
  text-align: center;
  max-width: 200px;
`

const Image = styled.img`
  width: 120px;
  height: 120px;
  opacity: 0.9;
`

const Text = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #424242;
  margin-top: 12px;
`

export const BenefitCard = (props: CardTypes) => (
  <StyledBenefitCard>
    <Content>
      <Image src={props.image} />
      <Text>{props.text}</Text>
    </Content>
  </StyledBenefitCard>
)
