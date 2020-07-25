import * as React from "react"
import MaskedInput from "react-maskedinput"
import styled from "styled-components"

const TextBox = styled.input<{ error?: boolean; withoutBorder?: boolean }>`
  outline: none;
  border: ${({ withoutBorder, error }) =>
    withoutBorder ? "1px solid transparent" : `1px solid ${error ? "#FF6B00" : "#D3D7F3"}`};
  box-sizing: border-box;
  border-radius: 2px;
  padding: 5px 8px;
  font-size: 16px;
  line-height: 22px;
  caret-color: #3746b0;
  color: #424242;

  &:hover {
    border: 1px solid #919be0;
  }
  &::placeholder {
    color: #b3b3b3;
  }
  &:focus {
    border: 1px solid #919be0;
  }
  &:read-only {
    opacity: 0.8;
    cursor: default;

    &:hover {
      border: 1px solid transparent;
    }
    &:focus {
      border: 1px solid transparent;
    }
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`

export type InputTypes = {
  name?: string
  value: string
  readOnly?: boolean
  placeholder?: string
  withoutBorder?: boolean
  type?: string
  className?: string
  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent) => void
  onBlur?: (e: React.FocusEvent) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  error?: boolean
  mask?: string
}

export const Input = styled((props: InputTypes) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return <TextBox as={props.mask ? MaskedInput : "input"} {...props} onChange={change} />
})``
