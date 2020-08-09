import React, { useState } from "react"
import { ChatSystemMessage } from "@/feature/chat/modules/chat-messages"
import styled from "styled-components"
import { SessionRequest, SessionRequestStatus, SessionRequestTypes } from "@/lib/api/coach/get-sessions-requests"
import { MessageSessionRequestStatuses } from "@/lib/api/chats/clients/get-chats"
import { date } from "@/lib/formatting/date"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { MediaRange } from "@/lib/responsive/media"
import {
  clientSessionRequests,
  coachSessionRequests,
  createSessionRequestsModule,
} from "@/feature/session-request/createSessionRequestsModule"
import { useEvent } from "effector-react/ssr"
import { Loader, Spinner } from "@/components/spinner/Spinner"

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

    if (is("BOOK", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не подтвердил запрос на бронирование сессии`
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

    if (is("CANCEL", "CANCELLED", "INITIATED")) {
      return `Вы хотите отменить сессию. До сессии меньше 24 часов, поэтому ждем подтверждения коуча.`
    }

    if (is("CANCEL", "CANCELLED", "COMPLETED")) {
      return `Вы отменили запрос на отмену сессии`
    }

    if (is("CANCEL", "AUTOMATICALLY_APPROVED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} отменил${request.receiverCoach?.sex === `F` ? `a` : ``} сессию`
    }

    if (is("RESCHEDULE", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не согласил${
        request.receiverCoach?.sex === `F` ? `aсь` : `ся`
      } на перенос сессии, сессия остается в прежнее время `
    }

    if (is("CONFIRMATION_COMPLETION", ["APPROVED", "DENIED", "AUTOMATICALLY_APPROVED"], "INITIATED")) {
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
    if (is("CANCEL", ["AUTOMATICALLY_APPROVED"], ["COMPLETED"]) && request.initiatorClient) {
      return `${request.receiverCoach?.firstName} отменил${request.receiverCoach?.sex === `F` ? `a` : ``} сессию`
    }

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
  const Buttons = getSystemButtons(message.request, message.status, message.chatType)

  return (
    <SystemMessage
      id={message.id}
      text={text}
      startDate={message.request.rescheduleSession?.startDatetime}
      endDate={message.request.rescheduleSession?.endDatetime}
    >
      {Buttons}
    </SystemMessage>
  )
}

type SystemMessageTypes = {
  id: number
  text: string | React.ReactChild | React.ReactChild[]
  startDate?: ISODate
  endDate?: ISODate
  children?: React.ReactChild | React.ReactChild[]
}

const SystemMessage = (props: SystemMessageTypes) => {
  return (
    <StyledSystemMessage id={props.id}>
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

const StyledSystemMessage = styled.div<{ id: number }>`
  border-radius: 24px;
  border: 2px solid ${props => props.theme.colors.primary};
  display: flex;
  margin-bottom: 16px;
  margin-left: -10px;
  width: calc(100% + 20px);
  position: relative;
  overflow: hidden;
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

const getSystemButtons = (
  request: SessionRequest,
  status: MessageSessionRequestStatuses,
  chatType: "coach" | "client"
) => {
  const is = (
    requestType: SessionRequestTypes | SessionRequestTypes[],
    requestStatus: SessionRequestStatus | SessionRequestStatus[]
  ) => {
    const checkStatus = (value: string, statuses: string | string[]) => {
      return Array.isArray(statuses) ? statuses.includes(value) : value === statuses
    }

    return checkStatus(request.status, requestStatus) && checkStatus(request.type, requestType)
  }

  if (status !== `COMPLETED`) {
    const requestModule = chatType === `client` ? clientSessionRequests : coachSessionRequests

    if (chatType === `client`) {
      if (is("CONFIRMATION_COMPLETION", "AWAITING")) {
        return <ApproveActions request={request} requestsModule={requestModule} yes='Да' no='Нет' />
      }

      if (is("BOOK", "AWAITING") || is("RESCHEDULE", "AWAITING")) {
        return <CancelAction request={request} requestsModule={requestModule} />
      }

      if (is("CONFIRMATION_COMPLETION", "APPROVED")) {
        return <RevocationButton />
      }
    }

    if (chatType === `coach`) {
      if (is("BOOK", "AWAITING") || is("RESCHEDULE", "AWAITING") || is("CANCEL", "AWAITING")) {
        return <ApproveActions request={request} requestsModule={requestModule} yes='Подтвердить' no='Отклонить' />
      }
    }
  }

  return <></>
}

const Actions = ({ children }: { children: React.ReactChild | React.ReactChild[] }) => {
  const [loading, change] = useState(false)

  return <StyledActions onClick={() => change(true)}>{!loading ? children : <StyledActionLoader />}</StyledActions>
}

const StyledActionLoader = styled(Spinner)`
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  ${Loader} {
    width: 100px;
    height: 100px;
  }
`

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 2px solid ${props => props.theme.colors.primary};
  width: 100px;
  position: relative;
  overflow: hidden;

  ${MediaRange.lessThan(`mobile`)`
    border-left: 0;
    border-top: 2px solid ${props => props.theme.colors.primary};
    min-height: 36px  ;
    width: 100%;
    flex-direction: row;
  `}
`

const Button = styled.div`
  cursor: pointer;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.theme.colors.primary};
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  ${MediaRange.lessThan(`mobile`)`
    border-bottom: 0;
    border-right: 2px solid ${props => props.theme.colors.primary};
  
    &:last-child {
      border-right: none;
    }
  `}
  &:after {
    opacity: 0;
    transition: 300ms;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    content: "";
    background: ${props => props.theme.colors.primary};
  }

  &:hover:after {
    opacity: 0.1;
  }
  &:active:after {
    opacity: 0.2;
  }
`

type SessionRequestActionProps = {
  request: SessionRequest
  requestsModule: ReturnType<typeof createSessionRequestsModule>
}

type ApproveActionsTypes = SessionRequestActionProps & {
  yes: string
  no: string
}

const ApproveActions = ({ request, requestsModule, yes, no }: ApproveActionsTypes) => {
  const deny = useEvent(requestsModule.methods.deny)
  const approve = useEvent(requestsModule.methods.approve)

  return (
    <Actions>
      <Button onClick={() => approve(request.id)}>{yes}</Button>
      <Button onClick={() => deny(request.id)}>{no}</Button>
    </Actions>
  )
}

const CancelAction = ({ request, requestsModule }: SessionRequestActionProps) => {
  const cancel = useEvent(requestsModule.methods.deny)
  return (
    <Actions>
      <Button onClick={() => cancel(request.id)}>Отклонить</Button>
    </Actions>
  )
}

const RevocationButton = () => {
  return (
    <Actions>
      <Button>Отзыв</Button>
    </Actions>
  )
}
