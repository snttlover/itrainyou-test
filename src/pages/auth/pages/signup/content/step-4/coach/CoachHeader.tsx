import { Button } from "#/components/button/normal/Button"
import { MediaRange } from "#/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const HeaderContent = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  ${MediaRange.greaterThan("mobile")`
    flex-direction: row;
    flex-wrap: wrap;
    margin: 115px 10% 0;
  `}
  ${MediaRange.greaterThan("tablet")`
    width: 600px;
    margin: 70px auto 0;
  `}
  ${MediaRange.greaterThan("laptop")`
    width: 600px;
    margin: 30px auto 0;
  `}
`

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ${MediaRange.greaterThan("mobile")`
    flex-direction: row;
    justify-content: space-between;
  `}
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #ffffff;

  ${MediaRange.greaterThan("mobile")`    
    font-weight: bold;
    font-size: 24px;
    line-height: 26px;
  `}
  ${MediaRange.greaterThan("laptop")`
    font-weight: normal;
    font-size: 32px;
    line-height: 40px;
  `}
`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  border-radius: 50%;

  ${MediaRange.greaterThan("mobile")`
    width: 80px;
    height: 80px;
    min-width: 80px;
    min-height: 80px;    
    border: 1px solid #9AA0A6;
  `}
`

const UserData = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  margin-top: 20px;
  ${MediaRange.greaterThan("mobile")`    
    justify-content: flex-start;
    margin-top: 24px;
  `}
`

const FullNameSex = styled.div`
  width: 100%;
  margin-left: 8px;

  ${MediaRange.greaterThan("mobile")`
    margin-left: 16px;
    margin-top: 10px;
  `}
`

const FullName = styled.p`
  display: flex;
  justify-content: space-between;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;

  ${MediaRange.greaterThan("mobile")`    
    justify-content: flex-start;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
  `}
`

const Year = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
    &:before {
      content: "("
    }
    &:after {    
      content: ")"
    }
  `}
`

const Sex = styled.p`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;

  ${MediaRange.greaterThan("mobile")`
    font-size: 14px;
    line-height: 18px;
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
  background: #f5eff8;
  color: #424242;

  ${MediaRange.greaterThan("mobile")`
    margin: auto 0 7px auto;
  `}
  ${MediaRange.greaterThan("laptop")`   
    margin: 0;
  `}
`

type CoachHeaderProps = { avatar: string; fullName: string; years: number; sex: string; onSkip: () => any }

export const CoachHeader = ({ avatar, fullName, sex, years, onSkip }: CoachHeaderProps) => (
  <HeaderContent>
    <Title>Заполните информацию о себе</Title>
    <Content>
      <UserData>
        <Avatar src={avatar} />
        <FullNameSex>
          <FullName>
            {fullName}&nbsp;<Year>{years} лет</Year>
          </FullName>
          <Sex>Пол: {sex}</Sex>
        </FullNameSex>
      </UserData>
      <ButtonContainer>
        <SkipButton onClick={onSkip}>Пропустить</SkipButton>
      </ButtonContainer>
    </Content>
  </HeaderContent>
)
