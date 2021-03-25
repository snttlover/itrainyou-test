import * as React from "react"
import styled from "styled-components"
import { GeneralSettingsForm } from "./content/general-settings-form/GeneralSettingsForm"
import { PasswordForm } from "./content/PasswordForm"
import { MediaRange } from "@/lib/responsive/media"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { useStore } from "effector-react"
import { Loader } from "@/components/spinner/Spinner"
import { LeftPageContainer } from "@/pages/common/settings/content/LeftPageContainer"
import { ContentContainer } from "@/components/layouts/ContentContainer"

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  color: #424242;
  ${MediaRange.lessThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

const StyledLoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  background: #F4F5F7;
  left: 0;
  top: 0;
`

const AcceptionText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #424242;

  max-width: 738px;
  margin-top: 60px;
    
  & a {
    color: #424242;
    font-weight: 500;
    text-decoration: underline;
  }

    ${MediaRange.lessThan("mobile")`
    margin-top: 45px;
  `}
`

export const SettingsPage = () => {
  const pending = useStore(getMyUserFx.pending)
  return (
    <ContentContainer>
      <LeftPageContainer>
        {pending && (
          <StyledLoaderWrapper>
            <Loader />
          </StyledLoaderWrapper>
        )}
        <Title>Настройки</Title>
        <GeneralSettingsForm />
        <PasswordForm />
        <AcceptionText>
          <a href='/privacy_policy.pdf' target='_blank'>Политика конфиденциальности</a>,{" "}
          <a href='/personal_data.pdf' target='_blank'>Политика по обработке персональных данных</a>,{" "}
          <a href='/oferta.pdf' target='_blank'>Оферта</a>
        </AcceptionText>
      </LeftPageContainer>
    </ContentContainer>
  )
}

export default SettingsPage
