import { Avatar } from "#/components/avatar/Avatar"
import { Button } from "#/components/button/normal/Button"
import { writeToClient } from "#/feature/chat/modules/write-to-coach"
import { date, getYearsCount } from "#/lib/formatting/date"
import { MediaRange } from "#/lib/responsive/media"
import { $clientData } from "#/pages/coach/client/client-page.model"
import { routeNames } from "#/pages/route-names"
import { Link } from "react-router-dom"
import { Block } from "./common/Block"
import { useStore } from "effector-react/ssr"
import React from "react"
import styled from "styled-components"

const StyledAvatar = styled(Avatar)`
  border: 2px solid #fff;
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

const StyledBlock = styled(Block)`
  position: relative;
  flex-direction: column;
`

const CategoriesAndButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`
const UserInfoWrapper = styled.div`
  display: flex;
`

const EditButton = styled(Button)`
  margin-top: 40px;
  width: 160px;
  display: none;

  ${MediaRange.greaterThan("mobile")`
    display: block;
    margin-right: 8px;
  `}
`

const MobileEditButton = styled(EditButton)`
  display: block;
  margin: 24px auto 0;
  ${MediaRange.greaterThan("mobile")`
    display: none;
  `}
`

const Since = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;
  margin-top: 12px;
`

export const ProfileHeader = styled(({ ...props }) => {
  const client = useStore($clientData)

  return (
    <StyledBlock inline {...props}>
      <UserInfoWrapper>
        <StyledAvatar src={client?.avatar!} />
        <UserInfo>
          <Name>
            {`${client?.firstName} ${client?.lastName}`},&nbsp;
            <Year>{getYearsCount(client?.birthDate!)} лет</Year>
          </Name>
          <Since>На сайте с {date(client?.creationDatetime!).format("DD.MM.YYYY")}</Since>
          <CategoriesAndButtonContainer>
            <EditButton onClick={() => writeToClient(client?.id!)}>Написать</EditButton>
          </CategoriesAndButtonContainer>
        </UserInfo>
      </UserInfoWrapper>
      <MobileEditButton onClick={() => writeToClient(client?.id!)}>Написать</MobileEditButton>
    </StyledBlock>
  )
})``
