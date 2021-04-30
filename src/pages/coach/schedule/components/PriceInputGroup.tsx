import { FormItem } from "@/oldcomponents/form-item/FormItem"
import { PriceInput } from "@/pages/coach/schedule/components/PriceInput"
import { useEvent, useStoreMap } from "effector-react"
import React from "react"
import styled from "styled-components"
import { $pricesWithFee, changePrice, Prices } from "@/pages/coach/schedule/models/price-settings/units"

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
  className?: string
  value?: string
  onChange?: (val: string) => void
}

export const PriceInputGroup: React.FC<PriceInputGroupType> = ({
  title, name, className, value, onChange
}) => {
  const price = useStoreMap({
    store: $pricesWithFee,
    keys: [name],
    fn: (prices, [name]) => prices.find(price => price.name === name),
  })

  const priceUpdate = useEvent(changePrice)

  if (!onChange) {
    onChange = (value: string) => priceUpdate({ name, value: parseFloat(value) })
  }

  return (
    <Container className={className}>
      <FormItem label={title}>
        <StyledPriceInput
          placeholder='0'
          type='number'
          loading={price?.isLoading}
          value={value === undefined ? (price?.value ? price?.value.toString() : "") : value}
          onChange={onChange}
        />
      </FormItem>
      {/*<SummaryPriceFormItem label='Итоговая цена'>
        <StyledPriceInput
          placeholder='0'
          withoutBorder
          readOnly
          type='number'
          value={price?.valueWithFee.toString() || ""}
        />
      </SummaryPriceFormItem>*/}
    </Container>
  )
}
