import * as React from "react"

import { withGuest } from "@/feature/user/with-guest"

import { PageWrapper } from "../common/PageWrapper"
import { MainWrapper } from "../common/MainWrapper"

import { Header } from "../common/header/Header"
import { Hero } from "./content/Hero"
import { Advantages } from "./content/Advantages"
import { Features } from "./content/Features"
import { Payment } from "./content/Payment"
import { Calendar } from "./content/Calendar"
import { BeforeAfter } from "./content/BeforeAfter"
import { BecomeCoach } from "./content/BecomeCoach"
import { Publications } from "../common/publications/Publications"
import { Video } from "./content/Video"
import { Questions } from "../common/questions/Questions"
import { Footer } from "../common/footer/Footer"

import { publications } from "./data/publications"
import { questions } from "./data/questions"

const LandingCoachPageMarkUp = () => (
  <PageWrapper>
    <Header />
    <MainWrapper>
      <Hero />
      <Advantages />
      <Features />
      <Payment />
      <Calendar />
      <BeforeAfter />
      <BecomeCoach />
      <Publications publications={publications} />
      <Video />
      <Questions questions={questions} />
    </MainWrapper>
    <Footer />
  </PageWrapper>
)

export const LandingCoachPage = withGuest({ to: "/coach" })(LandingCoachPageMarkUp)
