import * as React from "react"

import { routeNames } from "@/pages/route-names"

import { withGuest } from "@/feature/user/with-guest"

import { PageWrapper } from "../common/PageWrapper"
import { MainWrapper } from "../common/MainWrapper"

import { Header } from "../common/header/Header"
import { Hero } from "./content/Hero"
import { Advantages } from "./content/Advantages"
import { WhoIs } from "./content/WhoIs"
import { FirstFree } from "./content/FirstFree"
import { CoachList } from "./content/CoachList"
import { CoachStats } from "./content/CoachStats"
import { Features } from "./content/Features"
import { HandySearch } from "./content/HandySearch"
import { HandyCabinet } from "./content/HandyCabinet"
import { Video } from "../common/video/Video"
import { Publications } from "../common/publications/Publications"
import { Questions } from "../common/questions/Questions"
import { Footer } from "../common/footer/Footer"

import { advantages } from "./data/advantages"
import { videoData } from "./data/videoData"
import { publications } from "./data/publications"
import { questions } from "./data/questions"

const LandingClientPageMarkUp = () => (
  <PageWrapper>
    <Header signUpRoute={routeNames.signup("1")} />
    <MainWrapper>
      <Hero />
      <Advantages advantages={advantages} />
      <WhoIs />
      <FirstFree />
      <CoachList />
      <CoachStats />
      <Features />
      <HandySearch />
      <HandyCabinet />
      <Video videoData={videoData} />
      <Publications publications={publications} />
      <Questions questions={questions} />
    </MainWrapper>
    <Footer />
  </PageWrapper>
)

export const LandingClientPage = withGuest({ to: "/client" })(LandingClientPageMarkUp)
