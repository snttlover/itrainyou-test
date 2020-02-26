import * as React from "react"
import styled from "styled-components"

export const TextBox = styled.input`
  outline: none;
  border: 1px solid #449bd9;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;
  line-height: 22px;

  &::placeholder {
    color: #b3b3b3;
  }
`

type InputTypes = {
  value: string
  placeholder?: string
  onChange?: (value: string) => void
  onFocus?: () => void
}

export const Input = (props: InputTypes) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return <TextBox {...props} onChange={change} />
}
