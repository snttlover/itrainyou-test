import React, { useState } from "react"
import { ChatSystemMessage } from "@/feature/chat/modules/chat-messages"
import styled from "styled-components"
import { SessionRequest, SessionRequestStatus, SessionRequestTypes } from "@/lib/api/coach/get-sessions-requests"
import {
  ConflictStatus,
  MessageSessionRequestStatuses,
  TransActionProperties,
  TransActionsStatus,
  FreeSessionClientMessage,
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
import { Loader, Spinner } from "@/old-components/spinner/Spinner"
import {
  $revocated,
  changeRevocationSessionId,
  changeRevocationUser,
} from "@/pages/client/session/content/session-page-content/cancel-session/session-revocation"
import { Avatar } from "@/old-components/avatar/Avatar"
import {
  changeCurrentDenyCompletationRequest,
  changeDenyOptions,
} from "@/pages/client/session/content/session-page-content/deny-completetion-dialog/deny-completation-dialog"
import { MessageUserHeader } from "@/feature/chat/view/content/messages/content/system/MessageUserHeader"
import { Link, useHistory } from "react-router-dom"
import { Button } from "@/new-components/button/Button"
import { Icon } from "@/old-components/icon/Icon"

const dateFormat = "DD MMM YYYY"
const formatDate = (day: string) => date(day).format(dateFormat)

const formatSessionDay = (day?: ISODate) => date(day).format("DD MMM YYYY")

export const formatSessionTime = (start?: ISODate, end?: ISODate) =>
  date(start).format("HH:mm-") + date(end).format("HH:mm")

const formatSessionDate = (start?: ISODate, end?: ISODate) => {
  return formatSessionDay(start) + " " + formatSessionTime(start, end)
}

const getText = (
  systemMessageType: FreeSessionClientMessage,
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

  if (systemMessageType) {
    if (systemMessageType === "BOOK_PAID_SESSION") {
      return `Выберете удобное для вас время.
          Коуч ${request.session.coach.firstName} ${request.session.coach.lastName} ждет новое бронирование и готов работать на результат.`
    } else if (systemMessageType === "CHOOSE_NEW_COACH") {
      return "Не подошел коуч? Забронируйте бесплатную сессию с другим"
    } else if (systemMessageType === "FREE_SESSION_LIMIT_ENDED") {
      return (
        <p>
          Вы использовали все доступные бесплатные сессии. Теперь вы знаете, над чем вам нужно работать. Найдите своего
          коуча <UnderLine to='/client'>здесь</UnderLine> и забронируйте платную сессию.{" "}
        </p>
      )
    }
  } else {
    if (commonSystemMessages) {
      if (is("BOOK", "APPROVED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} подтвердил${
          request.receiverCoach?.sex === "F" ? "a" : ""
        } бронирование сессии. Средства на карте заморозятся за 24 часа до начала сессии`
      }

      if (is("BOOK", "DENIED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} не подтвердил${
          request.receiverCoach?.sex === "F" ? "a" : ""
        } запрос на бронирование сессии`
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

      if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "APPROVED"], "COMPLETED") && request.initiatorCoach) {
        return `${request.initiatorCoach?.firstName} отменил${request.initiatorCoach?.sex === "F" ? "a" : ""}  сессию`
      }

      if (is("CANCEL", ["AUTOMATICALLY_APPROVED"], ["COMPLETED"]) && request.initiatorClient) {
        return `${request.initiatorClient?.firstName} отменил${request.receiverCoach?.sex === "F" ? "a" : ""} сессию`
      }

      if (
        is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED") &&
        request.initiatorClient
      ) {
        return `${request.initiatorClient?.firstName} отправил${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } запрос на подтверждение сессии`
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

      if (is("RESCHEDULE", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
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

      if (
        is("CANCEL", ["AUTOMATICALLY_APPROVED", "AUTOMATICALLY_CANCELLED"], ["COMPLETED", "INITIATED"]) &&
        request.initiatorClient
      ) {
        return `${request.initiatorClient?.firstName} отменил${request.initiatorClient?.sex === "F" ? "a" : ""} сессию`
      }

      if (
        is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED") &&
        request.initiatorClient
      ) {
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

      if (
        is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED") &&
        request.session.durationType === "PROMO"
      ) {
        return "Вы отправили запрос на бронирование бесплатной сессии"
      }

      if (is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return "Вы отправили запрос на бронирование сессии"
      }

      if (is("BOOK", "CANCELLED", "COMPLETED")) {
        return "Вы отменили запрос на бронирование сессии"
      }

      if (is("BOOK", "APPROVED", "COMPLETED")) {
        if (request.session.durationType === "PROMO") {
          return (
            <p>
              {request.receiverCoach?.firstName} подтвердил{request.receiverCoach?.sex === "F" ? "a" : ""} бронирование{" "}
              <b>бесплатной</b> сессии{" "}
            </p>
          )
        } else {
          return `${request.receiverCoach?.firstName} подтвердил${
            request.receiverCoach?.sex === "F" ? "a" : ""
          } бронирование сессии. Средства на карте будут списаны за 24 часа до начала сессии`
        }
      }

      if (is("BOOK", "DENIED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} не подтвердил${
          request.receiverCoach?.sex === "F" ? "a" : ""
        } запрос на бронирование сессии`
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
        if (request.session.durationType === "PROMO") {
          return "Сессия прошла успешно. Оставьте отзыв!"
        } else {
          return "Сессия прошла успешно. Средства были списаны с карты. Оставьте отзыв!"
        }
      }

      if (is("CONFIRMATION_COMPLETION", ["AWAITING", "APPROVED", "DENIED", "AUTOMATICALLY_APPROVED"], "INITIATED")) {
        if (request.session.durationType === "PROMO") {
          return "Вам понравилась сессия?"
        } else {
          return "Сессия прошла успешно?"
        }
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

      if (
        is(
          "CONFIRMATION_COMPLETION",
          ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_APPROVED"],
          "INITIATED"
        )
      ) {
        if (request.session.durationType === "PROMO") {
          return "Ожидаем, когда клиент подтвердит, что бесплатная сессия прошла успешно"
        } else {
          return (
            "Ожидаем, когда клиент подтвердит, что сессия завершена успешно, после чего вы получите оплату на следующий рабочий день.\n" +
            "У клиента есть 24 часа на подтверждение. Если в течение 24 часов клиент не даст подтверждение, система сделает это автоматически."
          )
        }
      }

      if (is("CONFIRMATION_COMPLETION", ["APPROVED", "AUTOMATICALLY_APPROVED"], "COMPLETED")) {
        if (request.session.durationType === "PROMO") {
          return (
            <p>
              Клиент подтвердил, что <b>бесплатная</b> сессия прошла успешно!
            </p>
          )
        } else {
          return "Клиент подтвердил, что сессия прошла успешно! Вы получите оплату на следующий рабочий день"
        }
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

      if (
        is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED") &&
        request.initiatorClient
      ) {
        if (request.session.durationType === "PROMO") {
          return (
            <p>
              {request.initiatorClient?.firstName} отправил{request.initiatorClient?.sex === "F" ? "a" : ""} запрос на
              подтверждение бронирования <b>бесплатной</b> сессии{" "}
            </p>
          )
        } else {
          return `${request.initiatorClient?.firstName} отправил${
            request.initiatorClient?.sex === "F" ? "a" : ""
          } запрос на подтверждение бронирования сессии`
        }
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
        if (request.session.durationType === "PROMO") {
          return (
            <p>
              Вы подтвердили бронирование <b>бесплатной</b> сессии.
              <br />
              <br />
              За 10 минут до начала сессии в личном кабинете на платформе вы сможете открыть видеочат с клиентом.
            </p>
          )
        } else {
          return (
            <p>
              Вы подтвердили бронирование сессии.
              <br />
              <br />
              За 10 минут до начала сессии в личном кабинете на платформе вы сможете открыть видеочат с клиентом.
            </p>
          )
        }
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

      if (
        is("CANCEL", ["AUTOMATICALLY_APPROVED", "AUTOMATICALLY_CANCELLED"], ["COMPLETED", "INITIATED"]) &&
        request.initiatorClient
      ) {
        return `${request.initiatorClient?.firstName} отменил${request.initiatorClient?.sex === "F" ? "a" : ""} сессию`
      }

      if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED"], "INITIATED") && request.initiatorClient) {
        return `${request.initiatorClient?.firstName} отправил${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } запрос на отмену сессии`
      }

      if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "AUTOMATICALLY_CANCELLED"], ["COMPLETED", "INITIATED"])) {
        return " Вы отменили сессию. Сессии не будет."
      }

      if (is("CANCEL", "APPROVED", "COMPLETED")) {
        return " Вы подтвердили отмену сессии. Сессии не будет."
      }

      if (is("CANCEL", "DENIED", "COMPLETED")) {
        return "Вы не подтвердили отмену сессии. Сессия будет."
      }
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
  isSystemChat,
  commonSystemMessages,
}: {
  isSystemChat: boolean
  message: ChatSystemMessage
  commonSystemMessages?: boolean
}) => {
  const text = getText(
    message.systemMessageType,
    message.request,
    message.status,
    message.chatType,
    commonSystemMessages
  )
  let Buttons = getSystemButtons(
    message.systemMessageType,
    message.request,
    message.chatType,
    message.showButtons,
    message.status,
    {
      name: message.userName,
      avatar: message.userAvatar || "",
    }
  )

  if (commonSystemMessages) {
    Buttons = <></>
  }

  return (
    <SystemMessageWrapper>
      {isSystemChat && <StyledAvatar src={message.userAvatar} />}
      <BodyWrapper>
        <MessageUserHeader
          showUser={isSystemChat}
          name={message.userName}
          avatar={message.userAvatar}
          date={message.date}
        />
        <SystemMessage
          id={message.id}
          text={text}
          startDate={message.request.session?.startDatetime}
          endDate={message.request.session?.endDatetime}
          time={date(message.date).format("HH:mm")}
        >
          {Buttons}
        </SystemMessage>
      </BodyWrapper>
    </SystemMessageWrapper>
  )
}

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  min-width: 40px;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SystemMessageWrapper = styled.div`
  display: flex;
  margin: 8px 0;
`

type SystemMessageTypes = {
  id: number
  text: string | React.ReactChild | React.ReactChild[]
  startDate?: ISODate
  endDate?: ISODate
  time: string
  children?: React.ReactChild | React.ReactChild[]
}

const SystemMessage = (props: SystemMessageTypes) => {
  return (
    <StyledSystemMessage id={props.id as never}>
      <BellIcon />
      <SessionInfo>
        <Message>
          {props.text}
          <SessionDate>
            • <SessionDay>{formatSessionDay(props.startDate)}</SessionDay>•{" "}
            <SessionTime>{formatSessionTime(props.startDate, props.endDate)}</SessionTime>
          </SessionDate>
        </Message>
        {props.children}
      </SessionInfo>
      <Time>{props.time}</Time>
    </StyledSystemMessage>
  )
}

const Time = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: #9aa0a6;
`

const BellIcon = styled(Icon).attrs({ name: "bell" })`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  stroke: #fff;
`

const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;
`

const SessionDay = styled.span`
  margin-right: 2px;
`

const UnderLine = styled(Link)`
  text-decoration: underline;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`

const SessionTime = styled.span``

const StyledSystemMessage = styled.div<{ id: number }>`
  display: flex;
  align-items: flex-start;
  padding: 16px;

  background: #ffffff;
  border-radius: 8px;
  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    width: 100%;
    margin-left: 0;
  `}
`

const SessionDate = styled.span`
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  margin-left: 10px;
`

const Message = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

type User = { name: string; avatar: string }

const getSystemButtons = (
  freeSessionTypes: FreeSessionClientMessage,
  request: SessionRequest | TransActionProperties,
  chatType: "coach" | "client",
  showButtons: boolean,
  status: MessageSessionRequestStatuses | ConflictStatus | TransActionsStatus,
  user: User
) => {
  const history = useHistory()
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
        return (
          <ConfirmationCompletation
            approve={() => approve(request.id)}
            request={request}
            limitedOptions={!freeSessionTypes}
          />
        )
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
    !freeSessionTypes &&
    is("CONFIRMATION_COMPLETION", ["AUTOMATICALLY_APPROVED", "APPROVED"]) &&
    !request.session.isReviewed &&
    status === "COMPLETED"
  ) {
    return <RevocationButton coach={user} sessionId={request.session.id} />
  }

  if (freeSessionTypes) {
    if (freeSessionTypes === "BOOK_PAID_SESSION") {
      return (
        <Actions withoutLoader={true}>
          <StyledButton onClick={() => history.push(`/search/coach/${request.session.coach.id}`)}>
            Выбрать время
          </StyledButton>
        </Actions>
      )
    } else if (freeSessionTypes === "CHOOSE_NEW_COACH") {
      return (
        <Actions withoutLoader={true}>
          <StyledButton onClick={() => history.push("/client")}>Выбрать коуча</StyledButton>
        </Actions>
      )
    }
  }

  return <></>
}

type ConfirmationCompletationTypes = {
  approve: () => void
  request: SessionRequest | TransActionProperties
  limitedOptions: boolean
}

const ConfirmationCompletation = ({ approve, request, limitedOptions }: ConfirmationCompletationTypes) => {
  const _changeDenyOptions = useEvent(changeDenyOptions)
  const setDenyCompletetaionRequest = useEvent(changeCurrentDenyCompletationRequest)
  const [loading, change] = useState(false)

  const handleOnDeny = () => {
    if (limitedOptions) {
      _changeDenyOptions("limited")
    }
    setDenyCompletetaionRequest(request)
  }

  return (
    <StyledActions>
      {loading && <StyledActionLoader />}
      <StyledButton
        onClick={() => {
          change(true)
          approve()
        }}
      >
        Да
      </StyledButton>
      <StyledButton onClick={handleOnDeny}>Нет</StyledButton>
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
  margin-top: 16px;
  display: flex;
  position: relative;
  overflow: hidden;
  text-align: center;
  align-items: flex-start;

  ${MediaRange.lessThan("mobile")`
    border-left: 0;
    flex-direction: row;
  `}
`

const StyledButton = styled(Button)``

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
      <StyledButton onClick={approve}>{yes}</StyledButton>
      <StyledButton color='secondary' onClick={deny}>
        {no}
      </StyledButton>
    </Actions>
  )
}

const CancelAction = ({ request, requestsModule }: SessionRequestActionProps) => {
  const cancel = useEvent(requestsModule.methods.deny)
  return (
    <Actions>
      <StyledButton onClick={() => cancel({ id: request.id })}>Отменить</StyledButton>
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
      <StyledButton onClick={openDialog}>Отзыв</StyledButton>
    </Actions>
  )
}
