import * as React from "react"

import { withGuest } from "@/feature/user/with-guest"

import { PageWrapper } from "../common/PageWrapper"
import { MainWrapper } from "../common/MainWrapper"

import { Header } from "../common/header/Header"
import { Publications } from "../common/publications/Publications"
import { Questions } from "../common/questions/Questions"
import { Footer } from "../common/footer/Footer"

import { publications } from "./data/publications"
import { questions } from "./data/questions"

const LandingClientPageMarkUp = () => (
  <PageWrapper>
    <Header />
    <MainWrapper>
      <Publications publications={publications} />
      <Questions questions={questions} />
    </MainWrapper>
    <Footer />
  </PageWrapper>
)

export const LandingClientPage = withGuest({ to: "/client" })(LandingClientPageMarkUp)
