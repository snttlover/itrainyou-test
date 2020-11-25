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
import { DashboardContainer } from "@/components/layouts/behaviors/dashboards/common/DashboardContainer"
import { DashboardContent } from "@/components/layouts/behaviors/dashboards/common/DashboardPageContent"
import { DashboardPageWrapper } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageWrapper"
import { PageContainer } from "@/components/page-container/PageContainer"

import heroBg from "./assets/hero-bg.svg"
import heroBgTablet from "./assets/hero-bg-tablet.svg"
import heroBgMobile from "./assets/hero-bg-mobile.svg"
import heroImg from "./assets/hero-img.svg"
import bottomBg from "./assets/bottom-bg.svg"
import mobileFooterTopBg from "./assets/mobile-footer-top-bg.svg"


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

  @media screen and (max-width: 480px) {
    height: 495px;
    background-image: url(${heroBgMobile});
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
  @media screen and (max-width: 585px) {
    margin-top: 74px;
    padding-top: 0;
    background-position: 200px 0;
  }
`

const MobileBeautyImage = styled.img.attrs({ src: mobileFooterTopBg })`
  width: 100%;
  @media screen and (min-width: 585px) {
    display: none;
  }
`

const IsMobile = styled.div`
  display: none;
  @media screen and (max-width: 585px) {
    display: unset;
  }
`

const IsNotMobile = styled.div`
  @media screen and (max-width: 585px) {
    display: none;
  }
`

const StyledPageContainer = styled(PageContainer)`
  display: flex;
  max-width: none;
`

const ContentWrapper = styled.div`
  flex: 1;
`

const Dashboard = () => (
  <DashboardContainer>
    <DashboardContent>
      <HeroBackground />
      <LandingTopBar />
      <DashboardPageWrapper>
        <StyledPageContainer>
          <ContentWrapper>
            <LandingPageMarkup />
          </ContentWrapper>
        </StyledPageContainer>
      </DashboardPageWrapper>
    </DashboardContent>
  </DashboardContainer>
)


const LandingPageMarkup = () => (
  <StyledLayout>
    <Container>
      <HeroBackground />
      <RelativeContainer>
        <HeroImage />
      </RelativeContainer>
      <Hero />
    </Container>
    <AboutCoach />
    <Steps />
    <CoachParams />
    <OurCoaches />
    <PlatformAdvantages />
    <IsMobile>
      <CoachAdvantages />
    </IsMobile>
    <BottomBackgroundContainer>
      <MobileBeautyImage />
      <AllNeedsCoach />
      <IsNotMobile>
        <CoachAdvantages />
      </IsNotMobile>
      <FAQ />
    </BottomBackgroundContainer>
    <Footer />
  </StyledLayout>
)

export const LandingPage = withGuest({ to: "/client" })(Dashboard)

LandingPage[START] = ourCoachesModel.loadCoaches
