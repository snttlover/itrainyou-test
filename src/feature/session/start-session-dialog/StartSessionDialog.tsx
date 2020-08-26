import React, { useState } from "react"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { Avatar } from "@/components/avatar/Avatar"
import { Button } from "@/components/button/normal/Button"

export const StartSessionDialog = () => {
  const [visibility, changeVisibility] = useState(false)
  return (
    <StyledDialog value={visibility} onChange={changeVisibility}>
      <Container>
        <Title>У вас началась сессия</Title>
        <Time>11:30-12:30</Time>
        <StyledAvatar src='https://www.vokrug.tv/pic/product/6/f/e/2/6fe2523ab4de68e3981b29c9f9f00f17.jpeg' />
        <Name>Jane Cooper</Name>
        <StartButton>Начать сессию</StartButton>
      </Container>
    </StyledDialog>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.div`
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #424242;
  margin-top: 3px;
`

const Time = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
  margin-top: 19px;
`

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin-top: 8px;
`

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
`

const StartButton = styled(Button)`
  margin-top: 48px;
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
`
