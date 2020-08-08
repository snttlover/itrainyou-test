import React from "react"
import { ChatSystemMessage } from "@/feature/chat/modules/chat-messages"
import styled from "styled-components"
import { SessionRequest, SessionRequestStatus, SessionRequestTypes } from "@/lib/api/coach/get-sessions-requests"
import { MessageSessionRequestStatuses } from "@/lib/api/chats/clients/get-chats"
import { date } from "@/lib/formatting/date"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { MediaRange } from "@/lib/responsive/media"

const dateFormat = `DD MMM YYYY`
const formatDate = (day: string) => date(day).format(dateFormat)

const formatSessionDay = (day?: ISODate) => date(day).format(`DD MMM YYYY`)

const formatSessionTime = (start?: ISODate, end?: ISODate) => date(start).format(`HH:mm -`) + date(end).format(`HH:mm`)

const formatSessionDate = (start?: ISODate, end?: ISODate) => {
  return formatSessionDay(start) + ` ` + formatSessionTime(start, end)
}

const getText = (request: SessionRequest, status: MessageSessionRequestStatuses, chatType: "coach" | "client") => {
  const is = (
    requestType: SessionRequestTypes | SessionRequestTypes[],
    requestStatus: SessionRequestStatus | SessionRequestStatus[],
    messageStatus: MessageSessionRequestStatuses | MessageSessionRequestStatuses[]
  ) => {
    const checkStatus = (value: string, statuses: string | string[]) => {
      return Array.isArray(statuses) ? statuses.includes(value) : value === statuses
    }

    return (
      checkStatus(request.status, requestStatus) &&
      checkStatus(request.type, requestType) &&
      checkStatus(status, messageStatus)
    )
  }

  if (chatType === `client`) {
    if (is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED"], "INITIATED")) {
      return `Вы отправили запрос на бронирование сессии`
    }

    if (is("BOOK", "CANCELLED", "COMPLETED")) {
      return `Вы отменили запрос на бронирование сессии`
    }

    if (is("BOOK", "APPROVED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} подтвердил бронирование сессии`
    }

    if (is("BOOK", "CANCELLED", "INITIATED")) {
      return `Вы отправили запрос на отмену сессии`
    }

    if (is("CANCEL", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не подтвердил${
        request.receiverCoach?.sex === `F` ? `a` : ``
      } запрос на бронирование сессии`
    }

    if (is("RESCHEDULE", "AWAITING", "INITIATED")) {
      return `Вы хотите перенести сессию на ${formatDate(request.resultDatetime)}`
    }

    if (is("RESCHEDULE", "CANCELLED", "COMPLETED")) {
      return `Вы отменили перенос сессии на ${formatDate(request.resultDatetime)}`
    }

    if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "APPROVED"], ["COMPLETED", "INITIATED"])) {
      return `Вы отменили сессию`
    }

    if (is("CANCEL", "AWAITING", "INITIATED")) {
      return `Вы хотите отменить сессию. До сессии меньше 24 часов, поэтому ждем подтверждения коуча.`
    }

    if (is("CANCEL", "AUTOMATICALLY_APPROVED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} отменил${request.receiverCoach?.sex === `F` ? `a` : ``} сессию`
    }

    if (is("RESCHEDULE", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не согласил${
        request.receiverCoach?.sex === `F` ? `aсь` : `ся`
      } на перенос сессии, сессия остается в прежнее время `
    }

    if (is("CONFIRMATION_COMPLETION", "AWAITING", "INITIATED")) {
      return `Сессия прошла успешно?`
    }

    if (is("CONFIRMATION_COMPLETION", "APPROVED", "COMPLETED")) {
      return `Сессия прошла успешно. Оставьте отзыв!`
    }

    if (is("CANCEL", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не согласился на отмену сессии`
    }

    if (is("CANCEL", "DENIED", "INITIATED")) {
      return `Вы отправили запрос на отмену сессии`
    }

    if (is("CANCEL", "APPROVED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} согласил${
        request.receiverCoach?.sex === `F` ? `aсь` : `ся`
      } на отмену сессии`
    }

    if (is("RESCHEDULE", "APPROVED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} согласился на перенос сессии на ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }
  }

  if (chatType === `coach`) {
    if (is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED"], "INITIATED") && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отправил${
        request.initiatorClient?.sex === `F` ? `a` : ``
      } запрос на подтверждение сессии`
    }

    if (is("BOOK", "DENIED", "COMPLETED")) {
      return `Вы отклонили запрос на бронирование сессии`
    }

    if (is("BOOK", "CANCELLED", "COMPLETED") && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отменил${
        request.initiatorClient?.sex === `F` ? `a` : ``
      } запрос на подтверждение сессии`
    }

    if (is("CANCEL", ["APPROVED", "CANCELLED", "DENIED"], "INITIATED")) {
      return `${request.initiatorClient?.firstName} отправил${
        request.initiatorClient?.sex === `F` ? `a` : ``
      } запрос на отмену сессии`
    }

    if (is("CANCEL", "CANCELLED", "COMPLETED")) {
      return `${request.initiatorClient?.firstName} отменил${
        request.initiatorClient?.sex === `F` ? `a` : ``
      } запрос на отмену сессии`
    }

    if (is("BOOK", "APPROVED", "COMPLETED")) {
      return `Вы подтвердили бронирование сессии`
    }

    if (is("RESCHEDULE", "AWAITING", "INITIATED")) {
      return `${request.initiatorClient?.firstName} хочет перенести сессию на ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }

    if (is("RESCHEDULE", "DENIED", "COMPLETED")) {
      return `Вы отклонили перонос сессии на ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }

    if (is("RESCHEDULE", "APPROVED", "COMPLETED")) {
      return `Вы подтвердили перонос сессии на ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }

    if (is("RESCHEDULE", "CANCELLED", "COMPLETED")) {
      return `${request.receiverClient?.firstName} отменил${
        request.receiverClient?.sex === `F` ? `a` : ``
      } перенос сессии на  ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }

    if (is("CANCEL", "AUTOMATICALLY_APPROVED", ["COMPLETED", "INITIATED"]) && request.receiverClient) {
      return `${request.receiverClient?.firstName} отменил${request.receiverClient?.sex === `F` ? `a` : ``} сессию`
    }

    if (is("CANCEL", "AUTOMATICALLY_APPROVED", ["COMPLETED", "INITIATED"])) {
      return ` Вы отменили сессию. Сессии не будет.`
    }

    if (is("CANCEL", "AWAITING", "INITIATED")) {
      return `${request.initiatorClient?.firstName} отправил${
        request.initiatorClient?.sex === `F` ? `a` : ``
      } запрос на отмену сессии`
    }

    if (is("CANCEL", "APPROVED", "COMPLETED")) {
      return ` Вы подтвердили отмену сессии. Сессии не будет.`
    }

    if (is("CANCEL", "DENIED", "COMPLETED")) {
      return `Вы не подтвердили отмену сессии. Сессия будет.`
    }
  }

  return (
    <b>
      {request.type} - {request.status} - {status}
    </b>
  )
}

export const SystemMessageSwitcher = ({ message }: { message: ChatSystemMessage }) => {
  const text = getText(message.request, message.status, message.chatType)

  return (
    <SystemMessage
      text={text}
      startDate={message.request.rescheduleSession?.startDatetime}
      endDate={message.request.rescheduleSession?.endDatetime}
    />
  )
}

type SystemMessageTypes = {
  text: string | React.ReactChild | React.ReactChild[]
  startDate?: ISODate
  endDate?: ISODate
  children?: React.ReactChild | React.ReactChild[]
}

const SystemMessage = (props: SystemMessageTypes) => {
  return (
    <StyledSystemMessage>
      <SessionDate>
        <SessionDay>{formatSessionDay(props.startDate)}</SessionDay>
        <SessionTime>{formatSessionTime(props.startDate, props.endDate)}</SessionTime>
      </SessionDate>
      <Message>{props.text}</Message>
      {props.children}
    </StyledSystemMessage>
  )
}

const SessionDay = styled.div``
const SessionTime = styled.div`
  font-weight: 500;
  margin-left: 3px;
  ${MediaRange.lessThan(`tablet`)`
    margin-left: 0;
  `}
`

const StyledSystemMessage = styled.div`
  border-radius: 24px;
  border: 2px solid ${props => props.theme.colors.primary};
  display: flex;
  margin-bottom: 16px;
  margin-left: -10px;
  width: calc(100% + 20px);
  ${MediaRange.lessThan(`mobile`)`
    flex-direction: column;
    width: 100%;
    margin-left: 0;
  `}
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

  ${MediaRange.lessThan(`tablet`)`
    flex-direction: column;
    width: 90px;
  `}
  ${MediaRange.lessThan(`mobile`)`
    width: 100%;
    border-right: 0;
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px 16px;
    padding-bottom: 0;
  `}
`

const Message = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 12px;

  font-size: 12px;
  line-height: 16px;
  color: #424242;
  ${MediaRange.lessThan(`mobile`)`
    padding: 10px 16px;
    padding-top: 4px;
  `}
`
