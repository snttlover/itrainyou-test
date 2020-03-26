import { Button } from "@app/components/button/normal/Button"
import { MediaRange } from "@app/lib/responsive/media"
import { Steps } from "@app/pages/auth/pages/signup/components/Steps"
import * as React from "react"
import styled from "styled-components"

const HeaderContent = styled.div`
  margin-top: 71px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${MediaRange.greaterThan("mobile")`
    flex-direction: row;
    flex-wrap: wrap;
    margin: 54px 6% 0;
  `}
  ${MediaRange.greaterThan("tablet")`
    width: 700px;
    margin: 54px auto 0;
  `}
  ${MediaRange.greaterThan("laptop")`
    width: 840px;
    margin: 32px auto 0;
  `}
`

const Title = styled.h2`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  margin: 0 12px;

  text-align: center;

  ${MediaRange.greaterThan("mobile")`    
    margin: 0;
    font-size: 36px;
    line-height: 44px;
    width: 100%;
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
  ${MediaRange.greaterThan("mobile")`    
    align-items: flex-start;
    margin-left: 20px;
    margin-top: 24px;
  `}
`

const FullName = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;

  ${MediaRange.greaterThan("mobile")`    
    font-size: 20px;
    line-height: 26px;
  `}
`

const Year = styled.span`
  font-weight: normal;
  margin-left: 8px;

  ${MediaRange.greaterThan("mobile")`    
    font-size: 20px;
    line-height: 26px;
  `}
`

const Sex = styled.span`
  margin-top: 8px;
  font-size: 14px;
  line-height: 18px;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

const ButtonContainer = styled.div`
  margin-top: 36px;
  width: 100%;
  display: flex;
  flex-direction: column;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 47px;
    margin-left: auto;
    width: auto;
  `}
`

const SkipButton = styled(Button)`
  margin: 0 auto;
  width: 160px;

  ${MediaRange.greaterThan("mobile")`
    margin: 0 0 0 auto;
  `}
  ${MediaRange.greaterThan("laptop")`   
    margin: 0;
  `}
`

const Hint = styled.p`
  margin: 8px 12px;
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
  color: #544274;

  ${MediaRange.greaterThan("mobile")`
    width: 160px;    
    margin: 24px 0 0 auto;
  `}

  ${MediaRange.greaterThan("laptop")`
    width: 250px;    
    margin: 24px 0 0 auto;
  `}
`

type CouchHeaderProps = { avatar: string; fullName: string; years: number; sex: string }

export const CouchHeader = ({ avatar, fullName, sex, years }: CouchHeaderProps) => (
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
)
