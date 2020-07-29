import { Avatar } from "@/components/avatar/Avatar"
import { Button } from "@/components/button/normal/Button"
import { Icon } from "@/components/icon/Icon"
import { getCategoryColorById } from "@/feature/categories/categories.store"
import { IsAuthed } from "@/feature/user/IsAuthed"
import { getYearsCount } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { $profileData } from "../profile.model"
import { Block } from "./common/Block"
import { useStore } from "effector-react/ssr"
import React from "react"
import styled from "styled-components"

const StyledAvatar = styled(Avatar)<{ isTopCoach: boolean }>`
  border: 2px solid ${props => (props.isTopCoach ? `#F6C435` : `#fff`)};
  min-width: 80px;
  ${MediaRange.greaterThan("mobile")`        
    width: 120px;
    min-width: 120px;
    height: 120px;
    min-height: 120px;
  `}
`

const UserInfo = styled.div`
  margin-left: 16px;
  width: 100%;
`

const Name = styled.p`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #424242;
  padding-right: 30px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${MediaRange.greaterThan("mobile")`        
    font-size: 20px;
    line-height: 26px;
  `}
`

const Year = styled.span`
  color: #9aa0a6;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.primary};
  ${MediaRange.greaterThan("mobile")`      
    margin-top: 8px;  
    font-size: 20px;
    line-height: 26px;
  `}
`

const StarIcon = styled(Icon).attrs({ name: "star" })`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors.primary};
  margin-right: 4px;
  ${MediaRange.greaterThan("mobile")`      
    width: 24px;
    height: 24px;
  `}
`

const CategoriesContainer = styled.div`
  margin-top: 12px;
  ${MediaRange.greaterThan("mobile")`      
    margin-top: 34px;
  `}
`

const Tabletka = styled(Icon).attrs({ name: "tabletka" })<{ color: string }>`
  width: 16px;
  height: 16px;
  fill: ${({ color }) => color};

  &:not(:first-child) {
    margin-left: 8px;
  }

  ${MediaRange.greaterThan("mobile")`      
    width: 24px;
    height: 24px;
  `}
`

const TopCoachIcon = styled(Icon).attrs({ name: `top-coach` })`
  width: 16px;
  height: 16px;
  margin-right: 8px;

  ${MediaRange.greaterThan("mobile")`
    width: 24px;
    height: 24px;
  `}
`

const StyledBlock = styled(Block)`
  position: relative;
  flex-direction: column;
`

const Like = styled(Icon)`
  position: absolute;
  fill: ${({ theme }) => theme.colors.primary};
  right: 8px;
  top: 12px;
  ${MediaRange.greaterThan("mobile")`
    position: static;
    margin-left: 8px;
  `};
`

const CategoriesAndButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const UserInfoWrapper = styled.div`
  display: flex;
`

const EditButton = styled(Button)`
  margin-top: 24px;
  width: 160px;
  display: none;

  ${MediaRange.greaterThan("mobile")`
    display: block;
    margin-right: 8px;
  `}
`

const MobileEditButton = styled(EditButton)`
  display: block;
  margin: 24px 0 0 auto;
  ${MediaRange.greaterThan("mobile")`
    display: none;
  `}
`

export const BaseCoachInfo = styled(({ ...props }) => {
  const coach = useStore($profileData)
  return (
    <StyledBlock inline {...props}>
      <UserInfoWrapper>
        <StyledAvatar src={coach?.avatar!} isTopCoach={!!coach?.isTopCoach} />
        <UserInfo>
          <Name>
            {`${coach?.firstName} ${coach?.lastName}`},&nbsp;
            <Year>{getYearsCount(coach?.birthDate!)} лет</Year>
          </Name>
          <Rating>
            <StarIcon name='star' />
            {coach?.rating}
          </Rating>
          <CategoriesAndButtonContainer>
            <CategoriesContainer>
              {coach?.isTopCoach && <TopCoachIcon />}
              {coach?.categories.map(cat => (
                <Tabletka color={getCategoryColorById(cat.id)} key={cat.id} />
              ))}
            </CategoriesContainer>
            <EditButton onClick={() => {}}>Редактировать</EditButton>
          </CategoriesAndButtonContainer>
        </UserInfo>
      </UserInfoWrapper>
      <MobileEditButton onClick={() => {}}>Редактировать</MobileEditButton>
    </StyledBlock>
  )
})``
