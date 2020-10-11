import * as React from "react"
import styled from "styled-components"

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: auto;
  max-height: 252px;
  position: relative;
  padding-bottom: 30px;
  margin-top: 36px;
  width: auto;
  max-width: 350px;
  @media screen and (max-width: 768px) {
    margin-top: 24px;
  }
  @media screen and (max-width: 554px) {
    max-height: unset;
    padding-bottom: 20px;
  }
`

const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-bottom: 12px;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #4858cc;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 12px;
  }
`

const Description = styled.div`
  font-size: 16px;
  line-height: 22px;
  text-align: center;

  margin-top: 16px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 18px;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`

type CoachParamsCardProps = {
  image: string
  title: string
  description: string
  className?: string
}

export const CoachParamsCard = (props: CoachParamsCardProps) => (
  <StyledCard className={props.className}>
    <Icon src={props.image} />
    <Title>{props.title}</Title>
    <Description dangerouslySetInnerHTML={{ __html: props.description }} />
  </StyledCard>
)
