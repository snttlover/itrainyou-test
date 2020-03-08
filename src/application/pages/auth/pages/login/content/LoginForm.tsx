import * as React from "react"
import styled from "styled-components"
import { Input } from "@/application/components/input/Input"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { FormItem } from "@/application/components/form-item/FormItem"

const StyledForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
    <FormItem label='Логин'>
      <Input value='' />
    </FormItem>
    <FormItem label='Пароль'>
      <Input value='' type='password' />
    </FormItem>
    <StyledButton>Вход</StyledButton>
  </StyledForm>
)
