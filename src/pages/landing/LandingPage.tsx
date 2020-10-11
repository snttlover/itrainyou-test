import { START } from "@/lib/effector"
import { MediaRange } from "@/lib/responsive/media"
import * as ourCoachesModel from "@/pages/landing/content/our-coaches/model"
import { withGuest } from "@/feature/user/with-guest"
import { LandingTopBar } from "@/pages/landing/LandingTopBar"
import styled from "styled-components"
import { OurCoaches } from "./content/our-coaches/OurCoaches"
import * as React from "react"
import { Layout } from "@/components/layouts/behaviors/default/Layout"
import { Hero } from "./content/hero/Hero"
import { AboutCoach } from "./content/about-coach/AboutCoach"
import { Steps } from "./content/steps/Steps"
import { CoachParams } from "./content/coach-params/CoachParams"
import { PlatformAdvantages } from "./content/platform-advantages/PlatformAdvantages"
import { AllNeedsCoach } from "./content/all-needs-coach/AllNeedsCoach"
import { CoachAdvantages } from "./content/coach-advantages/CoachAdvantages"
import { FAQ } from "./content/faq/FAQ"
import { Footer } from "./content/footer/Footer"

import heroBg from "./assets/hero-bg.svg"
import heroBgTablet from "./assets/hero-bg-tablet.svg"
import heroImg from "./assets/hero-img.svg"
import bottomBg from "./assets/bottom-bg.svg"

const HeroBackground = styled.div`
  background-image: url(${heroBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(581px + 4vw);

  @media screen and (max-width: 768px) {
    height: 441px;
    background-image: url(${heroBgTablet});
  }
`

const HeroImage = styled.div`
  background-image: url(${heroImg});
  background-repeat: no-repeat;
  height: 407px;
  width: 942px;
  position: absolute;
  top: calc(150px - 0.6vw);
  left: 160px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const StyledLayout = styled(Layout)`
  background-color: #fff;
`

const Container = styled.div`
  height: 581px;

  @media screen and (max-width: 768px) {
    height: 441px;
  }
`

const RelativeContainer = styled.div`
  position: absolute;
  max-width: 1080px;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
`

const BottomBackgroundContainer = styled.div`
  background-image: url(${bottomBg});
  background-repeat: repeat-x;
  background-position: 400px 0;

  padding-top: 200px;

  @media screen and (max-width: 768px) {
    padding-top: 200px;
    background-position: 200px 0;
  }
`

const LandingPageMarkup = () => (
  <StyledLayout>
    <Container>
      <HeroBackground />
      <RelativeContainer>
        <HeroImage />
      </RelativeContainer>
      <LandingTopBar />
      <Hero />
    </Container>
    <AboutCoach />
    <Steps />
    <CoachParams />
    <OurCoaches />
    <PlatformAdvantages />
    <BottomBackgroundContainer>
      <AllNeedsCoach />
      <CoachAdvantages />
      <FAQ />
    </BottomBackgroundContainer>
    <Footer />
  </StyledLayout>
)

export const LandingPage = withGuest({ to: "/client" })(LandingPageMarkup)

LandingPage[START] = ourCoachesModel.loadCoaches
