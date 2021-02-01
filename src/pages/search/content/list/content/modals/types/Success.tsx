import React from "react"
import { useList, useStore } from "effector-react"
import styled from "styled-components"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { Avatar } from "@/components/avatar/Avatar"
import { CoachItemType } from "@/lib/api/wallet/client/get-card-sessions"
import { $bulkedSessionsForView } from "@/pages/search/coach-by-id/coach-by-id.model"

type Sessions = {
  id: number
  startDateTime: string
  endDateTime: string
  duration: string
  coach: CoachItemType
  price: string
}

const StyledSessionItem: React.FC<Sessions> = ({ id,startDateTime, duration, coach, endDateTime , price}) => {

  return (
    <Item>
      <ListContainer>
        <TimeGroup>
          <Date>{date(startDateTime).format("D MMMM YYYY")}</Date>
          <Time>{date(startDateTime).format("HH:mm")}-{date(endDateTime).format("HH:mm")}</Time>
        </TimeGroup>
        <Price>{price} ₽</Price>
      </ListContainer>
    </Item>
  )
}


export const SuccessfullyBulked = () => {
  const coachInfo = useStore($bulkedSessionsForView)

  return (
    <Container>
      <Header>{coachInfo.length > 0 ?
        "Коучу был отправлен запрос на бронирование сессии" :
        "Что-то пошло не так " }

      </Header>
      <Description>{coachInfo.length > 0 ?
        "При подтверждении или отклонения запроса коучем мы оповестим вас по email" :
        "Не удалось произвести бронирование сессию.\n" +
              " Пожалуйста, попробуйте еще раз позже." }
      </Description>
      {coachInfo.length > 0 ?
        <>
          <ListContainer>
            <StyledAvatar src={coachInfo[0].coach.avatar} />
            <Name>{coachInfo[0].coach.firstName} {coachInfo[0].coach.lastName}</Name>
          </ListContainer>
          {useList($bulkedSessionsForView, session => (
            <StyledSessionItem {...session} />
          ))}
          <WarningTitle>
              Вы можете следить за статусом запросов в чате «Уведомления о сессиях»
          </WarningTitle>
        </>
        : null }
    </Container>
  )}

const Header = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  text-align: center;
  margin-top: 10px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const WarningTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #5B6670;
  margin-top: 85px;
  text-align: center;
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
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #efefef;
  padding: 12px 0;
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
  line-height: 24px;
  color: #424242;
  margin-left: 12px;
  flex: 1;

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
  `}
`

const Price = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  margin-left: 40px;
  flex: 1;

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
  `}
`

const TimeGroup = styled.div`
  display: flex;
  align-items: center;
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