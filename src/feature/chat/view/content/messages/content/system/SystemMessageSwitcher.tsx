import React, { useState } from "react"
import { ChatSystemMessage } from "@/feature/chat/modules/chat-messages"
import styled, { css } from "styled-components"
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

export const getSystemMessageText = (
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
      return `???????????????? ?????????????? ?????? ?????? ??????????.
          ???????? ${request.session.coach.firstName} ${request.session.coach.lastName} ???????? ?????????? ???????????????????????? ?? ?????????? ???????????????? ???? ??????????????????.`
    } else if (systemMessageType === "CHOOSE_NEW_COACH") {
      return "???? ?????????????? ????????? ???????????????????????? ???????????????????? ???????????? ?? ????????????"
    } else if (systemMessageType === "FREE_SESSION_LIMIT_ENDED") {
      return (
        <p>
          ???? ???????????????????????? ?????? ?????????????????? ???????????????????? ????????????. ???????????? ???? ????????????, ?????? ?????? ?????? ?????????? ????????????????. ?????????????? ????????????
          ?????????? <UnderLine to='/client'>??????????</UnderLine> ?? ???????????????????????? ?????????????? ????????????.{" "}
        </p>
      )
    }
  } else {
    if (commonSystemMessages) {
      if (is("BOOK", "APPROVED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} ????????????????????${
          request.receiverCoach?.sex === "F" ? "a" : ""
        } ???????????????????????? ????????????. ???????????????? ???? ?????????? ?????????????????????? ???? 24 ???????? ???? ???????????? ????????????`
      }

      if (is("BOOK", "DENIED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} ???? ????????????????????${
          request.receiverCoach?.sex === "F" ? "a" : ""
        } ???????????? ???? ???????????????????????? ????????????`
      }

      if (is("CANCEL", "DENIED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} ???? ????????????????????${
          request.receiverCoach?.sex === "F" ? "??" : ""
        } ???????????? ????????????. ???????????? ??????????????????`
      }

      if (is("RESCHEDULE", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return `???? ???????????? ?????????????????? ???????????? ???? ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "APPROVED"], "COMPLETED") && request.initiatorCoach) {
        return `${request.initiatorCoach?.firstName} ??????????????${request.initiatorCoach?.sex === "F" ? "a" : ""}  ????????????`
      }

      if (is("CANCEL", ["AUTOMATICALLY_APPROVED"], ["COMPLETED"]) && request.initiatorClient) {
        return `${request.initiatorClient?.firstName} ??????????????${request.receiverCoach?.sex === "F" ? "a" : ""} ????????????`
      }

      if (
        is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED") &&
        request.initiatorClient
      ) {
        return `${request.initiatorClient?.firstName} ????????????????${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } ???????????? ???? ?????????????????????????? ????????????`
      }

      if (is("BOOK", "CANCELLED", "COMPLETED") && request.initiatorClient) {
        return `${request.initiatorClient?.firstName} ??????????????${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } ???????????? ???? ?????????????????????????? ????????????`
      }

      if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return `${request.initiatorClient?.firstName} ????????????????${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } ???????????? ???? ???????????? ????????????`
      }

      if (is("CANCEL", "CANCELLED", "COMPLETED")) {
        return `${request.initiatorClient?.firstName} ??????????????${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } ???????????? ???? ???????????? ????????????`
      }

      if (is("RESCHEDULE", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return `${request.initiatorClient?.firstName} ?????????? ?????????????????? ???????????? ???? ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (is("RESCHEDULE", "DENIED", "COMPLETED")) {
        return `???? ?????????????????? ?????????????? ???????????? ???? ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (is("RESCHEDULE", "APPROVED", "COMPLETED")) {
        return `???? ?????????????????????? ?????????????? ???????????? ???? ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (is("RESCHEDULE", "CANCELLED", "COMPLETED")) {
        return `${request.receiverClient?.firstName} ??????????????${
          request.receiverClient?.sex === "F" ? "a" : ""
        } ?????????????? ???????????? ????  ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (
        is("CANCEL", ["AUTOMATICALLY_APPROVED", "AUTOMATICALLY_CANCELLED"], ["COMPLETED", "INITIATED"]) &&
        request.initiatorClient
      ) {
        return `${request.initiatorClient?.firstName} ??????????????${request.initiatorClient?.sex === "F" ? "a" : ""} ????????????`
      }

      if (
        is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED") &&
        request.initiatorClient
      ) {
        return `${request.initiatorClient?.firstName} ????????????????${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } ???????????? ???? ???????????? ????????????`
      }
    }

    if (chatType === "client") {
      if (status === "MONEY_HOLD_UNSUCCESSFUL") {
        return "???????????? ????????????????. ?????????????????? ???????????? ?????? ?????????????? ???????????????? ?????????? ?? ??????????"
      }

      if (status === "MONEY_SUCCESSFULLY_HELD") {
        return "???????????? ???? ???????????? ???????? ?????????????? ?? ??????????."
      }

      if (status === "SOLVED_IN_COACH_FAVOUR") {
        return "?????????????????????????? ?????????? ???????? ?? ???????????? ??????????. ???????????????? ???????? ?????????????? ?? ??????????"
      }

      if (status === "SOLVED_IN_CLIENT_FAVOUR") {
        return "?????????????????????????? ?????????? ???????? ?? ???????? ????????????. ???????????? ???? ?????????? ???? ???????????? ???????? ????????????????????"
      }

      if (is("BOOK", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
        return "???????????? ???? ???????????????????????? ?????? ?????????????????????????? ??????????????, ?????? ?????? ???????? ???? ?????????????? ???? ????????????"
      }

      if (
        is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED") &&
        request.session.durationType === "PROMO"
      ) {
        return (
          <>
            ???? <b>??????????????????</b> ?????????? ???????????????????? ????????????
          </>
        )
      }

      if (is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return (
          <>
            ???? <b>??????????????????</b> ?????????? ????????????
          </>
        )
      }

      if (is("BOOK", "CANCELLED", "COMPLETED")) {
        return "???? ???????????????? ???????????? ???? ???????????????????????? ????????????"
      }

      if (is("BOOK", "APPROVED", "COMPLETED")) {
        if (request.session.durationType === "PROMO") {
          return (
            <p>
              {request.receiverCoach?.firstName} ????????????????????{request.receiverCoach?.sex === "F" ? "a" : ""} ????????????????????????{" "}
              <b>????????????????????</b> ????????????{" "}
            </p>
          )
        } else {
          return `${request.receiverCoach?.firstName} ????????????????????${
            request.receiverCoach?.sex === "F" ? "a" : ""
          } ???????????????????????? ????????????. ???????????????? ???? ?????????? ?????????? ?????????????? ???? 24 ???????? ???? ???????????? ????????????`
        }
      }

      if (is("BOOK", "DENIED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} ???? ????????????????????${
          request.receiverCoach?.sex === "F" ? "a" : ""
        } ???????????? ???? ???????????????????????? ????????????`
      }

      if (is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return "???? ?????????????????? ???????????? ???? ???????????? ????????????"
      }

      if (is("CANCEL", "DENIED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} ???? ????????????????????${
          request.receiverCoach?.sex === "F" ? "??" : ""
        } ???????????? ????????????. ???????????? ??????????????????`
      }

      if (is("RESCHEDULE", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return `???? ???????????? ?????????????????? ???????????? ???? ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (is("RESCHEDULE", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
        return "???????????? ???? ?????????????? ???????????? ?????? ?????????????????????????? ??????????????, ?????? ?????? ???????? ???? ?????????????? ???? ????????????"
      }

      if (is("RESCHEDULE", "CANCELLED", "COMPLETED")) {
        return `???? ???????????????? ?????????????? ???????????? ???? ${formatDate(request.resultDatetime)}`
      }

      if (is("CANCEL", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
        return "???????????? ???? ???????????? ???????????? ?????? ?????????????????????????? ??????????????, ?????? ?????? ???????? ???? ?????????????? ???? ????????????"
      }

      if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "APPROVED"], "COMPLETED") && request.initiatorCoach) {
        return `${request.initiatorCoach?.firstName} ??????????????${request.initiatorCoach?.sex === "F" ? "a" : ""}  ????????????`
      }

      if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "APPROVED"], "COMPLETED")) {
        return "???????????? ?????????????? ????????????????"
      }

      if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return "???? ?????????????????? ???????????? ????????????."
      }

      if (is("CANCEL", "CANCELLED", "COMPLETED")) {
        return "???? ???????????????? ???????????? ???? ???????????? ????????????"
      }

      if (is("RESCHEDULE", "DENIED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} ???? ????????????????${
          request.receiverCoach?.sex === "F" ? "a????" : "????"
        } ???? ?????????????? ????????????, ???????????? ???????????????? ?? ?????????????? ?????????? `
      }

      if (is("CONFIRMATION_COMPLETION", "DENIED", "COMPLETED")) {
        return "???? ??????????????, ?????? ?? ???????????? ???????????????? ????????????????. ?? ???????? ???????????????? ?????????????????????????? ?? ?????????????????? ?????? ??????????????????"
      }

      if (
        is("CONFIRMATION_COMPLETION", ["APPROVED", "AUTOMATICALLY_APPROVED"], "COMPLETED") &&
        (request.session.isReviewed || $revocated.getState().indexOf(request.session.id) !== -1)
      ) {
        return "???????????? ???????????? ??????????????."
      }

      if (is("CONFIRMATION_COMPLETION", ["APPROVED", "AUTOMATICALLY_APPROVED"], "COMPLETED")) {
        if (request.session.durationType === "PROMO") {
          return "???????????? ???????????? ??????????????. ???????????????? ??????????!"
        } else {
          return "???????????? ???????????? ??????????????. ???????????????? ???????? ?????????????? ?? ??????????. ???????????????? ??????????!"
        }
      }

      if (is("CONFIRMATION_COMPLETION", ["AWAITING", "APPROVED", "DENIED", "AUTOMATICALLY_APPROVED"], "INITIATED")) {
        if (request.session.durationType === "PROMO") {
          return "?????? ?????????????????????? ?????????????"
        } else {
          return "???????????? ???????????? ???????????????"
        }
      }

      if (is("CANCEL", "APPROVED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} ????????????????${
          request.receiverCoach?.sex === "F" ? "a????" : "????"
        } ???? ???????????? ????????????`
      }

      if (is("RESCHEDULE", "APPROVED", "COMPLETED")) {
        return `${request.receiverCoach?.firstName} ???????????????????? ???? ?????????????? ???????????? ???? ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }
    }

    if (chatType === "coach") {
      if (status === "MONEY_HOLD_UNSUCCESSFUL") {
        return `${request.enrolledClient?.firstName} ??????????????${request.enrolledClient?.sex === "F" ? "a" : ""} ????????????.`
      }

      if (status === "MONEY_SUCCESSFULLY_HELD") {
        return "???????????? ???????? ???????????????????????? ????????????????????."
      }

      if (is("CONFIRMATION_COMPLETION", "DENIED", "COMPLETED")) {
        return "???????????? ????????????, ?????? ?? ???????????? ???????????????? ????????????????. ?? ???????? ???????????????? ?????????????????????????? ?? ?????????????????? ?????? ??????????????????"
      }

      if (status === "SOLVED_IN_COACH_FAVOUR") {
        return "?????????????????????????? ?????????? ?????????????? ???????????????? ?? ???????? ????????????. ?????? ???????? ???????????????????? ???????????? ???? ????????????"
      }

      if (status === "SOLVED_IN_CLIENT_FAVOUR") {
        return "?????????????????????????? ?????????? ?????????????? ???????????????? ?? ???????????? ??????????????. ?????????????? ???????? ???????????????????? ???????????? ???? ????????????"
      }

      if (
        is(
          "CONFIRMATION_COMPLETION",
          ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_APPROVED"],
          "INITIATED"
        )
      ) {
        if (request.session.durationType === "PROMO") {
          return "??????????????, ?????????? ???????????? ????????????????????, ?????? ???????????????????? ???????????? ???????????? ??????????????"
        } else {
          return (
            "??????????????, ?????????? ???????????? ????????????????????, ?????? ???????????? ?????????????????? ??????????????, ?????????? ???????? ???? ???????????????? ???????????? ???? ?????????????????? ?????????????? ????????.\n" +
            "?? ?????????????? ???????? 24 ???????? ???? ??????????????????????????. ???????? ?? ?????????????? 24 ?????????? ???????????? ???? ???????? ??????????????????????????, ?????????????? ?????????????? ?????? ??????????????????????????."
          )
        }
      }

      if (is("CONFIRMATION_COMPLETION", ["APPROVED", "AUTOMATICALLY_APPROVED"], "COMPLETED")) {
        if (request.session.durationType === "PROMO") {
          return (
            <p>
              ???????????? ????????????????????, ?????? <b>????????????????????</b> ???????????? ???????????? ??????????????!
            </p>
          )
        } else {
          return "???????????? ????????????????????, ?????? ???????????? ???????????? ??????????????! ???? ???????????????? ???????????? ???? ?????????????????? ?????????????? ????????"
        }
      }

      if (is("CONFIRMATION_COMPLETION", "DENIED", "COMPLETED")) {
        return "???????????? ????????????, ?????? ?? ?????????????? ???????????????? ????????????????. ?? ???????? ???????????????? ?????????????????????????? ?????? ?????????????????? ??????????????."
      }

      if (is("CANCEL", ["AUTOMATICALLY_APPROVED"], ["COMPLETED"]) && request.initiatorClient) {
        return `${request.initiatorClient?.firstName} ??????????????${request.receiverCoach?.sex === "F" ? "a" : ""} ????????????`
      }

      if (is("BOOK", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
        return "???????????? ???? ???????????????????????? ?????? ?????????????????????????? ?????????????? ????-???? ???????????????????? ?????????????? ????????????????"
      }

      if (
        is("BOOK", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED") &&
        request.initiatorClient
      ) {
        if (request.session.durationType === "PROMO") {
          return (
            <p>
              {request.initiatorClient?.firstName} ????????????????{request.initiatorClient?.sex === "F" ? "a" : ""} ???????????? ????
              ?????????????????????????? ???????????????????????? <b>????????????????????</b> ????????????{" "}
            </p>
          )
        } else {
          return (
            <>
              {request.initiatorClient?.firstName} <b>??????????????????????</b> ?????????? ????????????
            </>
          )
        }
      }

      if (is("BOOK", "DENIED", "COMPLETED")) {
        return "???? ?????????????????? ???????????? ???? ???????????????????????? ????????????"
      }

      if (is("BOOK", "CANCELLED", "COMPLETED") && request.initiatorClient) {
        return `${request.initiatorClient?.firstName} ??????????????${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } ???????????? ???? ?????????????????????????? ????????????`
      }

      if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return `${request.initiatorClient?.firstName} ????????????????${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } ???????????? ???? ???????????? ????????????`
      }

      if (is("CANCEL", "CANCELLED", "COMPLETED")) {
        return `${request.initiatorClient?.firstName} ??????????????${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } ???????????? ???? ???????????? ????????????`
      }

      if (is("CANCEL", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
        return "???????????? ???? ???????????? ???????????? ?????? ?????????????????????????? ?????????????? ????-???? ???????????????????? ?????????????? ????????????????"
      }

      if (is("BOOK", "APPROVED", "COMPLETED")) {
        if (request.session.durationType === "PROMO") {
          return (
            <p>
              ???? ?????????????????????? ???????????????????????? <b>????????????????????</b> ????????????.
              <br />
              <br />
              ???? 10 ?????????? ???? ???????????? ???????????? ?? ???????????? ???????????????? ???? ?????????????????? ???? ?????????????? ?????????????? ???????????????? ?? ????????????????.
            </p>
          )
        } else {
          return (
            <p>
              ???? ?????????????????????? ???????????????????????? ????????????.
              <br />
              <br />
              ???? 10 ?????????? ???? ???????????? ???????????? ?? ???????????? ???????????????? ???? ?????????????????? ???? ?????????????? ?????????????? ???????????????? ?? ????????????????.
            </p>
          )
        }
      }

      if (is("RESCHEDULE", ["AWAITING", "APPROVED", "DENIED", "CANCELLED", "AUTOMATICALLY_CANCELLED"], "INITIATED")) {
        return `${request.initiatorClient?.firstName} ?????????? ?????????????????? ???????????? ???? ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (is("RESCHEDULE", "AUTOMATICALLY_CANCELLED", "COMPLETED")) {
        return "???????????? ???? ?????????????? ???????????? ?????? ?????????????????????????? ?????????????? ????-???? ???????????????????? ?????????????? ????????????????"
      }

      if (is("RESCHEDULE", "DENIED", "COMPLETED")) {
        return `???? ?????????????????? ?????????????? ???????????? ???? ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (is("RESCHEDULE", "APPROVED", "COMPLETED")) {
        return `???? ?????????????????????? ?????????????? ???????????? ???? ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (is("RESCHEDULE", "CANCELLED", "COMPLETED")) {
        return `${request.receiverClient?.firstName} ??????????????${
          request.receiverClient?.sex === "F" ? "a" : ""
        } ?????????????? ???????????? ????  ${formatSessionDate(
          request.rescheduleSession?.startDatetime,
          request.rescheduleSession?.endDatetime
        )}`
      }

      if (
        is("CANCEL", ["AUTOMATICALLY_APPROVED", "AUTOMATICALLY_CANCELLED"], ["COMPLETED", "INITIATED"]) &&
        request.initiatorClient
      ) {
        return `${request.initiatorClient?.firstName} ??????????????${request.initiatorClient?.sex === "F" ? "a" : ""} ????????????`
      }

      if (is("CANCEL", ["AWAITING", "APPROVED", "DENIED", "CANCELLED"], "INITIATED") && request.initiatorClient) {
        return `${request.initiatorClient?.firstName} ????????????????${
          request.initiatorClient?.sex === "F" ? "a" : ""
        } ???????????? ???? ???????????? ????????????`
      }

      if (is("CANCEL", ["AUTOMATICALLY_APPROVED", "AUTOMATICALLY_CANCELLED"], ["COMPLETED", "INITIATED"])) {
        return " ???? ???????????????? ????????????. ???????????? ???? ??????????."
      }

      if (is("CANCEL", "APPROVED", "COMPLETED")) {
        return " ???? ?????????????????????? ???????????? ????????????. ???????????? ???? ??????????."
      }

      if (is("CANCEL", "DENIED", "COMPLETED")) {
        return "???? ???? ?????????????????????? ???????????? ????????????. ???????????? ??????????."
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
  const text = getSystemMessageText(
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
  margin: 4px 0;
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
            ??? <SessionDay>{formatSessionDay(props.startDate)}</SessionDay>???{" "}
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
            yes='??????????????????????'
            no='??????????????????'
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
            ?????????????? ??????????
          </StyledButton>
        </Actions>
      )
    } else if (freeSessionTypes === "CHOOSE_NEW_COACH") {
      return (
        <Actions withoutLoader={true}>
          <StyledButton onClick={() => history.push("/client")}>?????????????? ??????????</StyledButton>
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
        ????
      </StyledButton>
      <StyledButton onClick={handleOnDeny}>??????</StyledButton>
    </StyledActions>
  )
}

const Actions = ({
  children,
  withoutLoader,
  className,
}: {
  className?: string
  withoutLoader?: boolean
  children: React.ReactChild | React.ReactChild[]
}) => {
  const [loading, change] = useState(false)

  const clickHandler = () => {
    if (!withoutLoader) {
      change(true)
    }
  }

  return (
    <StyledActions className={className} onClick={() => clickHandler()}>
      {!loading ? children : <StyledActionLoader />}
    </StyledActions>
  )
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
    flex-direction: column;
  `}
`

const StyledButton = styled(Button)`
  ${MediaRange.lessThan("mobile")`
    flex: 1;
    margin-bottom: 8px;
    width: 100%;
  `}
`

const ApproveBtn = styled(StyledButton)`
  margin-right: 8px;
  ${MediaRange.lessThan("mobile")`
    margin-right: 0;
    margin-bottom: 8px;
  `}
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
      <ApproveBtn onClick={approve}>{yes}</ApproveBtn>
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
      <StyledButton color='secondary' onClick={() => cancel({ id: request.id })}>
        ????????????????
      </StyledButton>
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
      <StyledButton onClick={openDialog}>??????????</StyledButton>
    </Actions>
  )
}
