import { fetchCoachesListFx } from "@/application/pages/landing/content/our-coaches/model"
import { fetchCategoriesListFx } from "@/application/pages/landing/content/top-bar/categories-picker/categories-picker.model"
import { LandingPage } from "@/application/pages/landing/LandingPage"
import React from "react"

const Index = () => (<LandingPage />)


Index.getInitialProps = async () => {
  await Promise.all([fetchCoachesListFx(), fetchCategoriesListFx()])
}

export default Index
