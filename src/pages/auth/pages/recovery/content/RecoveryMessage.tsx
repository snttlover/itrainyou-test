import * as React from "react"
import styled from "styled-components"
import { $recoveryForm, updateRecoverySuccessMessageVisibility } from "@/pages/auth/pages/recovery/recovery.model"
import { useEvent, useStore } from "effector-react/ssr"

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 63px;
  width: 100%;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 22px;
    line-height: 26px;
    padding-top: 20px;
    margin-bottom: 20px;
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Paragraph = styled.div`
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  &:not(:last-child) {
    padding-bottom: 20px;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
    line-height: 22px;
  }
`

const Link = styled.div`
  color: #4858cc;
  cursor: pointer;
  display: inline;
`

export const RecoveryMessage = () => {
  const form = useStore($recoveryForm)
  const _updateRecoverySuccessMessageVisibility = useEvent(updateRecoverySuccessMessageVisibility)

  return (
    <Container>
      <Title>Письмо на почту отправлено</Title>
      <Paragraph>
        По адресу {form.email} выслано письмо с инструкциями по созданию нового пароля для вашей учетной записи.
      </Paragraph>

      <Paragraph>
        Если вы не видите письма во входящих, проверьте папку со спамом, а также другие папки, в которые это письмо
        могло попасть.
      </Paragraph>

      <Paragraph>
        Или <Link onClick={() => _updateRecoverySuccessMessageVisibility(false)}>отправьте письмо повторно.</Link>
      </Paragraph>
    </Container>
  )
}
