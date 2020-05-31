import React from 'react'
import styled from "styled-components"
import { Avatar } from "@/application/components/avatar/Avatar"
// @ts-ignore
import placeholder from './images/placeholder.png'

const Container = styled.div`
  margin-top: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
`

const Age = styled.div`
  margin-left: 143px;
  font-size: 20px;
  line-height: 26px;
  color: #9AA0A6;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  color: #424242;
  margin-left: 16px;
`

export const ProfileHeader = () => (
  <Container>
    <StyledAvatar src={placeholder} />
    <Title>Константин Константинов</Title>
    <Age>24 года</Age>
  </Container>
)
