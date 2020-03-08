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
  margin: 60px auto 0;
  width: 160px;

  @media screen and (max-width: 480px) {
    margin-top: 110px;
  }
`

export const ResetPasswordForm = () => (
  <StyledForm>
    <FormItem label='Пароль'>
      <Input value='' type='password' />
    </FormItem>
    <FormItem label='Повторите пароль'>
      <Input value='' type='password' />
    </FormItem>
    <StyledButton>Изменить</StyledButton>
  </StyledForm>
)
