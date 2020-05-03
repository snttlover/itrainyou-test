import * as React from "react"
import styled from "styled-components"
import borderImage from "./images/checkbox-border.svg"
import checkboxActive from "./images/checkbox-active.svg"

const CustomCheckbox = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    transition: all 300ms;
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  &:before {
    background-image: url(${borderImage});
  }
  &:after {
    z-index: 2;
    background-image: url(${checkboxActive});
  }
`

const CheckboxInput = styled.input.attrs({ type: `checkbox` })`
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;

  &:checked ~ ${CustomCheckbox}:after {
    opacity: 1;
    transform: scale(1);
  }

  & ~ ${CustomCheckbox}:after {
    opacity: 0;
    transform: scale(0);
  }
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
  onChange?: (checked: boolean) => void
}

export const Checkbox = (props: CheckboxProps) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.checked)
    }
  }

  return (
    <Label className={props.className}>
      <CheckboxInput checked={props.value} onChange={change} />
      <CustomCheckbox />
      <Content>{props.children}</Content>
    </Label>
  )
}
