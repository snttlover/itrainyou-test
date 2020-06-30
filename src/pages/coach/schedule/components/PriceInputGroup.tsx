import { FormItem } from "@/components/form-item/FormItem"
import { PriceInput } from "@/pages/coach/schedule/components/PriceInput"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
`

const Input = styled(PriceInput)`
  width: 100%;
`

const SummaryPriceFormItem = styled(FormItem)`
  margin-left: 8px;
  flex-shrink: 1.5;
`

type PriceInputGroupType = { title: string; values: number[]; onChange: (values: number[]) => void }

export const PriceInputGroup: React.FC<PriceInputGroupType> = ({ title, values, onChange }) => (
  <Container>
    <FormItem label={title}>
      <Input
        placeholder='0'
        withoutBorder
        type='number'
        value={values[0]?.toString() || ""}
        onChange={value => onChange([value ? parseFloat(value) : 0, values[1]])}
      />
    </FormItem>
    <SummaryPriceFormItem label='Итоговая цена'>
      <Input
        placeholder='0'
        withoutBorder
        type='number'
        value={values[1]?.toString() || ""}
        onChange={value => onChange([values[0], value ? parseFloat(value) : 0])}
      />
    </SummaryPriceFormItem>
  </Container>
)
