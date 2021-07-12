import React from "react"
import { useEvent, useList, useStore } from "effector-react"
import styled from "styled-components"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import { Link } from "react-router-dom"
import {
  $bookedSessions,
  BookedSessionForViewType,
  toggleBookSessionsStatusModal,
} from "@/pages/search/content/list/content/modals/book-sessions-status-modal.model"
import { routeNames } from "@/pages/route-names"
import { navigatePush } from "@/feature/navigation"
import { parseFloatToString } from "@/lib/formatting/parsenumbers"
import { $userData } from "@/feature/user/user.model"

const StyledSessionItem: React.FC<BookedSessionForViewType> = ({ startDatetime, endDatetime, clientPrice }) => {
  return (
    <Item>
      <ListContainer>
        <TimeGroup>
          <Date>{date(startDatetime).format("D MMMM YYYY")}</Date>
          <Time>
            {date(startDatetime).format("HH:mm")}-{date(endDatetime).format("HH:mm")}
          </Time>
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
  const userData = useStore($userData)

  const pluralize = (plural: string, singular = "") => (bookedSessions.length > 1 ? plural : singular)

  const handleOnClick = () => {
    toggle()
    // @ts-ignore
    navigate({ url: routeNames.clientChat(userData.client.systemChat.toString()) })
  }

  return (
    <Container>
      <Header>
        Коучу был{`${pluralize("и")}`} отправлен{`${pluralize("ы")}`} запрос{`${pluralize("ы")}`} на бронирование сесси
        {`${pluralize("й", "и")}`}
      </Header>
      <Description>
        При подтверждении или отклонении запрос{`${pluralize("ов", "а")}`} коучем мы оповестим вас по email
      </Description>
      <CoachContainer>
        <Link to={routeNames.searchCoachPage(`${bookedSessions[0].coach.id}`)}>
          <StyledAvatar src={bookedSessions[0].coach.avatar} />
        </Link>
        <Name>
          {bookedSessions[0].coach.firstName} {bookedSessions[0].coach.lastName}
        </Name>
      </CoachContainer>
      {useList($bookedSessions, session => (
        <StyledSessionItem {...session} />
      ))}
      <WarningTitle>
        Вы можете следить за статусом запрос{`${pluralize("ов", "а")}`} в чате{" "}
        <StyledLink onClick={handleOnClick}>«Уведомления о сессиях»</StyledLink>
      </WarningTitle>
    </Container>
  )
}

const Failure = () => {
  return (
    <Container>
      <Header>Что-то пошло не так</Header>
      <Description>Не удалось произвести бронирование сессии. Пожалуйста, попробуйте еще раз позже.</Description>
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
  max-width: 500px;

  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 24px;
    max-width: 300px;
    margin-top: 32px;
  `}
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const CoachContainer = styled(ListContainer)`
  margin-bottom: 12px;
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
  color: #5b6670;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 24px;
  max-width: 400px;

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
    margin-top: 8px;
    max-width: 300px;
  `}
`

const WarningTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #5b6670;
  margin-top: 32px;
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
  margin-top: 12px;
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
