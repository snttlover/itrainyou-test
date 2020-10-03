import { Icon } from "#/components/icon/Icon"
import { MediaRange } from "#/lib/responsive/media"
import styled from "styled-components"
import React from "react"

const Tooltip = styled.div`
  width: 256px;
  height: auto;
  position: absolute;
  z-index: 1;
  padding: 8px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  left: 20px;
  top: 0;
  display: none;

  ${MediaRange.lessThan(`tablet`)`
     top: 20px;
  `}
`

const Container = styled.div``

const Title = styled.div`
  display: flex;
  align-items: center;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #5b6670;

  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 22px;
  `}
`

const InfoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover ${Tooltip} {
    display: block;
  }
`

const InfoIcon = styled(Icon).attrs({ name: `info` })`
  margin-left: 7px;
  fill: #dbdee0;
  width: 19px;
  height: 19px;
`

const Amount = styled.div`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 44px;
  color: ${({ theme }) => theme.colors.primary};

  ${MediaRange.lessThan("mobile")`
    margin-top: 1px;
    font-size: 24px;
    line-height: 44px;
  `}
`

type WalletAmountProps = {
  title: string
  amount: number
  description: string
  className?: string
}

export const WalletAmount = ({ title, amount, description, className }: WalletAmountProps) => (
  <Container className={className}>
    <Title>
      {title}
      <InfoContainer>
        <InfoIcon />
        <Tooltip>{description}</Tooltip>
      </InfoContainer>
    </Title>
    <Amount>{amount} ₽</Amount>
  </Container>
)
