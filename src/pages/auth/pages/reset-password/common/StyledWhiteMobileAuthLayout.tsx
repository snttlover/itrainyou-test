import styled from "styled-components"
import { AuthLayout } from "#/components/layouts/sections/auth/AuthLayout"
import { AuthLogoLink } from "#/components/layouts/sections/auth/AuthLayoutLogo"
import mobileLayoutLogo from "#/components/layouts/sections/auth/images/mobile-logo-with-dark-lines.svg"
import { WhiteContainer } from "#/pages/auth/components/WhiteContainer"

export const WhiteMobileAuthLayout = styled(AuthLayout)`
  ${AuthLogoLink} {
    @media screen and (max-width: 480px) {
      background: url("${mobileLayoutLogo}");
    }
  }
  @media screen and (max-width: 480px) {
    background: #ECEFF1;
  }
`

export const WhiteMobileAuthContainer = styled(WhiteContainer)`
  @media screen and (max-width: 480px) {
    color: #424242;
  }
`
