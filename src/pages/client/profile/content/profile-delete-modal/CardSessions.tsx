import React from "react"
import { useList, useStore } from "effector-react"
import styled from "styled-components"
import { date } from "@/lib/formatting/date"
import { $cardsSessionsForView } from "@/pages/client/wallet/cards/cards.model"
import { MediaRange } from "@/lib/responsive/media"
import { Avatar } from "@/components/avatar/Avatar"
import { CoachItemType } from "@/lib/api/wallet/client/get-card-sessions"

type CardSessions = {
    id: number
    startDateTime: string
    endDateTime: string
    duration: string
    coach: CoachItemType
}

const StyledSessionItem: React.FC<CardSessions> = ({ id,startDateTime, duration, coach, endDateTime }) => {

  return (
    <Item>
      <TopMobileGroup>
        <Date>{date(startDateTime).format("D MMMM YYYY")}</Date>
        <Time>{date(startDateTime).format("HH:mm")}-{date(endDateTime).format("HH:mm")}</Time>
      </TopMobileGroup>
      <BottomMobileGroup>
        <Name>{coach.firstName} {coach.lastName}</Name>
        <StyledAvatar src={coach.avatar} />
      </BottomMobileGroup>
    </Item>
  )
}


export const CardSessions = () => (
  <>
    <Header>Невозможно удалить карту</Header>
    <Description>Данная карта используется для оплаты сессии</Description>
    {useList($cardsSessionsForView, session => (
      <StyledSessionItem {...session} />
    ))}
    <Actions>
      <WarningTitle>
                  Дождитесь завершения сессий для удаления карты
      </WarningTitle>
    </Actions>
  </>
)

const Header = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  text-align: center;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #5B6670;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 35px;
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 85px;
`

const WarningTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #5B6670;
`

const Date = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
    
  ${MediaRange.lessThan("mobile")`
    font-size: 12px;
    line-height: 16px;
  `}
`

const Time = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #9aa0a6;
    margin-left: 8px;
    
  ${MediaRange.lessThan("mobile")`
    font-size: 12px;
    line-height: 16px;
  `}
`

const Item = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
    justify-content: space-between;
  border-bottom: 1px solid #efefef;
  padding: 12px 0;
    
    ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    align-items: center; 
  `}
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  min-width: 40px;
  margin-left: 16px;

  ${MediaRange.lessThan("mobile")`
    width: 24px;
    min-width: 24px;
    height: 24px;
  `}
`

const Name = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
  margin-left: 8px;
  width: 40%;
  flex: 1;

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
  `}
`

const TopMobileGroup = styled.div`
  display: flex;
  align-items: center;
    
  ${MediaRange.lessThan("mobile")`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;   
  `}
`

const BottomMobileGroup = styled.div`
    display: flex;
    align-items: center; 
  ${MediaRange.lessThan("mobile")`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;   
  `}
`