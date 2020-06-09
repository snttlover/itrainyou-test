import React from "react"
import styled from "styled-components"
import { GeneralSettingsForm } from "./content/GeneralSettingsForm"
import { PasswordForm } from "./content/PasswordForm"

const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin-top: 36px;
  padding: 0 24px;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  color: #424242;
`

export const SettingsPage = () => (
  <Container>
    <Title>Настройки</Title>
    <GeneralSettingsForm />
    <PasswordForm />
  </Container>
)
