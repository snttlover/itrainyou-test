import { CalendarPart } from "@/pages/coach/schedule/components/CalendarPart"
import { PriceInputGroup } from "@/pages/coach/schedule/components/PriceInputGroup"
import { $priceForm, changePrice } from "@/pages/coach/schedule/price-settings.model"
import { useEvent, useStore } from "effector-react/ssr"
import React from "react"
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
  const $prices = useStore($priceForm)
  const updatePrice = useEvent(changePrice)
  return (
    <>
      <ScheduleSettingsContainer>
        <PriceContainer>
          <Title>Цена</Title>
          <Description>
            Укажите, когда вам удобно работать. Когда клиенты будут искать коуча на это время, они увидят вашу анкету.
          </Description>
          <PriceListContainer>
            <PriceInputGroup
              title='Промо сессия (15 минут)'
              values={$prices.promo}
              onChange={values => updatePrice({ promo: values })}
            />
            <PriceInputGroup
              title='30 минут'
              values={$prices.price30}
              onChange={values => updatePrice({ price30: values })}
            />
            <PriceInputGroup
              title='45 минут'
              values={$prices.price45}
              onChange={values => updatePrice({ price45: values })}
            />
            <PriceInputGroup
              title='60 минут'
              values={$prices.price60}
              onChange={values => updatePrice({ price60: values })}
            />
            <PriceInputGroup
              title='90 минут'
              values={$prices.price90}
              onChange={values => updatePrice({ price90: values })}
            />
          </PriceListContainer>
        </PriceContainer>
      </ScheduleSettingsContainer>
      <CalendarPart />
    </>
  )
}
