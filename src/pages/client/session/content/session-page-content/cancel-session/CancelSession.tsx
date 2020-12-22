import React, { useState } from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { CancelSessionDialog } from "@/pages/client/session/content/session-page-content/cancel-session/CancelSessionDialog"
import { CantCancelSessionDialog} from "@/pages/client/session/content/session-page-content/cancel-session/CantCancelSession"
import { useStore } from "effector-react"
import { $dashboard, DashboardType } from "@/feature/dashboard/dashboard"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { date } from "@/lib/formatting/date"

type CancelSessionProps = {
    sessionStartDatetime?: ISODate
    className?: string
    onCancel: () => void
    canceled?: boolean
}

const getText = (type: DashboardType, sessionStartDatetime?: ISODate) => {
  if (type === "client" && date().isAfter(date(sessionStartDatetime).subtract(48, "hour"))) {
    return "Вы хотите отменить сессию позднее, чем за 48 часов. Коучу будет отправлен запрос на отмену сессии."
  }

  return "Сессия отменится автоматически"
}

export const CancelSession = (props: CancelSessionProps) => {
  const dashboardType = useStore($dashboard)
  const [cancelDialogVisibility, changeCancelDialogVisibility] = useState(false)
  const [cantcancelDialogVisibility, changeCantCancelDialogVisibility] = useState(true)

  const dialogText = getText(dashboardType, props.sessionStartDatetime)

  return (
    <>
      <Button className={props.className} onClick={() => changeCancelDialogVisibility(true)}>
        Отменить сессию
      </Button>

      { !cancelDialogVisibility && props.canceled && dashboardType === "coach" && date().isAfter(date(props.sessionStartDatetime).subtract(24, "hour")) ?
        <CantCancelSessionDialog
          text={dialogText}
          visibility={cantcancelDialogVisibility}
          onChangeVisibility={changeCantCancelDialogVisibility}
        />
        : <CancelSessionDialog
          text={dialogText}
          visibility={cancelDialogVisibility}
          onChangeVisibility={changeCancelDialogVisibility}
          onCancel={props.onCancel}
        />
      }
    </>
  )
}

const Button = styled.div`
  display: flex;
  width: 100%;
  padding: 13px 0;
  align-items: center;
  justify-content: center;
  color: #424242;

  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  background: #fff;
  border-radius: 2px;
  margin-top: 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
    margin-top: 12px;
    padding: 10px 0;
  `}
`

export const TabletCancelSession = styled(CancelSession)`
  display: none;
  ${MediaRange.lessThan("tablet")`
    display: flex;
  `}
`
