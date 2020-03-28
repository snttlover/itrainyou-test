import * as React from "react"
import styled from "styled-components"

const TextBox = styled.input<{ error?: boolean }>`
  outline: none;
  border: 1px solid ${({ error }) => (error ? "#D5584D" : "#B3B3B3")};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 16px;
  line-height: 22px;
  caret-color: #449bd9;

  &:hover {
    border: 1px solid #424242;
  }
  &::placeholder {
    color: #b3b3b3;
  }
  &:focus {
    border: 1px solid #449bd9;
  }
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`

type InputTypes = {
  value: string
  placeholder?: string
  type?: string
  className?: string
  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  error?: boolean
}

export const Input = styled((props: InputTypes) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return <TextBox {...props} onChange={change} />
})``
