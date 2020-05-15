import { Avatar } from "@/application/components/avatar/Avatar"
import { Icon } from "@/application/components/icon/Icon"
import { getCategoryColorById } from "@/application/feature/categories/categories.store"
import { getYearsCount } from "@/application/lib/helpers/date"
import { MediaRange } from "@/application/lib/responsive/media"
import { $coach } from "@/application/pages/coach/pages/by-id/coach-by-id.model"
import { Block } from "@/application/pages/coach/pages/by-id/components/common/Block"
import { useStore } from "effector-react"
import React from "react"
import styled from "styled-components"

const StyledAvatar = styled(Avatar)`
  ${MediaRange.greaterThan("mobile")`        
    width: 120px;
    height: 120px;
  `}
`

const UserInfo = styled.div`
  margin-left: 16px;
`

const Name = styled.p`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #424242;

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
  color: #4858cc;
  ${MediaRange.greaterThan("mobile")`      
    margin-top: 8px;  
    font-size: 20px;
    line-height: 26px;
  `}
`

const StarIcon = styled(Icon).attrs({ name: "star" })`
  width: 16px;
  height: 16px;
  fill: #4858cc;
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

export const BaseCoachInfo = styled(({ ...props }) => {
  const coach = useStore($coach)
  return (
    <Block inline {...props}>
      <StyledAvatar src={coach?.avatar!} />
      <UserInfo>
        <Name>
          {`${coach?.firstName} ${coach?.lastName}`},&nbsp;
          <Year>{getYearsCount(coach?.birthDate!)} лет</Year>
        </Name>
        <Rating>
          <StarIcon name='star' />
          {coach?.rating}
        </Rating>
        <CategoriesContainer>
          {coach?.categories.map(cat => (
            <Tabletka color={getCategoryColorById(cat.id)} />
          ))}
        </CategoriesContainer>
      </UserInfo>
    </Block>
  )
})``
