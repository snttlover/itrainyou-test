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

const Error = styled.div`
  color: #D5584D;
  font-size: 12px;
  line-height: 16px;
`

type FormItemTypes = {
  label: string | React.ReactNode
  children: React.ReactNode
  error?: string
}

export const FormItem = ({label, children, error}: FormItemTypes) => (
  <StyledFormItem>
    <Label>{label}</Label>
    {React.Children.map(children, child => {
      if (!React.isValidElement(child)) return null
      return React.cloneElement(child, {error})
    })}
    {error && <Error>{error}</Error>}
  </StyledFormItem>
)
