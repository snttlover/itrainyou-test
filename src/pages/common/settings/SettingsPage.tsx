import * as React from "react"
import styled from "styled-components"
import { GeneralSettingsForm } from "./content/general-settings-form/GeneralSettingsForm"
import { PasswordForm } from "./content/PasswordForm"
import { MediaRange } from "@/lib/responsive/media"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { useStore } from "effector-react/ssr"
import { Loader } from "@/components/spinner/Spinner"

const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin-top: 36px;
  padding: 0 24px 20px;
  position: relative;
  ${MediaRange.lessThan(`tablet`)`
    margin: 40px auto 0;
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

const StyledLoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  background: #eee;
  left: 0;
  top: 0;
`

export const SettingsPage = () => {
  const pending = useStore(getMyUserFx.pending)
  return (
    <Container>
      {pending && (
        <StyledLoaderWrapper>
          <Loader />
        </StyledLoaderWrapper>
      )}
      <Title>Настройки</Title>
      <GeneralSettingsForm />
      <PasswordForm />
    </Container>
  )
}

export default SettingsPage
