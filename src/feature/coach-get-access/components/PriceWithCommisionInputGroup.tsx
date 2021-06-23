import { FormItem } from "@/oldcomponents/form-item/FormItem"
import { PriceInput } from "@/pages/coach/schedule/components/PriceInput"
import { $pricesWithoutFee,changePrice, Prices } from "@/feature/coach-get-access/coach-get-access.model"
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
    border-radius: 8px;
`

const SummaryPriceFormItem = styled(FormItem)`
  margin-left: 8px;
`

type PriceInputGroupType = {
    title: string
    name: keyof Prices
}

export const PriceWithoutCommissionInput: React.FC<PriceInputGroupType> = ({ title, name }) => {
  const price = useStoreMap({
    store: $pricesWithoutFee,
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
            priceUpdate({ name, value: !!value ? parseFloat(value) : 0 })
          }}
        />
      </FormItem>
      <SummaryPriceFormItem label='Вы получите'>
        <StyledPriceInput
          placeholder='0'
          withoutBorder
          readOnly
          type='number'
          value={price?.valueWithoutFee.toString() || ""}
        />
      </SummaryPriceFormItem>
    </Container>
  )
}