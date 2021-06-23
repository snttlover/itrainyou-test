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

export const Prices = () => {
  const feeRatio = useStore($feeRatio)

  return(
    <PriceContainer>
      <Title>Цена за сессию</Title>
      <Description>
        Укажите стоимость вашей сессии для клиента.
      </Description>
      <Informer>
        <Description><a>{feeRatio*100}%</a> от стоимости - комиссия платформы</Description>
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