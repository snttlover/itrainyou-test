import { Button } from "@app/components/button/normal/Button"
import { MediaRange } from "@app/lib/responsive/media"
import { Steps } from "@app/pages/auth/pages/signup/components/Steps"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  background: linear-gradient(211.55deg, #a3cff3 14.5%, rgba(255, 255, 255, 0) 85.5%), #9f8dc1;
  height: 416px;
`

const HeaderContent = styled.div`
  margin-top: 71px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin: 0 12px;

  color: #424242;
  text-align: center;

  ${MediaRange.greaterThan("mobile")`    
    font-size: 36px;
    line-height: 44px;
  `}
`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-top: 24px;
`

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`

const FullName = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
`

const Year = styled.span`
  font-weight: normal;
  margin-left: 8px;
`

const Sex = styled.span`
  margin-top: 8px;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
`

const ButtonContainer = styled.div`
  margin-top: 36px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const SkipButton = styled(Button)`
  margin: 0 auto;
  width: 160px;
`

const Hint = styled.p`
  margin: 8px 12px;
  font-size: 12px;
  line-height: 16px;
  color: #544274;
`

type CouchHeaderProps = { avatar: string; fullName: string; years: number; sex: string }

export const CouchHeader = ({ avatar, fullName, sex, years }: CouchHeaderProps) => {
  return (
    <Container>
      <Steps activeId='4'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </Steps>
      <HeaderContent>
        <Title>Заполните полную информацию о себе</Title>
        <Avatar src={avatar} />
        <UserData>
          <FullName>
            {fullName} <Year>{years} лет</Year>
          </FullName>
          <Sex>Пол: {sex}</Sex>
        </UserData>
        <ButtonContainer>
          <SkipButton>Пропустить</SkipButton>
          <Hint>*Вы сможете потом заполнить информацию</Hint>
        </ButtonContainer>
      </HeaderContent>
    </Container>
  )
}
