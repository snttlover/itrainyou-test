import { START } from "#/lib/effector"
import * as ourCoachesModel from "#/pages/landing/content/our-coaches/model"
import { useEvent } from "effector-react/ssr"
import { useEffect } from "react"
import { withGuest } from "#/feature/user/with-guest"
import { OurCoaches } from "./content/our-coaches/OurCoaches"
import * as React from "react"
import { Layout } from "#/components/layouts/behaviors/default/Layout"
import { TopBar } from "./content/top-bar/TopBar"
import { Hero } from "./content/hero/Hero"
import { AboutCoach } from "./content/about-coach/AboutCoach"
import { Benefits } from "./content/benefits/Benefits"
import { Steps } from "./content/steps/Steps"
import { CoachParams } from "./content/coach-params/CoachParams"
import { PlatformAdvantages } from "./content/platform-advantages/PlatformAdvantages"
import { AllNeedsCoach } from "./content/all-needs-coach/AllNeedsCoach"
import { CoachAdvantages } from "./content/coach-advantages/CoachAdvantages"
import { FAQ } from "./content/faq/FAQ"
import { Footer } from "./content/footer/Footer"

const LandingPageMarkup = () => {
  return (
    <Layout>
      <TopBar />
      <Hero />
      <AboutCoach />
      <Benefits />
      <Steps />
      <CoachParams />
      <OurCoaches />
      <PlatformAdvantages />
      <AllNeedsCoach />
      <CoachAdvantages />
      <FAQ />
      <Footer />
    </Layout>
  )
}

export const LandingPage = withGuest({ to: "/client" })(LandingPageMarkup)

LandingPage[START] = ourCoachesModel.loadCoaches
