import { DashboardLayout } from "@/application/components/layouts/dashboard/DashboardLayout"
import { MediaRange } from "@/application/lib/responsive/media"
import { AboutCoach } from "@/application/pages/coach/pages/by-id/components/AboutCoach"
import { BaseCoachInfo } from "@/application/pages/coach/pages/by-id/components/BaseCoachInfo"
import { Reviews } from "@/application/pages/coach/pages/by-id/components/Reviews"
import { useRouter } from "next/router"
import React from "react"
import styled from "styled-components"

const StyledDashboardLayout = styled(DashboardLayout)`
  background-color: #eceff1;
`

const Content = styled.div`
  margin: 20px 8px;
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

const CoachInfoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  ${Reviews} {
    margin-top: 24px;

    ${MediaRange.greaterThan("mobile")`
      margin-top: 32px;
    `}
  }
`

const MainCoachBlock = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  ${MediaRange.greaterThan("laptop")`
    background: #FFFFFF;
    border-radius: 2px;
    padding: 20px 8px;
  `}

  ${BuyBlock} {
    margin-top: 16px;

    ${MediaRange.greaterThan("mobile")`
      margin-top: 12px;
    `}
  }

  ${AboutCoach} {
    margin-top: 16px;

    ${MediaRange.greaterThan("laptop")`
      margin-top: 0;
    `}
  }
`
// А файл ТО БОЛЬШОЙ да? интересно что там в конце, наверное шрифты красивые?
export const CoachByIdPage = () => {
  const router = useRouter()

  return (
    <StyledDashboardLayout>
      <Content>
        <InfoWithSidebar>
          <CoachInfoContainer>
            <MainCoachBlock>
              <BaseCoachInfo />
              <BuyBlock>{/* Вставь свой блок сюда */}</BuyBlock>
              <AboutCoach />
            </MainCoachBlock>
            <Reviews />
          </CoachInfoContainer>
          <BuySidebar>{/* Вставь свой блок сюда */}</BuySidebar>
        </InfoWithSidebar>
      </Content>
    </StyledDashboardLayout>
  )
}
