import * as React from "react"
import styled from "styled-components"
import borderImage from "./checkbox-border.svg"
import checkboxActive from "./checkbox-active.svg"

type CheckboxInputTypes = {
  checked: boolean
}

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

const CheckboxInput = styled.input.attrs({ type: `checkbox` })<CheckboxInputTypes>`
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;

  & ~ ${CustomCheckbox}:after {
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transform: scale(${({ checked }) => (checked ? 1 : 0)});
  } 
`

const Label = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  flex: 1;
`

type CheckboxProps = {
  children: React.ReactNode,
  onChange: (checked: boolean) => void,
  value: boolean
}

export const Checkbox = (props: CheckboxProps) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(e.target.checked)
  }

  return (
    <Label>
      <CheckboxInput checked={props.value} onChange={change} />
      <CustomCheckbox />
      <Content>{props.children}</Content>
    </Label>
  )
}
