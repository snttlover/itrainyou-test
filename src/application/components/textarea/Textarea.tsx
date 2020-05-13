import * as React from "react"
import styled from "styled-components"

const StyledTextarea = styled.textarea<{ error?: boolean; withoutBorder?: boolean }>`
  outline: none;
  border: ${({ withoutBorder, error }) =>
    withoutBorder ? "1px solid transparent" : `1px solid ${error ? "#FF6B00" : "#D3D7F3"}`};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 16px;
  line-height: 22px;
  caret-color: #3746b0;

  &:hover {
    border: 1px solid #919be0;
  }
  &::placeholder {
    color: #b3b3b3;
  }
  &:focus {
    border: 1px solid #919be0;
  }
`

type InputTypes = {
  value: string
  placeholder?: string
  withoutBorder?: boolean
  type?: string
  className?: string
  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  error?: boolean
  rows?: number
  columns?: number
}

export const Textarea = styled((props: InputTypes) => {
  const change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return <StyledTextarea {...props} onChange={change} />
})``
