import React from 'react'
import styled from "styled-components"
import { InterestsStats } from "@/application/pages/dashboard/profile/content/interests/InterestsStats"
import {InterestsCategories} from "@/application/pages/dashboard/profile/content/interests/InterestsCategories"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  padding-right: 140px;
  width: 100%;
  margin-top: 32px;
  position: relative;
  max-width: 790px;
  ${MediaRange.lessThan(`tablet`)`
    padding-right: 70px;
  `}
`

const Interests = styled.div`
  max-width: 650px;
  width: 100%;
  border-radius: 2px;
  background: #fff;
  padding: 24px;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 23px;
`

export const ProfileInterests = () => (
  <Container>
    <InterestsStats />
    <Interests>
      <Title>Интересы</Title>
      <InterestsCategories />
    </Interests>
  </Container>
)
