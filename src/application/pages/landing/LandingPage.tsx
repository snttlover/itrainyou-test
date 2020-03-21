import { OurCoaches } from "@/application/pages/landing/content/our-coaches/OurCoaches"
import { loadCategories } from "@app/lib/categories/categories.store"
import { loadCoaches } from "./content/our-coaches/model"
import { AsyncDataOptions } from "@/application/routes"
import { allSettled } from "effector/fork"
import * as React from "react"
import { Layout } from "@/application/components/layouts/default/Layout"
import { TopBar } from "./content/top-bar/TopBar"
import { Hero } from "./content/hero/Hero"
import { AboutCoach } from "./content/about-coach/AboutCoach"
import { Benefits } from "./content/benefits/Benefits"
import { Steps } from "@/application/pages/landing/content/steps/Steps"
import { CoachParams } from "@/application/pages/landing/content/coach-params/CoachParams"
import { PlatformAdvantages } from "@/application/pages/landing/content/platform-advantages/PlatformAdvantages"
import { AllNeedsCoach } from "@/application/pages/landing/content/all-needs-coach/AllNeedsCoach"
import { CoachAdvantages } from "@/application/pages/landing/content/coach-advantages/CoachAdvantages"
import { FAQ } from "@/application/pages/landing/content/faq/FAQ"
import { Footer } from "@/application/pages/landing/content/footer/Footer"

export const LandingPage = () => (
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

LandingPage.asyncData = async ({ scope }: AsyncDataOptions) => {
  await Promise.all([
    allSettled(loadCoaches, {
      scope,
      params: undefined
    }),
    allSettled(loadCategories, {
      scope,
      params: undefined
    })
  ])
}
