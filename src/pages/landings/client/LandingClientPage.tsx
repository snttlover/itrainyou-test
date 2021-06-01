import * as React from "react"

import { routeNames } from "@/pages/route-names"

import { withGuest } from "@/feature/user/with-guest"

import { PageWrapper } from "../common/PageWrapper"
import { MainWrapper } from "../common/MainWrapper"

import { Header } from "../common/header/Header"
import { Hero } from "./content/Hero"
import { Advantages } from "./content/Advantages"
import { Publications } from "../common/publications/Publications"
import { Questions } from "../common/questions/Questions"
import { Footer } from "../common/footer/Footer"

import { advantages } from "./data/advantages"
import { publications } from "./data/publications"
import { questions } from "./data/questions"

const LandingClientPageMarkUp = () => (
  <PageWrapper>
    <Header signUpRoute={routeNames.signup("1")} />
    <MainWrapper>
      <Hero />
      <Advantages advantages={advantages} />
      <Publications publications={publications} />
      <Questions questions={questions} />
    </MainWrapper>
    <Footer />
  </PageWrapper>
)

export const LandingClientPage = withGuest({ to: "/client" })(LandingClientPageMarkUp)
