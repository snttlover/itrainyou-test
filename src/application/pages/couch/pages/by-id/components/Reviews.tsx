import { MediaRange } from "@/application/lib/responsive/media"
import { Block } from "@/application/pages/couch/pages/by-id/components/common/Block"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  min-width: 304px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  ${MediaRange.greaterThan("laptop")`    
    margin: 0;
  `}
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #424242;

  ${MediaRange.greaterThan("mobile")`
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
  `}
`

const UserInfoContainer = styled.div``

const Review = () => {
  return (
    <Block>
      <UserInfoContainer></UserInfoContainer>
    </Block>
  )
}

export const Reviews = () => {
  return (
    <Container>
      <Title>Отзывы</Title>
      <Review />
    </Container>
  )
}
