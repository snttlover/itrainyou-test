import { AuthLayoutLogo } from "@/application/components/layouts/auth/AuthLayoutLogo"
import { MediaRange } from "@/application/lib/responsive/media"
import { Steps } from "@/application/pages/auth/pages/signup/components/Steps"
import * as React from "react"
import styled from "styled-components"

const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  background: #fff; 
`

const AuthContainer = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  position: relative;
  height: 100%;
`

const Header = styled.div`
  background: linear-gradient(240deg, #a3cff3 14.5%, rgba(255, 255, 255, 0) 85.5%), #9f8dc1;
  height: 416px;
  width: 100%;

  ${MediaRange.greaterThan("mobile")`
    height: 369px;
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

export const Step4CouchLayout = (props: Step4ClientLayoutProps) => (
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
