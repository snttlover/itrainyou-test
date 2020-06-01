import { CoachCard } from "@/application/components/coach-card/CoachCard"
import { UserLayout } from "@/application/components/layouts/behaviors/user/UserLayout"
import { useStore } from "effector-react"

import { $recommendations, mounted } from "./home.model"
import React, { useEffect } from "react"
import styled from "styled-components"

const Container = styled.div`
  padding: 16px;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
`

const RecommendationCoachCard = styled(CoachCard)`
  margin-top: 12px;
`

export const HomePage = () => {
  const recommendations = useStore($recommendations)
  useEffect(() => {
    mounted()
  }, [])

  return (
    <UserLayout>
      <Container>
        <Title>Сессия уже началась!</Title>
        <Title>У вас сегодня</Title>
        <Title>Рекомендации</Title>
        {recommendations.map(coach => (
          <RecommendationCoachCard coach={coach} />
        ))}
      </Container>
    </UserLayout>
  )
}

export default HomePage
