import * as React from "react"
import styled from "styled-components"

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
`

const Label = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
`

type FormItemTypes = {
  label: string | React.ReactNode
  children: React.ReactNode | React.ReactNode[]
}

export const FormItem = (props: FormItemTypes) => (
  <StyledFormItem>
    <Label>{props.label}</Label>
    {props.children}
  </StyledFormItem>
)
