import { AuthLayoutLogo } from "@/application/components/layouts/auth/AuthLayoutLogo"
import { MediaRange } from "@/application/lib/responsive/media"
import { Steps } from "@/application/pages/auth/pages/signup/components/Steps"
import * as React from "react"
import styled from "styled-components"

import mobile from './backgrounds/mobile.svg'
import tablet from './backgrounds/tablet.svg'
import desktop from './backgrounds/desktop.svg'

const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  background: #ECEFF1;
`

const AuthContainer = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  position: relative;
  height: 100%;
`

const Header = styled.div`
  background-image: url(${mobile});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  
  height: 234px;
  width: 100%;

  ${MediaRange.greaterThan("mobile")`
    background-image: url(${tablet});
    height: 370px;
  `}
  ${MediaRange.greaterThan("tablet")`
    background-image: url(${desktop});
    height: 312px;
  `}
`

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  position: relative;
  height: 100%;
`

type Step4ClientLayoutProps = {
  children: React.ReactNode
  renderHeader: () => React.ReactNode
}

export const Step4ClientLayout = (props: Step4ClientLayoutProps) => (
  <StyledLayout>
    <Header>
      <HeaderContent>
        <AuthLayoutLogo />
        <Steps activeId='4'>
          <Steps.Step id='1'>1</Steps.Step>
          <Steps.Step id='2'>2</Steps.Step>
          <Steps.Step id='3'>3</Steps.Step>
          <Steps.Step id='4'>4</Steps.Step>
        </Steps>
        {props.renderHeader()}
      </HeaderContent>
    </Header>
    <AuthContainer>
      {props.children}
    </AuthContainer>
  </StyledLayout>
)
