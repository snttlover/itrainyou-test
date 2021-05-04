import * as React from "react"
import MaskedInput from "react-maskedinput"
import styled from "styled-components"
import { Icon } from "@/oldcomponents/icon/Icon"
import { useState } from "react"
import { Loader } from "@/oldcomponents/spinner/Spinner"

const TextBox = styled.input<{ error?: string | null | false; withoutBorder?: boolean; maxWidth?: string}>`
  outline: none;
  border: ${({ withoutBorder, error }) =>
    withoutBorder ? "1px solid transparent" : `1px solid ${error ? "#FF6B00" : "#D3D7F3"}`};
  box-sizing: border-box;
  border-radius: 8px;
  background: white;
  padding: 5px 8px;
  font-size: 16px;
  line-height: 24px;
  caret-color: #3746b0;
  color: #424242;
  resize: none;
  overflow: hidden;

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

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
`

export const Label = styled.div<{error?: boolean}>`
  font-family: Roboto;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  margin-bottom: 2px;
  color: ${({ error }) => error ? "#FF6B00" : "unset"};  
`

const UnderText = styled.div<{error?: boolean}>`
  color: ${({ error }) => error ? "#FF6B00" : "#FF6B00"};
  font-size: 12px;
  line-height: 18px;
`

const FormItemRequiredStar = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  color: #ff6b00;
`

const StyledLoader = styled(Loader)`
  width: 100px;
  height: 100px;
  position: relative;
  right: -40px;
`

const RubbleSign = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  color: #9aa0a6;
  transform: translate(0, -50%);
  user-select: none;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;
`

type FormItemTypes = {
    label?: string | React.ReactNode
    children?: React.ReactNode
    required?: boolean
    error?: string | null | boolean
    className?: string
}

export type InputTypes = {
    name?: string
    label?: string
    price?: boolean
    value: string
    readOnly?: boolean
    placeholder?: string
    withoutBorder?: boolean
    maxWidth?: string
    type?: string
    className?: string
    onChange?: (value: string) => void
    onFocus?: (e: React.FocusEvent) => void
    onBlur?: (e: React.FocusEvent) => void
    onKeyDown?: (e: React.KeyboardEvent) => void
    errorText?: string | null | boolean
    mask?: string
    required?: boolean
    reff?: React.RefObject<any>
    loading?: boolean
}

export const InnerInput = styled((props: InputTypes) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }
  return <TextBox {...props} onChange={change} ref={props.reff} />
})``

const InputPasswordContainer = styled.div<{maxWidth?: string}>`
  position: relative;
  
  ${InnerInput} {
    width: 100%;
  }

  ${Icon} {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translate(0, -50%);
    width: 24px;
    height: 24px;
    fill: #4858cc;
    cursor: pointer;
  }
`

const LabelItem = styled(({ label, children, error, required, ...props }: FormItemTypes) => {
  return (
    <StyledFormItem {...props}>
      {label && <Label error={!!error}>
        {label}&nbsp;{required && <FormItemRequiredStar>*</FormItemRequiredStar>}
      </Label>}
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null
        return React.cloneElement(child, { error: typeof error === "string" })
      })}
      {typeof error === "string" && <UnderText error>{error}</UnderText>}
    </StyledFormItem>
  )
})``

export const Input = styled(({ className, label, errorText, price, mask, loading, ...props }) => {
  const [showPassword, setShowPassword] = useState(true)

  const handleOnClick = () => {
    setShowPassword(!showPassword)
  }

  return (
    <LabelItem label={label} error={errorText} className={className}>
      <InputPasswordContainer maxWidth={props.maxWidth}>
        <InnerInput {...props} type={showPassword ? "text" : "password"} />
        {price ?
          <>
            <RubbleSign>{loading ? <StyledLoader /> : "₽"}</RubbleSign>
          </>: null}
        {mask? <Icon name={showPassword ? "eye-open" : "eye-close"} onClick={handleOnClick} /> : null}
      </InputPasswordContainer>
    </LabelItem>
  )
})``