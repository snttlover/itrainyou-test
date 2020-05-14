import { DashboardLayout } from "@/application/components/layouts/dashboard/DashboardLayout"
import { MediaRange } from "@/application/lib/responsive/media"
import { AboutCouch } from "@/application/pages/couch/pages/by-id/components/AboutCouch"
import { BaseCouchInfo } from "@/application/pages/couch/pages/by-id/components/BaseCouchInfo"
import { Reviews } from "@/application/pages/couch/pages/by-id/components/Reviews"
import { useRouter } from "next/router"
import React from "react"
import styled from "styled-components"

const StyledDashboardLayout = styled(DashboardLayout)`
  background-color: #eceff1;
`

const Content = styled.div`
  margin: 20px 8px 0;
  min-width: 304px;
`

const InfoWithSidebar = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
`

const BuySidebar = styled.div`
  display: none;
  min-width: 268px;
  width: 268px;
  height: 860px;
  background-color: #dbdee0;
  margin-left: 24px;

  ${MediaRange.greaterThan("laptop")`
    display: flex;
  `}
`

const BuyBlock = styled.div`
  display: flex;
  width: 100%;
  height: 480px;
  background-color: #dbdee0;

  ${MediaRange.greaterThan("laptop")`
    display: none;
  `}
`

const CouchInfoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`

const MainCouchBlock = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  ${MediaRange.greaterThan("laptop")`
    background: #FFFFFF;
    border-radius: 2px;
  `}

  ${BuyBlock} {
    margin-top: 16px;

    ${MediaRange.greaterThan("mobile")`
      margin-top: 12px;
    `}
  }

  ${AboutCouch} {
    margin-top: 16px;

    ${MediaRange.greaterThan("laptop")`
      margin-top: 0;
    `}
  }
`
// А файл ТО БОЛЬШОЙ да? интересно что там в конце, наверное шрифты красивые?
export const CouchByIdPage = () => {
  const router = useRouter()

  return (
    <StyledDashboardLayout>
      <Content>
        <InfoWithSidebar>
          <CouchInfoContainer>
            <MainCouchBlock>
              <BaseCouchInfo />
              <BuyBlock>{/* Вставь свой блок сюда */}</BuyBlock>
              <AboutCouch />
            </MainCouchBlock>
            <Reviews />
          </CouchInfoContainer>
          <BuySidebar>{/* Вставь свой блок сюда */}</BuySidebar>
        </InfoWithSidebar>
      </Content>
    </StyledDashboardLayout>
  )
}
