import { Icon } from "@/components/icon/Icon"
import { Input, InputTypes } from "@/components/input/Input"
import React, { useState } from "react"
import styled from "styled-components"

const InputPasswordContainer = styled.div`
  position: relative;
  ${Input} {
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

export const PasswordInput = styled(({ className, ...props }: InputTypes) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputPasswordContainer>
      <Input {...props} type={showPassword ? "text" : "password"} />
      <Icon name={showPassword ? "eye-open" : "eye-close"} onClick={() => setShowPassword(!showPassword)} />
    </InputPasswordContainer>
  )
})``
