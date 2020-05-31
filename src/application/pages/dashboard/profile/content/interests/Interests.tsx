import React from 'react'
import styled from "styled-components"
import { InterestsStats } from "@/application/pages/dashboard/profile/content/interests/InterestsStats"
import {InterestsCategories} from "@/application/pages/dashboard/profile/content/interests/InterestsCategories"

const Container = styled.div`
  margin-right: 140px;
  padding: 24px;
  border-radius: 2px;
  background: #fff;
  width: 100%;
  max-width: 650px;
  margin-top: 32px;
  position: relative;
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
    <Title>Интересы</Title>
    <InterestsCategories />
  </Container>
)
