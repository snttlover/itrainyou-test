import { FormItem } from "@/components/form-item/FormItem"
import { PriceInput } from "@/pages/coach/schedule/components/PriceInput"
import { $pricesWithFee,changePrice, Prices } from "@/feature/coach-get-access/coach-get-access.model"
import { useEvent, useStoreMap } from "effector-react"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    max-width: 360px;
`

const StyledPriceInput = styled(PriceInput)`
    width: 100%;
    border: 1px solid #D3D7F3;
`

const SummaryPriceFormItem = styled(FormItem)`
  margin-left: 8px;
`

type PriceInputGroupType = {
    title: string
    name: keyof Prices
}

export const PriceWithCommisionInput: React.FC<PriceInputGroupType> = ({ title, name }) => {
  const price = useStoreMap({
    store: $pricesWithFee,
    keys: [name],
    fn: (prices, [name]) => prices.find(price => price.name === name),
  })

  const priceUpdate = useEvent(changePrice)

  return (
    <Container>
      <FormItem label={title}>
        <StyledPriceInput
          placeholder='0'
          withoutBorder
          type='number'
          loading={price?.isLoading}
          value={price?.value.toString() || ""}
          onChange={value => {
            priceUpdate({ name, value: parseFloat(value) })
          }}
        />
      </FormItem>
      <SummaryPriceFormItem label='Цена для клиента'>
        <StyledPriceInput
          placeholder='0'
          withoutBorder
          readOnly
          type='number'
          value={price?.valueWithFee.toString() || ""}
        />
      </SummaryPriceFormItem>
    </Container>
  )
}