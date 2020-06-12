import React from "react"
import styled from "styled-components"
import { GeneralSettingsForm } from "./content/general-settings-form/GeneralSettingsForm"
import { PasswordForm } from "./content/PasswordForm"
import { LogoutButton } from "@/application/pages/common/settings/content/LogoutButton"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin-top: 36px;
  padding: 0 24px;
  ${MediaRange.lessThan(`tablet`)`
    margin: 0 auto;
    margin-top: 28px;
  `}
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  color: #424242;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 20px;
    line-height: 26px;
  `}
`

export const SettingsPage = () => (
  <Container>
    <Title>Настройки</Title>
    <GeneralSettingsForm />
    <PasswordForm />
    <LogoutButton />
  </Container>
)

export default SettingsPage
