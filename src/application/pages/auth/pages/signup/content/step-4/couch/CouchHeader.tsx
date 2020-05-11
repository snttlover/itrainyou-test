import { Button } from "@/application/components/button/normal/Button"
import { MediaRange } from "@/application/lib/responsive/media"
import Router from "next/router"
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
    margin: 127px 6% 0;
  `}
  ${MediaRange.greaterThan("tablet")`
    width: 680px;
    margin: 32px auto 0;
  `}
`

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  
  ${MediaRange.greaterThan('mobile')`
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
  color: #FFFFFF;

  ${MediaRange.greaterThan("mobile")`    
    font-weight: bold;
    font-size: 24px;
    line-height: 26px;
  `}  
  ${MediaRange.greaterThan("tablet")`
    font-weight: normal;
    font-size: 32px;
    line-height: 40px;
  `}
`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  
  ${MediaRange.greaterThan("mobile")`
    width: 80px;
    height: 80px;
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
  `}
`

const Sex = styled.span`
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
  background: #F5EFF8;
  color: #424242;

  ${MediaRange.greaterThan("mobile")`
    margin: 0 0 0 auto;
  `}
  ${MediaRange.greaterThan("laptop")`   
    margin: 0;
  `}
`

type CouchHeaderProps = { avatar: string; fullName: string; years: number; sex: string }

export const CouchHeader = ({ avatar, fullName, sex, years }: CouchHeaderProps) => (
  <HeaderContent>
    <Title>Заполните полную информацию о себе</Title>
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
        <SkipButton onClick={() => Router.push('/', '/')}>Пропустить</SkipButton>
      </ButtonContainer>
    </Content>
  </HeaderContent>
)
