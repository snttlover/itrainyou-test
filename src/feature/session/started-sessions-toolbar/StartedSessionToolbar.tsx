import React from "react"
import styled from "styled-components"
import { Avatar } from "@/components/avatar/Avatar"

export const StartedSessionToolbar = () => (
  <Container>
    <Toolbar>
      <StartedText>Сессия началась</StartedText>
      <User>
        <StyledAvatar src='https://www.vokrug.tv/pic/product/6/f/e/2/6fe2523ab4de68e3981b29c9f9f00f17.jpeg' />
        <Name>Annette Black</Name>
      </User>
      <Info>
        <Time>11:30-12:30</Time>
        <StartButton>Зайти в сессию</StartButton>
      </Info>
    </Toolbar>
  </Container>
)

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1060px;
  width: 100%;
  padding: 0 40px;
`

const Container = styled.div`
  padding: 10px 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  display: flex;
  justify-content: center;
`

const StartedText = styled.div`
  font-size: 16px;
  line-height: 22px;
`
const User = styled.div`
  display: flex;
  align-items: center;
`
const StyledAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
`
const Name = styled.div`
  margin-left: 8px;

  font-size: 16px;
  line-height: 22px;
`
const Info = styled.div`
  display: flex;
  align-items: center;
`
const Time = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  margin-right: 20px;
`
const StartButton = styled.div`
  background: #fff;
  border-radius: 32px;
  padding: 4px 24px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`
