import * as React from "react"
import styled from "styled-components"
import { updateRecoverySuccessMessageVisibility } from "@/application/pages/auth/pages/recovery/model"

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 63px;
  width: 100%;
  text-align: center;
  color: #424242;

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
  color: #424242;
  &:not(:last-child) {
    padding-bottom: 20px;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
    line-height: 22px;
  }
`

const Link = styled.div`
  color: #2e9dea;
  text-decoration: underline;
  cursor: pointer;
  display: inline;
`

export const RecoveryMessage = () => (
  <Container>
    <Title>Письмо на почту отправлено</Title>
    <Paragraph>
      По адресу rybkalina@gmail.com выслано письмо с инструкциями по созданию нового пароля для вашей учетной записи.
    </Paragraph>

    <Paragraph>
      Если вы не видите письма во входящих, проверьте папку со спамом, а также другие папки, в которые это письмо могло
      попасть.
    </Paragraph>

    <Paragraph>
      Или <Link onClick={() => updateRecoverySuccessMessageVisibility(false)}>отправьте письмо повторно.</Link>
    </Paragraph>
  </Container>
)