import { FormItem } from "#/components/form-item/FormItem"
import { PriceInput } from "#/pages/coach/schedule/components/PriceInput"
import { $pricesWithFee, changePrice, Prices } from "#/pages/coach/schedule/models/price-settings.model"
import { useEvent, useStoreMap } from "effector-react/ssr"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
`

const StyledPriceInput = styled(PriceInput)`
  width: 100%;
`

const SummaryPriceFormItem = styled(FormItem)`
  margin-left: 8px;
  flex-shrink: 1.5;
`

type PriceInputGroupType = {
  title: string
  name: keyof Prices
}

export const PriceInputGroup: React.FC<PriceInputGroupType> = ({ title, name }) => {
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
      <SummaryPriceFormItem label='Итоговая цена'>
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
