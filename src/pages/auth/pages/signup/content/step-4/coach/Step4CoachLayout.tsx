import { AuthLayoutLogo } from "@/oldcomponents/layouts/sections/auth/AuthLayoutLogo"
import { MediaRange } from "@/lib/responsive/media"
import { Steps } from "@/pages/auth/pages/signup/components/Steps"
import bgImage from "@/pages/auth/pages/signup/content/step-4/coach/backgrounds/bg-image.svg"
import desktop from "./backgrounds/desktop.svg"
import mobile from "./backgrounds/mobile.svg"
import tablet from "./backgrounds/tablet.svg"
import * as React from "react"
import styled from "styled-components"

const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  background: #F4F5F7;
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

  height: 292px;
  width: 100%;

  ${MediaRange.greaterThan("mobile")`
    background-image: url(${tablet});
    height: 370px;
  `}
  ${MediaRange.greaterThan("laptop")`
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

const BGImage = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  width: 329.35px;
  height: 589px;
  left: 0;
  top: 356px;
  display: none;

  ${MediaRange.greaterThan("laptop")`
    display: block;
  `}
`

type Step4ClientLayoutProps = {
  children: React.ReactNode
  renderHeader: () => React.ReactNode
}

export const Step4CoachLayout = (props: Step4ClientLayoutProps) => (
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
    <BGImage />
    <AuthContainer>{props.children}</AuthContainer>
  </StyledLayout>
)
