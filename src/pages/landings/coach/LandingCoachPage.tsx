import * as React from "react"

import { routeNames } from "@/pages/route-names"

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
import { Video } from "../common/video/Video"
import { Questions } from "../common/questions/Questions"
import { Footer } from "../common/footer/Footer"

import { advantages } from "./data/advantages"
import { publications } from "./data/publications"
import { videoData } from "./data/videoData"
import { questions } from "./data/questions"

const LandingCoachPageMarkUp = () => (
  <PageWrapper>
    <Header
      signUpRoute={routeNames.signup("1")}
      additionalButton={{
        title: "Начать обучение",
        route: routeNames.signup("1"),
      }}
      showExtraButton={true}
    />
    <MainWrapper>
      <Hero />
      <Advantages advantages={advantages} />
      <Features />
      <Payment />
      <Calendar />
      <BeforeAfter />
      <BecomeCoach />
      <Publications publications={publications} />
      <Video videoData={videoData} />
      <Questions questions={questions} />
    </MainWrapper>
    <Footer />
  </PageWrapper>
)

export const LandingCoachPage = withGuest({ to: "/coach" })(LandingCoachPageMarkUp)
