import React from "react"
import styled from "styled-components"
import {FormItem} from "@/application/components/form-item/FormItem"
import {Input} from "@/application/components/input/Input"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"

const StyledForm = styled.form`
  width: 100%;
  margin-top: 24px;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 20px;
`

const StyledFormItem = styled(FormItem)`
  margin-bottom: 20px;
`

export const GeneralSettingsForm = () => (
  <StyledForm>
    <Title>Общие</Title>
    <StyledFormItem label='Почта'>
      <Input value='' />
    </StyledFormItem>
    <StyledFormItem label='Часовой пояс'>
      <Input value='' />
    </StyledFormItem>
    <DashedButton slim>Сохранить изменения</DashedButton>
  </StyledForm>
)
