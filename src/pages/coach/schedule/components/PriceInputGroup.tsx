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

type PriceInputGroupType = { title: string }

export const PriceInputGroup: React.FC<PriceInputGroupType> = ({ title }) => (
  <Container>
    <FormItem label={title}>
      <Input placeholder='0' withoutBorder />
    </FormItem>
    <SummaryPriceFormItem label='Итоговая цена'>
      <Input placeholder='0' withoutBorder />
    </SummaryPriceFormItem>
  </Container>
)
