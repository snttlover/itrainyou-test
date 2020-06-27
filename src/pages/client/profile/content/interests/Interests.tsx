import * as React from "react"
import styled from "styled-components"
import { InterestsStats } from "@/pages/client/profile/content/interests/InterestsStats"
import { InterestsCategories } from "@/pages/client/profile/content/interests/InterestsCategories"
import { MediaRange } from "@/lib/responsive/media"

const Container = styled.div`
  padding-right: 140px;
  width: 100%;
  margin-top: 32px;
  position: relative;
  max-width: 790px;
  ${MediaRange.lessThan(`tablet`)`
    padding-right: 70px;
  `}

  ${MediaRange.lessThan(`mobile`)`
    padding-right: 0;
    padding-top: 100px;
    margin-top: 16px;
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

  ${MediaRange.lessThan(`mobile`)`
     padding-top: 30px;
     font-size: 16px;
     line-height: 26px;
  `}
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
