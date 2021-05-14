import * as React from "react"

import { withGuest } from "@/feature/user/with-guest"

import { PageWrapper } from "./common/PageWrapper"
import { MainWrapper } from "./common/MainWrapper"

import { Header } from "./content/Header"
import { Hero } from "./content/Hero"
import { Advantages } from "./content/Advantages"
import { Features } from "./content/Features"
import { Payment } from "./content/Payment"
import { Calendar } from "./content/Calendar"
import { BeforeAfter } from "./content/BeforeAfter"
import { BecomeCoach } from "./content/BecomeCoach"
import { Publications } from "./content/Publications"
import { Video } from "./content/Video"
import { Questions } from "./content/Questions"
import { Footer } from "./content/Footer"

const LandingCoachPageMarkUp = () => (
  <PageWrapper>
    <Header />
    <MainWrapper>
      <Hero />
      <Advantages />
      <Features />
      <Payment />
      <Calendar />
      {/* <BeforeAfter /> */}
      {/* <BecomeCoach /> */}
      {/* <Publications /> */}
      <Video />
      {/* <Questions /> */}
    </MainWrapper>
    <Footer />
  </PageWrapper>
)

export const LandingCoachPage = withGuest({ to: "/coach" })(LandingCoachPageMarkUp)
