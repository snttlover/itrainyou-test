import React, { useState } from "react"
import { ChatSystemMessage } from "@/feature/chat/modules/chat-messages"
import styled from "styled-components"
import { SessionRequest, SessionRequestStatus, SessionRequestTypes } from "@/lib/api/coach/get-sessions-requests"
import {
  ConflictStatus,
  MessageSessionRequestStatuses,
  TransActionProperties,
  TransActionsStatus
} from "@/lib/api/chats/clients/get-chats"
import { date } from "@/lib/formatting/date"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { MediaRange } from "@/lib/responsive/media"
import {
  clientSessionRequests,
  coachSessionRequests,
  createSessionRequestsModule,
} from "@/feature/session-request/createSessionRequestsModule"
import { useEvent, useStore } from "effector-react"
import { Loader, Spinner } from "@/oldcomponents/spinner/Spinner"
import {
  $revocated,
  changeRevocationSessionId,
  changeRevocationUser,
} from "@/pages/client/session/content/session-page-content/cancel-session/session-revocation"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import { changeCurrentDenyCompletationRequest } from "@/pages/client/session/content/session-page-content/deny-completetion-dialog/deny-completation-dialog"
import { MessageUserHeader } from "@/feature/chat/view/content/messages/content/system/MessageUserHeader"

const dateFormat = "DD MMM YYYY"
const formatDate = (day: string) => date(day).format(dateFormat)

const formatSessionDay = (day?: ISODate) => date(day).format("DD MMM YYYY")

export const formatSessionTime = (start?: ISODate, end?: ISODate) =>
  date(start).format("HH:mm-") + date(end).format("HH:mm")

const formatSessionDate = (start?: ISODate, end?: ISODate) => {
  return formatSessionDay(start) + " " + formatSessionTime(start, end)
}

