import { useState } from "react"
import * as React from "react"
import styled from "styled-components"

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
`

const Label = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`

const Error = styled.div`
  color: #d5584d;
  font-size: 12px;
  line-height: 16px;
`

export const FormItemRequiredStar = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  
  color: #D5584D;
`

type FormItemTypes = {
  label: string | React.ReactNode
  children: React.ReactNode
  required?: boolean
  error?: string | null
}

export const FormItem = ({ label, children, error, required }: FormItemTypes) => {
  const [isTouched, changeTouched] = useState(false)

  const showError = error && isTouched

  return (
    <StyledFormItem>
      <Label>{label} {required && <FormItemRequiredStar>*</FormItemRequiredStar>}</Label>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null
        return React.cloneElement(child, { error: showError, onBlur: () => changeTouched(true) })
      })}
      {showError && <Error>{error}</Error>}
    </StyledFormItem>
  )
}
