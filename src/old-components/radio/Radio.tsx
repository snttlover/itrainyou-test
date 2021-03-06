import * as React from "react"
import styled from "styled-components"
import { createContext } from "react"
import borderImageClient from "./images/border-image-client.svg"
import radioBoxActiveClient from "./images/active-client.svg"
import borderImageCoach from "./images/border-image-coach.svg"
import radioBoxActiveCoach from "./images/active-coach.svg"

const RadioContext = createContext<any>({})

type RadioBoxValueType = string | number | null

type RadioGroupTypes = {
  value?: RadioBoxValueType
  name: string
  onChange: (value: any) => void
  children: React.ReactNode | React.ReactNode[]
}

export const RadioGroup = (props: RadioGroupTypes) => {
  const context = {
    value: props.value,
    name: props.name,
    onChange: props.onChange,
  }

  return <RadioContext.Provider value={context}>{props.children}</RadioContext.Provider>
}

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
`

const CustomRadio = styled.div`
  width: 22px;
  height: 22px;
  position: relative;
  margin-right: 4px;
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
    background-image: url(${props => props.theme.type === "client" ? `${borderImageClient}` : `${borderImageCoach}`});
  }
  &:after {
    z-index: 2;
    background-image: url(${props => props.theme.type === "client" ? `${radioBoxActiveClient}` : `${radioBoxActiveCoach}`});
  }
`

const RadioInput = styled.input.attrs({ type: "radio" })`
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;

  & ~ ${CustomRadio}:after {
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transform: scale(${({ checked }) => (checked ? 1 : 0)});
  }
`

type RadioOptionTypes = {
  value: RadioBoxValueType
  children: React.ReactNode
  className?: string
}

export const RadioOption = (props: RadioOptionTypes) => (
  <RadioContext.Consumer>
    {(radioGroup: any) => (
      <StyledLabel className={props.className}>
        <RadioInput
          name={radioGroup.name}
          checked={radioGroup.value === props.value}
          onChange={() => radioGroup.onChange(props.value)}
        />
        <CustomRadio />
        {props.children}
      </StyledLabel>
    )}
  </RadioContext.Consumer>
)
