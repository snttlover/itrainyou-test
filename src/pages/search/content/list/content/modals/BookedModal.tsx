import React from "react"
import { useEvent, useList, useStore } from "effector-react"
import styled from "styled-components"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { Avatar } from "@/components/avatar/Avatar"
import {
  $bookedSessions,
  BookedSessionForViewType, toggleBookSessionsStatusModal
} from "@/pages/search/content/list/content/modals/book-sessions-status-modal.model"
import { routeNames } from "@/pages/route-names"
import { navigatePush } from "@/feature/navigation"
import { parseFloatToString } from "@/lib/formatting/parsenumbers"

const StyledSessionItem: React.FC<BookedSessionForViewType> = ({ startDatetime, endDatetime, clientPrice}) => {
  return (
    <Item>
      <ListContainer>
        <TimeGroup>
          <Date>{date(startDatetime).format("D MMMM YYYY")}</Date>
          <Time>{date(startDatetime).format("HH:mm")}-{date(endDatetime).format("HH:mm")}</Time>
        </TimeGroup>
        <Price>{parseFloatToString(clientPrice)} ₽</Price>
      </ListContainer>
    </Item>
  )
}

const Success = () => {
  const bookedSessions = useStore($bookedSessions)
  const navigate = useEvent(navigatePush)
  const toggle = useEvent(toggleBookSessionsStatusModal)

  const pluralize = (plural: string, singular="") => bookedSessions.length > 1 ? plural: singular

  const handleOnClick = () => {
    toggle()
    navigate({ url: routeNames.clientChat("system")})
  }

  return (
    <Container>
      <Header>
        Коучу был{`${pluralize("и")}`} отправлен{`${pluralize("ы")}`} запрос{`${pluralize("ы")}`}
        {" "}на бронировани{`${pluralize("я", "е")}`} сесси{`${pluralize("й", "и")}`}
      </Header>
      <Description>
        При подтверждении или отклонения запрос{`${pluralize("ов", "а")}`} коучем мы оповестим вас по email
      </Description>
      <ListContainer>
        <StyledAvatar src={bookedSessions[0].coach.avatar} />
        <Name>{bookedSessions[0].coach.firstName} {bookedSessions[0].coach.lastName}</Name>
      </ListContainer>
      {useList($bookedSessions, session => (
        <StyledSessionItem {...session} />
      ))}
      <WarningTitle>
        Вы можете следить за статусом запрос{`${pluralize("ов", "а")}`}
        {" "}в чате <StyledLink onClick={handleOnClick}>«Уведомления о сессях»</StyledLink>
      </WarningTitle>
    </Container>
  )
  
}

const Failure = () => {
  
  return (
    <Container>
      <Header>
                    Что-то пошло не так
      </Header>
      <Description>
                    Не удалось произвести бронирование сессии.
                    Пожалуйста, попробуйте еще раз позже.
      </Description>
    </Container>
  )
}

export const BookedModal = () => {
  const bookedSessions = useStore($bookedSessions)
  return bookedSessions.length > 0 ? <Success /> : <Failure />
}

const Header = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  color: #424242;
  text-align: center;
  margin-top: 10px;
  max-width: 300px;
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
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #5B6670;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 35px;
  max-width: 400px;

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
  `}
`

const WarningTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #5B6670;
  margin-top: 85px;
  text-align: center;
  max-width: 400px;

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
  `}
`

const StyledLink = styled.div`
  color: #424242;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
`

const Date = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

const Time = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #9aa0a6;
  margin-left: 8px;
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
`

const Name = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  margin-left: 12px;
  flex: 1;
`

const Price = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  margin-left: 40px;
  flex: 1;
`

const TimeGroup = styled.div`
  display: flex;
  align-items: center;
`