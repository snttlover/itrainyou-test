import * as React from "react"
import styled from "styled-components"
import { Icon, IconName } from "../icon/Icon"

type StyledCheckboxTypes = {
  color?: string
}

const StyledCheckbox = (name: IconName, color?: string) => styled(Icon).attrs({ name })<StyledCheckboxTypes>`
  width: 24px;
  height: 24px;
  position: relative;
  fill: ${color || `#000`};
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

const Content = styled.div`
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

export const Checkbox = (props: CheckboxProps) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.checked)
    }
  }

  const CheckboxIcon = StyledCheckbox(props.value ? `checkbox-border` : `checkbox-active`, props.color)

  return (
    <Label className={props.className}>
      <CheckboxInput checked={props.value} onChange={change} />
      <CheckboxIcon />
      <Content>{props.children}</Content>
    </Label>
  )
}
