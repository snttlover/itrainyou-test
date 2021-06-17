import * as React from "react"
import styled from "styled-components"
import { Icon, IconName } from "../icon/Icon"

export const StyledCheckbox = styled(Icon)<{ color?: string }>`
  width: 24px;
  height: 24px;
  position: relative;
  fill: ${({ color, theme }) => color || theme.colors.primary};
`

const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
`

const Label = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`

export const CheckboxContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 19px;
`

type CheckboxProps = {
  children?: React.ReactNode | React.ReactNode[]
  value: boolean
  className?: string
  color?: string
  filled?: boolean
  onChange?: (checked: boolean) => void
}

export const Checkbox = styled(({ value, onChange, color, filled, ...props }: CheckboxProps) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked)
    }
  }

  return (
    <Label className={props.className}>
      <CheckboxInput checked={value} onChange={change} />
      <StyledCheckbox color={color} name={value ? 
        (filled ? "checkbox-active-filled-border" : "checkbox-active") 
        : (filled ? "checkbox-border-filled" : "checkbox-border")} />
      <CheckboxContent>{props.children}</CheckboxContent>
    </Label>
  )
})``
