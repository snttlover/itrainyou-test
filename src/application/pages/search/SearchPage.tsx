import * as React from "react"
import { Layout } from "@/application/components/layouts/default/Layout"
import { PageContainer } from "@/application/components/page-container/PageContainer"
import { TopBar } from "@/application/pages/landing/content/top-bar/TopBar"
import { Content } from "./content/Content"

export const SearchPage = () => (
  <Layout>
    <PageContainer>
      <TopBar />
      <Content />
    </PageContainer>
  </Layout>
)
