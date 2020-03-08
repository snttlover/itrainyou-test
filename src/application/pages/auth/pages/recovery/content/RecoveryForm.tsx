import * as React from "react"
import styled from "styled-components"
import { Input } from "@/application/components/input/Input"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { FormItem } from "@/application/components/form-item/FormItem"

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 22px;
  width: 100%;
  text-align: center;
  color: #424242;

  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
    padding-top: 20px;
    margin-bottom: 8px;
  }
`

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 32px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 40px;
    width: calc(100% + 8px);
    margin-left: -4px;
  }
`

const StyledForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledButton = styled(DashedButton)`
  margin: 78px auto 0;
  width: 160px;

  @media screen and (max-width: 768px) {
    margin-top: 35px;
  }
`

export const RecoveryForm = () => (
  <StyledForm>
    <Title>Восстановление пароля</Title>
    <SubTitle>Забыли пароль? Не страшно! Мы отправим вам на почту письмо с инструкциями по сбросу пароля.</SubTitle>
    <FormItem label='Почта'>
      <Input value='' />
    </FormItem>
    <StyledButton>Отправить</StyledButton>
  </StyledForm>
)
