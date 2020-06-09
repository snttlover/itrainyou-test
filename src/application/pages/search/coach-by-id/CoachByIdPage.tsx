import { MediaRange } from "@/application/lib/responsive/media"
import { $coach, mounted } from "@/application/pages/search/coach-by-id/coach-by-id.model"
import { AboutCoach } from "@/application/pages/search/coach-by-id/components/AboutCoach"
import { BaseCoachInfo } from "@/application/pages/search/coach-by-id/components/BaseCoachInfo"
import { Reviews } from "@/application/pages/search/coach-by-id/components/Reviews"
import { withStart } from "effector-next"
import React from "react"
import styled from "styled-components"
import { $sessionsPickerStore } from "@/application/pages/search/coach-by-id/coach-by-id.model"
import { CoachDatepicker } from "@/application/pages/search/content/list/content/CoachDatepicker"
import { useStore } from "effector-react"
import { UserLayout } from "@/application/components/layouts/behaviors/user/UserLayout"

const Content = styled.div`
  margin: 20px 8px;
  min-width: 304px;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 28px;
  `}
  ${MediaRange.greaterThan("tablet")`
    margin-top: 36px;
  `}
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
  margin-left: 24px;
  position: relative;
  align-self: flex-start;
  height: auto;

  ${MediaRange.greaterThan("laptop")`
    display: flex;
  `}
`

const BuyBlock = styled.div`
  position: relative;
  display: flex;
  width: 100%;

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

const Datepicker = () => {
  const coach = useStore($coach)

  if (coach) {
    return <CoachDatepicker coach={coach} sessionsData={$sessionsPickerStore} />
  }
  return null
}

type QueryParams = {
  id: string
}

const triggerEventOnPageLoaded = withStart(
  mounted.prepend(ctx => {
    const query = ctx.query as QueryParams

    return { id: parseInt(query.id) }
  })
)

export const CoachByIdPage = triggerEventOnPageLoaded(() => (
  <UserLayout>
    <Content>
      <InfoWithSidebar>
        <CoachInfoContainer>
          <MainCoachBlock>
            <BaseCoachInfo />
            <BuyBlock>
              <Datepicker />
            </BuyBlock>
            <AboutCoach />
          </MainCoachBlock>
          <Reviews />
        </CoachInfoContainer>
        <BuySidebar>
          <Datepicker />
        </BuySidebar>
      </InfoWithSidebar>
    </Content>
  </UserLayout>
))
