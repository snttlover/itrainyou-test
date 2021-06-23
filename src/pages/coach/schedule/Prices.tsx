import { PriceInputGroup } from "@/pages/coach/schedule/components/PriceInputGroup"
import * as React from "react"
import styled from "styled-components"
import { WeekDaySchedule } from "@/pages/coach/schedule/components/WeekDaySchedule"
import { MediaRange } from "@/lib/responsive/media"
import { useStore } from "effector-react"
import { Description, Title } from "@/pages/coach/schedule/CoachSchedulePage"
import { $feeRatio } from "@/pages/coach/schedule/models/schedule/units"
import { Informer } from "@/newcomponents/informer/Informer"

const StyledPriceInputGroup = styled(PriceInputGroup)``

const PriceListContainer = styled.div`
  margin-top: 16px;
  position: relative;
  max-width: 312px;  

  ${WeekDaySchedule}:not(:first-child) {
    margin-top: 8px;
    ${MediaRange.greaterThan("mobile")`
      margin-top: 16px;
    `}
  }
  
  ${StyledPriceInputGroup}:not(:first-child) {
    margin-top: 16px;
  }
`

const PriceContainer = styled.div`
  max-width: 552px;
  ${MediaRange.greaterThan("mobile")`
    flex-direction: row;
  `}

  ${MediaRange.greaterThan("desktop")`
    margin-right: 100px;
  `}
`

const InformerDescription = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
  max-width: 552px;
  
  & a {
    font-weight: 500;
    color: ${props => props.theme.colors.primary};
  }
`

export const Prices = () => {
  const feeRatio = useStore($feeRatio)

  return(
    <PriceContainer>
      <Title>Цена за сессию</Title>
      <Description>
        Укажите стоимость вашей сессии для клиента.
      </Description>
      <Informer>
        <InformerDescription><a>{feeRatio*100}%</a> от стоимости - комиссия платформы</InformerDescription>
      </Informer>
      <PriceListContainer>
        <StyledPriceInputGroup title='30 минут' name='d30Price' />
        <StyledPriceInputGroup title='45 минут' name='d45Price' />
        <StyledPriceInputGroup title='60 минут' name='d60Price' />
        <StyledPriceInputGroup title='90 минут' name='d90Price' />
      </PriceListContainer>
    </PriceContainer>
  )
}