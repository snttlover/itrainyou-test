import * as React from "react"
import styled from "styled-components"
import { Input } from "@/application/components/input/Input"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"

const StyledForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
`

const Label = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
`

const StyledButton = styled(DashedButton)`
  margin: 16px auto 0;
  width: 160px;
  
  @media screen and (max-width: 768px) {
    margin-top: 35px;
  }
`

export const LoginForm = () => (
  <StyledForm>
    <FormInput>
      <Label>Логин</Label>
      <Input value='' />
    </FormInput>
    <FormInput>
      <Label>Пароль</Label>
      <Input value='' type='password' />
    </FormInput>
    <StyledButton>Вход</StyledButton>
  </StyledForm>
)
