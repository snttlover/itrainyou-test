import { CalendarPart } from "@/pages/coach/schedule/components/CalendarPart"
import { PriceInputGroup } from "@/pages/coach/schedule/components/PriceInputGroup"
import React, { useState } from "react"
import styled from "styled-components"

export const Title = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
`

export const Description = styled.p`
  margin-top: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
`

const ScheduleSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const PriceContainer = styled.div`
  max-width: 320px;
`

const PriceListContainer = styled.div`
  margin-top: 16px;
`

export const Schedule = () => {
  const [priceInputs1, setPriceInputs1] = useState<number[]>([])
  const [priceInputs2, setPriceInputs2] = useState<number[]>([])
  const [priceInputs3, setPriceInputs3] = useState<number[]>([])
  const [priceInputs4, setPriceInputs4] = useState<number[]>([])
  const [priceInputs5, setPriceInputs5] = useState<number[]>([])
  return (
    <>
      <ScheduleSettingsContainer>
        <PriceContainer>
          <Title>Цена</Title>
          <Description>
            Укажите, когда вам удобно работать. Когда клиенты будут искать коуча на это время, они увидят вашу анкету.
          </Description>
          <PriceListContainer>
            <PriceInputGroup title='Промо сессия (15 минут)' values={priceInputs1} onChange={setPriceInputs1} />
            <PriceInputGroup title='30 минут' values={priceInputs2} onChange={setPriceInputs2} />
            <PriceInputGroup title='45 минут' values={priceInputs3} onChange={setPriceInputs3} />
            <PriceInputGroup title='60 минут' values={priceInputs4} onChange={setPriceInputs4} />
            <PriceInputGroup title='90 минут' values={priceInputs5} onChange={setPriceInputs5} />
          </PriceListContainer>
        </PriceContainer>
      </ScheduleSettingsContainer>
      <CalendarPart />
    </>
  )
}
