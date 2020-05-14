import { Avatar } from "@/application/components/avatar/Avatar"
import { Icon } from "@/application/components/icon/Icon"
import { getCategoryColorById } from "@/application/feature/categories/categories.store"
import { MediaRange } from "@/application/lib/responsive/media"
import { Block } from "@/application/pages/couch/pages/by-id/components/common/Block"
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

export const BaseCouchInfo = styled(({ ...props }) => {
  const name = "Вика Иванова"
  const year = "27"
  return (
    <Block inline {...props}>
      <StyledAvatar src={null} />
      <UserInfo>
        <Name>
          {name},&nbsp;
          <Year>{year} лет</Year>
        </Name>
        <Rating>
          <StarIcon name='star' />
          4,5
        </Rating>
        <CategoriesContainer>
          <Tabletka color={getCategoryColorById(1)} />
          <Tabletka color={getCategoryColorById(2)} />
          <Tabletka color={getCategoryColorById(3)} />
        </CategoriesContainer>
      </UserInfo>
    </Block>
  )
})``
