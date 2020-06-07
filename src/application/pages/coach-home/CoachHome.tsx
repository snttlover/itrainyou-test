import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { MediaRange } from "@/application/lib/responsive/media"
import { CoachGetAccess } from "@/application/pages/coach-home/get-access/CoachGetAccess"
import React from "react"
import styled from "styled-components"

const TopLevelContainer = styled.div`
  margin: 0 150px 0 0;
`

const Container = styled.div`
  max-width: 600px;
  margin: 36px auto 0;
  position: relative;
  ${MediaRange.greaterThan("mobile")`
    width: 80%;
  `}
  ${MediaRange.greaterThan("tablet")`
    padding: 0;
    width: 80%;
  `}  
  ${MediaRange.greaterThan("laptop")`
    padding: 0;
    width: 600px;
  `}
`

const Title = styled.h1`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #424242;

  padding: 0 16px;
  ${MediaRange.greaterThan("mobile")`
    font-size: 24px;
    line-height: 26px;
    padding: 0;
  `}
`

const Description = styled.p`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;

  padding: 0 16px;
  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
    padding: 0;
  `}
`

export const CoachHome = () => {
  return (
    <CoachDashboardLayout>
      <TopLevelContainer>
        <Container>
          <Title>У вас пока закрыт доступ к функционалу коуча</Title>
          <Description>Заполните все поля, которые вы пропустили на этапе регистрации</Description>
          <CoachGetAccess />
        </Container>
      </TopLevelContainer>
    </CoachDashboardLayout>
  )
}

export default CoachHome
