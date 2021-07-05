import { useEvent, useStore, useStoreMap } from "effector-react"
import React from "react"
import styled from "styled-components"
import {
  $pricesWithFee,
  changePrice,
  Prices
} from "@/pages/coach/schedule/models/price-settings/units"
import { Input } from "@/new-components/input/Input"

const Container = styled.div`
  display: flex;
`

const PriceInput = styled(Input)`
  width: 100%;
  max-width: none;
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

  if (value === undefined) {
    value = price?.value ? price?.value.toString() : ""
  }

  const error = value ? "" : "Необходимо указать цену"

  return (
    <Container className={className}>
      <PriceInput
        label={title}
        placeholder="0"
        type="number"
        loading={price?.isLoading}
        errorText={error}
        value={value!}
        price={true}
        onChange={onChange}
      />
    </Container>
  )
}
