import { useState } from "react"
import * as React from "react"
import styled from "styled-components"

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
`

export const Label = styled.div`
  font-family: Roboto;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`

const Error = styled.div`
  color: #FF6B00;
  font-size: 12px;
  line-height: 16px;
`

const FormItemRequiredStar = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  color: #FF6B00;
`

type FormItemTypes = {
  label?: string | React.ReactNode
  children?: React.ReactNode
  required?: boolean
  error?: string | null
  className?: string
}

export const FormItem = styled(({ label, children, error, required, ...props }: FormItemTypes) => {
  const [isTouched, changeTouched] = useState(false)

  const showError = error && isTouched

  return (
    <StyledFormItem {...props}>
      <Label>
        {label}&nbsp;{required && <FormItemRequiredStar>*</FormItemRequiredStar>}
      </Label>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null
        return React.cloneElement(child, { error: showError, onBlur: () => changeTouched(true) })
      })}
      {showError && <Error>{error}</Error>}
    </StyledFormItem>
  )
})``
