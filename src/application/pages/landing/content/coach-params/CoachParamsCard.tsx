import * as React from "react"
import styled from "styled-components"

type StyledCardTypes = {
  color: string
}

const StyledCard = styled.div<StyledCardTypes>`
  height: auto;
  max-height: 252px;
  position: relative;
  padding-bottom: 30px;
  margin-top: 50px;
  width: auto;
  max-width: 240px;
  &:after {
    position: absolute;
    z-index: 1;
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${props => props.color};
    opacity: 0.24;
    border-radius: 10px;
    height: 8px;
  }
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
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 8px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 12px;
  }
`

const Description = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`

type CoachParamsCardProps = {
  image: string
  title: string
  description: string
  color: string
  className?: string
}

export const CoachParamsCard = (props: CoachParamsCardProps) => (
  <StyledCard className={props.className} color={props.color}>
    <Icon src={props.image} />
    <Title>{props.title}</Title>
    <Description>{props.description}</Description>
  </StyledCard>
)
