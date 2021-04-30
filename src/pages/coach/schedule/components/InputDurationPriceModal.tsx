import { useEvent, useStore } from "effector-react"
import React, { useState } from "react"
import styled from "styled-components"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { MediaRange } from "@/lib/responsive/media"
import { PriceInputGroup } from "@/pages/coach/schedule/components/PriceInputGroup"
import { Button } from "@/oldcomponents/button/normal/Button"
import { changePrice, Prices } from "@/pages/coach/schedule/models/price-settings/units"
import {
  $feeRatio,
  $inputDurationPriceModelDuration,
  $isInputDurationPriceModalShowed
} from "@/pages/coach/schedule/models/schedule/units"


const StyledDialog = styled(Dialog)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  align-self: flex-end;
  width: 120px;
  height: 40px;
  margin-top: 24px;
  
  ${MediaRange.lessThan("mobile")`
    width: 256px;
  `}
`

const StyledPriceInputGroup = styled(PriceInputGroup)`
  margin-top: 16px;
`

const Title = styled.h1`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  text-align: left;
  color: #424242;
  
  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

const Description = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  margin-top: 8px;
  color: #5B6670;
`

const Fee = styled.span`
  font-weight: bold;
`

export const InputDurationPriceModal = () => {
  const feeRatio = useStore($feeRatio)
  const visibility = useStore($isInputDurationPriceModalShowed)
  const duration = useStore($inputDurationPriceModelDuration)

  let title = ""
  let name: keyof Prices = "d30Price"
  if (duration === "D30") {
    title = "30 минут"
    name = "d30Price"
  }
  if (duration === "D45") {
    title = "45 минут"
    name = "d45Price"
  }
  if (duration === "D60") {
    title = "60 минут"
    name = "d60Price"
  }
  if (duration === "D90") {
    title = "90 минут"
    name = "d90Price"
  }

  const [priceValue, setPriceValue] = useState("")
  const priceUpdate = useEvent(changePrice)

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <StyledDialog value={visibility} onChange={() => {}} notClosable>
      <Title>Назначьте цену за сессию</Title>
      <Description>
        С учётом комиссии платформы цена для клиента будет на <Fee>{feeRatio*100}%</Fee> выше названной вами
      </Description>
      <StyledPriceInputGroup title={title} name={name} onChange={setPriceValue} value={priceValue}/>
      <StyledButton
        onClick={() => priceUpdate({name, value: parseFloat(priceValue)})}
        disabled={!priceValue}
      >
        Сохранить
      </StyledButton>
    </StyledDialog>
  )
}