const getText = (
  request: SessionRequest | TransActionProperties,
  status: MessageSessionRequestStatuses | ConflictStatus | TransActionsStatus,
  chatType: "coach" | "client",
  commonSystemMessages?: boolean
) => {
  const is = (
    requestType: SessionRequestTypes | SessionRequestTypes[],
    requestStatus: SessionRequestStatus | SessionRequestStatus[] | TransActionsStatus | TransActionsStatus[],
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

  if (commonSystemMessages) {
    if (is("BOOK", "APPROVED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} подтвердил${request.receiverCoach?.sex === "F" ? "a" : ""} бронирование сессии. Средства на карте заморозятся за 24 часа до начала сессии`
    }

    if (is("BOOK", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не подтвердил${request.receiverCoach?.sex === "F" ? "a" : ""} запрос на бронирование сессии`
    }

    if (is("CANCEL", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не подтвердил${
        request.receiverCoach?.sex === "F" ? "а" : ""
      } отмену сессии. Сессия состоится`
    }

    if (is("RESCHEDULE", ["AWAITING", "APPROVED", "DENIED", "CANCELLED","AUTOMATICALLY_CANCELLED" ], "INITIATED")) {
      return `Вы хотите перенести сессию на ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }

    if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "APPROVED"], "COMPLETED") && request.initiatorCoach) {
      return `${request.initiatorCoach?.firstName} отменил${request.initiatorCoach?.sex === "F" ? "a" : ""}  сессию`
    }

    if (is("CANCEL", ["AUTOMATICALLY_APPROVED"], ["COMPLETED"]) && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отменил${request.receiverCoach?.sex === "F" ? "a" : ""} сессию`
    }

    if (is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED","AUTOMATICALLY_CANCELLED"], "INITIATED") && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отправил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на подтверждение сессии`
    }


    if (is("BOOK", "CANCELLED", "COMPLETED") && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отменил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на подтверждение сессии`
    }

    if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED","AUTOMATICALLY_CANCELLED"], "INITIATED")) {
      return `${request.initiatorClient?.firstName} отправил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на отмену сессии`
    }

    if (is("CANCEL", "CANCELLED", "COMPLETED")) {
      return `${request.initiatorClient?.firstName} отменил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на отмену сессии`
    }

    if (is("RESCHEDULE", ["AWAITING", "APPROVED", "DENIED", "CANCELLED","AUTOMATICALLY_CANCELLED"], "INITIATED")) {
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
        request.receiverClient?.sex === "F" ? "a" : ""
      } перенос сессии на  ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }

    if (is("CANCEL", ["AUTOMATICALLY_APPROVED","AUTOMATICALLY_CANCELLED"], ["COMPLETED", "INITIATED"]) && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отменил${request.initiatorClient?.sex === "F" ? "a" : ""} сессию`
    }

    if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED","AUTOMATICALLY_CANCELLED"], "INITIATED") && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отправил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на отмену сессии`
    }

  }

  if (chatType === "client") {
    if (status === "MONEY_HOLD_UNSUCCESSFUL") {
      return "Сессия отменена. Произошла ошибка при попытке списания денег с карты"
    }
      
    if (status === "MONEY_SUCCESSFULLY_HELD") {
      return "Деньги за сессию были списаны с карты."
    }
      
    if (status === "SOLVED_IN_COACH_FAVOUR") {
      return "Администратор решил спор в пользу коуча. Средства были списаны с карты"
    }

    if (status === "SOLVED_IN_CLIENT_FAVOUR") {
      return "Администратор решил спор в вашу пользу. Деньги на карте за сессию были возвращены"
    }

    if (is("BOOK", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
      return "Запрос на бронирование был автоматически отменен, так как коуч не ответил на запрос"
    }

    if (is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
      return "Вы отправили запрос на бронирование сессии"
    }

    if (is("BOOK", "CANCELLED", "COMPLETED")) {
      return "Вы отменили запрос на бронирование сессии"
    }

    if (is("BOOK", "APPROVED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} подтвердил${request.receiverCoach?.sex === "F" ? "a" : ""} бронирование сессии. Средства на карте будут списаны за 24 часа до начала сессии`
    }

    if (is("BOOK", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не подтвердил${request.receiverCoach?.sex === "F" ? "a" : ""} запрос на бронирование сессии`
    }

    if (is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
      return "Вы отправили запрос на отмену сессии"
    }

    if (is("CANCEL", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не подтвердил${
        request.receiverCoach?.sex === "F" ? "а" : ""
      } отмену сессии. Сессия состоится`
    }

    if (is("RESCHEDULE", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
      return `Вы хотите перенести сессию на ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }

    if (is("RESCHEDULE", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
      return "Запрос на перенос сессии был автоматически отменен, так как коуч не ответил на запрос"
    }

    if (is("RESCHEDULE", "CANCELLED", "COMPLETED")) {
      return `Вы отменили перенос сессии на ${formatDate(request.resultDatetime)}`
    }

    if (is("CANCEL", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
      return "Запрос на отмену сессии был автоматически отменен, так как коуч не ответил на запрос"
    }

    if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "APPROVED"], "COMPLETED") && request.initiatorCoach) {
      return `${request.initiatorCoach?.firstName} отменил${request.initiatorCoach?.sex === "F" ? "a" : ""}  сессию`
    }

    if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "APPROVED"], "COMPLETED")) {
      return "Сессия успешно отменена"
    }

    if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
      return "Вы запросили отмену сессии."
    }

    if (is("CANCEL", "CANCELLED", "COMPLETED")) {
      return "Вы отменили запрос на отмену сессии"
    }

    if (is("RESCHEDULE", "DENIED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} не согласил${
        request.receiverCoach?.sex === "F" ? "aсь" : "ся"
      } на перенос сессии, сессия остается в прежнее время `
    }

    if (is("CONFIRMATION_COMPLETION", "DENIED", "COMPLETED")) {
      return "Вы указали, что с сессий возникли проблемы. С Вами свяжется администратор в поддержке для уточнения"
    }

    if (
      is("CONFIRMATION_COMPLETION", ["APPROVED", "AUTOMATICALLY_APPROVED"], "COMPLETED") &&
      (request.session.isReviewed || $revocated.getState().indexOf(request.session.id) !== -1)
    ) {
      return "Сессия прошла успешно."
    }

    if (is("CONFIRMATION_COMPLETION", ["APPROVED", "AUTOMATICALLY_APPROVED"], "COMPLETED")) {
      return "Сессия прошла успешно. Средства были списаны с карты. Оставьте отзыв!"
    }

    if (is("CONFIRMATION_COMPLETION", ["AWAITING", "APPROVED", "DENIED", "AUTOMATICALLY_APPROVED"], "INITIATED")) {
      return "Сессия прошла успешно?"
    }

    if (is("CANCEL", "APPROVED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} согласил${
        request.receiverCoach?.sex === "F" ? "aсь" : "ся"
      } на отмену сессии`
    }

    if (is("RESCHEDULE", "APPROVED", "COMPLETED")) {
      return `${request.receiverCoach?.firstName} согласился на перенос сессии на ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }
  }

  if (chatType === "coach") {
      
    if (status === "MONEY_HOLD_UNSUCCESSFUL") {
      return `${request.enrolledClient?.firstName} отменил${request.enrolledClient?.sex === "F" ? "a" : ""} сессию.`
    }

    if (status === "MONEY_SUCCESSFULLY_HELD") {
      return "Сессия была подтверждена платформой."
    }
      
    if (is("CONFIRMATION_COMPLETION", "DENIED", "COMPLETED")) {
      return "Клиент указал, что с сессий возникли проблемы. С Вами свяжется администратор в поддержке для уточнения"
    }

    if (status === "SOLVED_IN_COACH_FAVOUR") {
      return "Администратор решил спорную ситуацию в вашу пользу. Вам были переведены деньги за сессию"
    }

    if (status === "SOLVED_IN_CLIENT_FAVOUR") {
      return "Администратор решил спорную ситуацию в пользу клиента. Клиенту были возвращены деньги за сессию"
    }

    if (is("CONFIRMATION_COMPLETION", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_APPROVED"], "INITIATED")) {
      return "Ожидаем, когда клиент подтвердит, что сессия завершена успешно, после чего вы получите оплату на следующий рабочий день.\n" +
              "У клиента есть 24 часа на подтверждение. Если в течение 24 часов клиент не даст подтверждение, система сделает это автоматически."
    }

    if (is("CONFIRMATION_COMPLETION", ["APPROVED", "AUTOMATICALLY_APPROVED"], "COMPLETED")) {
      return "Клиент подтвердил, что сессия прошла успешно! Вы получите оплату на следующий рабочий день"
    }

    if (is("CONFIRMATION_COMPLETION", "DENIED", "COMPLETED")) {
      return "Клиент указал, что с сессией возникли проблемы. С вами свяжется администратор для уточнения деталей."
    }

    if (is("CANCEL", ["AUTOMATICALLY_APPROVED"], ["COMPLETED"]) && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отменил${request.receiverCoach?.sex === "F" ? "a" : ""} сессию`
    }

    if (is("BOOK", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
      return "Запрос на бронирование был автоматически отменен из-за превышения времени ожидания"
    }

    if (is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED","AUTOMATICALLY_CANCELLED"], "INITIATED") && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отправил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на подтверждение сессии`
    }

    if (is("BOOK", "DENIED", "COMPLETED")) {
      return "Вы отклонили запрос на бронирование сессии"
    }

    if (is("BOOK", "CANCELLED", "COMPLETED") && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отменил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на подтверждение сессии`
    }

    if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
      return `${request.initiatorClient?.firstName} отправил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на отмену сессии`
    }

    if (is("CANCEL", "CANCELLED", "COMPLETED")) {
      return `${request.initiatorClient?.firstName} отменил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на отмену сессии`
    }

    if (is("CANCEL", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
      return "Запрос на отмену сессии был автоматически отменен из-за превышения времени ожидания"
    }

    if (is("BOOK", "APPROVED", "COMPLETED")) {
      return "Вы подтвердили бронирование сессии"
    }

    if (is("RESCHEDULE", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
      return `${request.initiatorClient?.firstName} хочет перенести сессию на ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }

    if (is("RESCHEDULE", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
      return "Запрос на перенос сессии был автоматически отменен из-за превышения времени ожидания"
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
        request.receiverClient?.sex === "F" ? "a" : ""
      } перенос сессии на  ${formatSessionDate(
        request.rescheduleSession?.startDatetime,
        request.rescheduleSession?.endDatetime
      )}`
    }

    if (is("CANCEL", ["AUTOMATICALLY_APPROVED","AUTOMATICALLY_CANCELLED"], ["COMPLETED", "INITIATED"]) && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отменил${request.initiatorClient?.sex === "F" ? "a" : ""} сессию`
    }

    if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED"], "INITIATED") && request.initiatorClient) {
      return `${request.initiatorClient?.firstName} отправил${
        request.initiatorClient?.sex === "F" ? "a" : ""
      } запрос на отмену сессии`
    }

    if (is("CANCEL", ["AUTOMATICALLY_APPROVED","AUTOMATICALLY_CANCELLED"], ["COMPLETED", "INITIATED"])) {
      return " Вы отменили сессию. Сессии не будет."
    }

    if (is("CANCEL", "APPROVED", "COMPLETED")) {
      return " Вы подтвердили отмену сессии. Сессии не будет."
    }

    if (is("CANCEL", "DENIED", "COMPLETED")) {
      return "Вы не подтвердили отмену сессии. Сессия будет."
    }
  }

  return (
    <b>
      {request.type} - {request.status} - {status}
    </b>
  )
}

export const SystemMessageSwitcher = ({
  message,
  isSystemChat, commonSystemMessages
}: {
  isSystemChat: boolean
  message: ChatSystemMessage
  commonSystemMessages?: boolean
}) => {
  const text = getText(message.request, message.status, message.chatType, commonSystemMessages)
  let Buttons = getSystemButtons(message.request, message.chatType, message.showButtons, message.status, {
    name: message.userName,
    avatar: message.userAvatar || "",
  })

  if (commonSystemMessages) {
    Buttons = <></>
  }

  return (
    <>
      <MessageUserHeader showUser={isSystemChat} name={message.userName} avatar={message.userAvatar} date={message.date} />
      <SystemMessage
        id={message.id}
        text={text}
        startDate={message.request.session?.startDatetime}
        endDate={message.request.session?.endDatetime}
      >
        {Buttons}
      </SystemMessage>
    </>
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
    <StyledSystemMessage id={props.id as never}>
      <SessionDate>
        <SessionDay>{formatSessionDay(props.startDate)}</SessionDay>
        <SessionTime>{formatSessionTime(props.startDate, props.endDate)}</SessionTime>
      </SessionDate>
      <Message>{props.text}</Message>
      {props.children}
    </StyledSystemMessage>
  )
}

const SessionDay = styled.div`
  margin-right: 2px;
`

const SessionTime = styled.div`
  font-weight: 500;
  ${MediaRange.lessThan("tablet")`
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
  ${MediaRange.lessThan("mobile")`
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

  ${MediaRange.lessThan("tablet")`
    flex-direction: column;
    width: 90px;
  `}
  ${MediaRange.lessThan("mobile")`
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
  ${MediaRange.lessThan("mobile")`
    padding: 10px 16px;
    padding-top: 4px;
  `}
`

type User = { name: string; avatar: string }

const getSystemButtons = (
  request: SessionRequest | TransActionProperties,
  chatType: "coach" | "client",
  showButtons: boolean,
  status: MessageSessionRequestStatuses | ConflictStatus | TransActionsStatus,
  user: User
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

  if (showButtons) {
    const requestModule = chatType === "client" ? clientSessionRequests : coachSessionRequests
    const deny = useEvent(requestModule.methods.deny)
    const approve = useEvent(requestModule.methods.approve)

    if (chatType === "client") {
      if (is("CONFIRMATION_COMPLETION", "AWAITING")) {
        return <ConfirmationCompletation approve={() => approve(request.id)} request={request} />
      }

      if (is("BOOK", "AWAITING") || is("RESCHEDULE", "AWAITING")) {
        return <CancelAction request={request} requestsModule={requestModule} />
      }
    }

    if (chatType === "coach") {
      if (is("BOOK", "AWAITING") || is("RESCHEDULE", "AWAITING") || is("CANCEL", "AWAITING")) {
        return (
          <ApproveActions
            approve={() => approve(request.id)}
            deny={() => deny({ id: request.id })}
            yes='Подтвердить'
            no='Отклонить'
          />
        )
      }
    }
  }

  if (
    chatType === "client" &&
          is("CONFIRMATION_COMPLETION", ["AUTOMATICALLY_APPROVED", "APPROVED"]) && !request.session.isReviewed &&
    status === "COMPLETED"
  ) {
    return <RevocationButton coach={user} sessionId={request.session.id} />
  }

  return <></>
}

type ConfirmationCompletationTypes = {
  approve: () => void
  request: SessionRequest | TransActionProperties
}

const ConfirmationCompletation = ({ approve, request }: ConfirmationCompletationTypes) => {
  const setDenyCompletetaionRequest = useEvent(changeCurrentDenyCompletationRequest)
  const [loading, change] = useState(false)

  return (
    <StyledActions>
      {loading && <StyledActionLoader />}
      <Button
        onClick={() => {
          change(true)
          approve()
        }}
      >
        Да
      </Button>
      <Button onClick={() => setDenyCompletetaionRequest(request)}>Нет</Button>
    </StyledActions>
  )
}

const Actions = ({
  children,
  withoutLoader,
}: {
  withoutLoader?: boolean
  children: React.ReactChild | React.ReactChild[]
}) => {
  const [loading, change] = useState(false)

  const clickHandler = () => {
    if (!withoutLoader) {
      change(true)
    }
  }

  return <StyledActions onClick={() => clickHandler()}>{!loading ? children : <StyledActionLoader />}</StyledActions>
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

  ${MediaRange.lessThan("mobile")`
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

  ${MediaRange.lessThan("mobile")`
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
  request: SessionRequest | TransActionProperties
  requestsModule: ReturnType<typeof createSessionRequestsModule>
}

type ApproveActionsTypes = {
  yes: string
  no: string
  approve: () => any
  deny: () => any
}

const ApproveActions = ({ yes, no, approve, deny }: ApproveActionsTypes) => {
  return (
    <Actions>
      <Button onClick={approve}>{yes}</Button>
      <Button onClick={deny}>{no}</Button>
    </Actions>
  )
}

const CancelAction = ({ request, requestsModule }: SessionRequestActionProps) => {
  const cancel = useEvent(requestsModule.methods.deny)
  return (
    <Actions>
      <Button onClick={() => cancel({ id: request.id })}>Отменить</Button>
    </Actions>
  )
}

const RevocationButton = ({ sessionId, coach }: { sessionId: number; coach: null | User }) => {
  const changeId = useEvent(changeRevocationSessionId)
  const changeUser = useEvent(changeRevocationUser)
  const revocated = useStore($revocated)

  const openDialog = () => {
    changeUser(coach)
    changeId(sessionId)
  }

  if (revocated.indexOf(sessionId) !== -1) {
    return null
  }

  return (
    <Actions withoutLoader={true}>
      <Button onClick={openDialog}>Отзыв</Button>
    </Actions>
  )
}
