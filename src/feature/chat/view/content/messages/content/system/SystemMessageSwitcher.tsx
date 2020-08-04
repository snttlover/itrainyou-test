import React from "react"
import { ChatSystemMessage } from "@/feature/chat/modules/chat-messages"
import styled from "styled-components"
import { SessionRequest, SessionRequestStatus, SessionRequestTypes } from "@/lib/api/coach/get-sessions-requests"
import { MessageSessionRequestStatuses } from "@/lib/api/chats/clients/get-chats"
import { date } from "@/lib/formatting/date"

const dateFormat = `DD MMM YYYY`
const formatDate = (day: string) => date(day).format(dateFormat)

const formatSessionDate = (start: string | undefined, end: string | undefined) => {
  return date(start).format(`DD MMM YYYY HH:mm -`) + date(end).format(`HH:mm`)
}

const getText = (request: SessionRequest, status: MessageSessionRequestStatuses, chatType: "coach" | "client") => {
  const is = (
    requestType: SessionRequestTypes,
    requestStatus: SessionRequestStatus,
    messageStatus: MessageSessionRequestStatuses
  ) => {
    return request.status === requestStatus && request.type === requestType && messageStatus === status
  }

  if (chatType === `client`) {
    if (is("BOOK", "AWAITING", "INITIATED")) {
      return `Вы отправили запрос на бронирование сессии`
    }

    if (is("BOOK", "CANCELLED", "COMPLETED")) {
      return `Вы отменили запрос на бронирование сессии`
    }

    if (is("BOOK", "APPROVED", "COMPLETED")) {
      return `${request.receiverCoach.firstName} подтвердил бронирование сессии`
    }

    if (is("RESCHEDULE", "AWAITING", "INITIATED")) {
      return `Вы хотите перенести сессию на ${formatDate(request.resultDatetime)}`
    }

    if (is("RESCHEDULE", "CANCELLED", "COMPLETED")) {
      return `Вы отменили перенос сессии на ${formatDate(request.resultDatetime)}`
    }

    if (is("CANCEL", "AUTOMATICALLY_APPROVED", "COMPLETED")) {
      return `Вы отменили сессию`
    }

    if (is("CANCEL", "APPROVED", "COMPLETED")) {
      return `Вы отменили сессию`
    }

    if (is("CANCEL", "AWAITING", "INITIATED")) {
      return `Вы хотите отменить сессию. До сессии меньше 24 часов, поэтому ждем подтверждения коуча.`
    }

    if (is("CANCEL", "AUTOMATICALLY_APPROVED", "COMPLETED")) {
      return `${request.receiverCoach.firstName} отменил сессию`
    }

    if (is("RESCHEDULE", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach.firstName} не согласился на перенос сессии, сессия остается в прежнее время `
    }

    if (is("CONFIRMATION_COMPLETION", "AWAITING", "INITIATED")) {
      return `Сессия прошла успешно?`
    }

    if (is("CONFIRMATION_COMPLETION", "APPROVED", "COMPLETED")) {
      return `Сессия прошла успешно. Оставьте отзыв!`
    }

    if (is("CANCEL", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach.firstName} не согласился на отмену сессии`
    }

    if (is("RESCHEDULE", "APPROVED", "COMPLETED")) {
      return `${request.receiverCoach.firstName} согласился на перенос сессии на ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }
  }

  return ``
}

export const SystemMessageSwitcher = ({ message }: { message: ChatSystemMessage }) => {
  const text = getText(message.request, message.status, message.chatType)
  const date = formatSessionDate(
    message.request.rescheduleSession?.startDatetime,
    message.request.rescheduleSession?.endDatetime
  )

  return <SystemMessage text={text} date={date} />
}

const Container = styled.div``

type SystemMessageTypes = {
  text: string
  date: string
  children?: React.ReactChild | React.ReactChild[]
}

const SystemMessage = (props: SystemMessageTypes) => {
  return (
    <StyledSystemMessage>
      <SessionDate>{props.date}</SessionDate>
      <Message>{props.text}</Message>
      {props.children}
    </StyledSystemMessage>
  )
}

const StyledSystemMessage = styled.div`
  border-radius: 24px;
  border: 2px solid ${props => props.theme.colors.primary};
  display: flex;
`

const SessionDate = styled.div`
  border-right: 2px solid ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 158px;

  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;
`

const Message = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 12px;

  font-size: 12px;
  line-height: 16px;
  color: #424242;
`
