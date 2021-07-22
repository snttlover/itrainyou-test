import { Avatar } from "@/old-components/avatar/Avatar"
import { Button } from "@/old-components/button/normal/Button"
import { Icon } from "@/old-components/icon/Icon"
import { getCategoryColorById } from "@/feature/categories/categories.store"
import { getYearsCount } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { routeNames } from "@/pages/route-names"
import { Link } from "react-router-dom"
import { $profileData } from "../profile.model"
import { Block } from "./common/Block"
import { useStore } from "effector-react"
import React, { useEffect } from "react"
import styled from "styled-components"
import { declOfNum } from "@/lib/formatting/numerals"
import { CopyLinkIcon } from "@/pages/search/coach-by-id/components/CopyIcon"

const StyledAvatar = styled(Avatar)<{ isTopCoach: boolean }>`
  border: 2px solid ${props => (props.isTopCoach ? "#F6C435" : "#fff")};
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
  padding-right: 10px;

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
  flex: 1;
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

const TopCoachIcon = styled(Icon).attrs({ name: "top-coach" })`
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



const Tooltip = styled.span`
  visibility: visible;
  
  background: #FFFFFF;
  border-radius: 8px;
  padding: 12px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08), 0px 0px 4px rgba(0, 0, 0, 0.16), 0px 6px 18px -6px rgba(0, 0, 0, 0.04);

`

const TooltipContainer = styled.div`
  display: flex;
`

const CopyLink = styled(CopyLinkIcon)`
  width: 24px;
  cursor: pointer;
  stroke: #9aa0a6;
`

const CopyLinkContainer = styled.div`
  align-self: flex-end;
  margin-left: 5px;
  ${CopyLink}:hover ${Tooltip} {
    visibility: visible;
  }
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
            <Year>
              {getYearsCount(coach?.birthDate!)} {declOfNum(getYearsCount(coach?.birthDate), ["год", "года", "лет"])}
            </Year>
            <CopyLinkContainer>
              <TooltipContainer>
                <Tooltip>
                  Скопировать ссылку профиля
                </Tooltip>
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.23178 11.0781L0 0H20L10.7682 11.0781C10.3684 11.5579 9.63157 11.5579 9.23178 11.0781Z" fill="white"/>
                  </svg>
              </TooltipContainer>

              <CopyLink link={() => `https://${window.location.hostname}/search/coach/${coach?.id}`} />
            </CopyLinkContainer>
          </Name>
          <Rating>
            <StarIcon name='star' />
            {coach?.rating || "Мало оценок"}
          </Rating>
          <CategoriesAndButtonContainer>
            <CategoriesContainer>
              {coach?.isTopCoach && <TopCoachIcon />}
              {coach?.categories.map(cat => (
                <Tabletka color={getCategoryColorById(cat.id)} key={cat.id} />
              ))}
            </CategoriesContainer>
            <Link to={routeNames.coachProfileEdit()}>
              <EditButton>Редактировать</EditButton>
            </Link>
          </CategoriesAndButtonContainer>
        </UserInfo>
      </UserInfoWrapper>
      <Link to={routeNames.coachProfileEdit()}>
        <MobileEditButton>Редактировать</MobileEditButton>
      </Link>
    </StyledBlock>
  )
})``
