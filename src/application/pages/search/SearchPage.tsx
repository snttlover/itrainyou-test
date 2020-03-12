import * as React from "react"
import { Layout } from "@/application/components/layouts/default/Layout"
import { PageContainer } from "@/application/components/page-container/PageContainer"
import { TopBar } from "@/application/pages/landing/content/top-bar/TopBar"
import { Content } from "./content/Content"
import { AsyncDataOptions } from "@/application/routes"
import { allSettled } from "effector/fork"
import { loadCoaches } from "./model"
import {Sorting} from "./content/list/content/Sorting"

export const SearchPage = () => (
  <Layout>
    <PageContainer>
      <TopBar />
      <Sorting />
      <Content />
    </PageContainer>
  </Layout>
)

SearchPage.asyncData = async ({ scope }: AsyncDataOptions) => {
  await allSettled(loadCoaches, {
    scope,
    params: undefined
  })
}
