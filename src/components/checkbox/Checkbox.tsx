import * as React from "react"
import styled from "styled-components"
import { Icon, IconName } from "../icon/Icon"

const StyledCheckbox = styled(Icon)<{ color?: string }>`
  width: 24px;
  height: 24px;
  position: relative;
  fill: ${({ color, theme }) => color || theme.colors.primary};
`

const CheckboxInput = styled.input.attrs({ type: `checkbox` })`
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
`

type CheckboxProps = {
  children?: React.ReactNode | React.ReactNode[]
  value: boolean
  className?: string
  color?: string
  onChange?: (checked: boolean) => void
}

export const Checkbox = styled(({ value, onChange, color, ...props }: CheckboxProps) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked)
    }
  }

  return (
    <Label className={props.className}>
      <CheckboxInput checked={value} onChange={change} />
      <StyledCheckbox color={color} name={value ? `checkbox-active` : `checkbox-border`} />
      <CheckboxContent>{props.children}</CheckboxContent>
    </Label>
  )
})``
