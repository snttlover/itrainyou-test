import styled from "styled-components"
import {Menu} from "@/application/components/layouts/dashboard/menu/Menu"

type DashboardTypes = {
  backgroundColor: string,
  children: React.ReactChild
}

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const PageContent = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
`

export const DashboardLayout = (props: DashboardTypes) => (
  <Layout>
    <Menu />
    <PageContent>{props.children}</PageContent>
  </Layout>
)
