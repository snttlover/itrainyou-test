import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Description, Title } from "@/pages/coach/schedule/CoachSchedulePage"
import { Icon } from "@/old-components/icon/Icon"
import { useGoogleLogin } from "react-google-login"
import { config } from "@/config"
import { getRefreshToken, $syncedEmail, $isSynced, $isGoogleCalendarAdded, syncGoogleCalendar, deleteSynchronization } from "@/pages/coach/schedule/models/sessions.model"
import { useEvent, useStore } from "effector-react"
import { DashedButton } from "@/old-components/button/dashed/DashedButton"

const GoogleButton = styled.div`
    border: 2px solid #F4F5F7;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 295px;
    margin-top: 24px;
    cursor: pointer;
    padding: 8px 16px;
    font-size: 14px;
    line-height: 22px;

    &:hover {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
    }

    ${MediaRange.lessThan("mobile")`
      padding: 8px 11px;
    `}
`

const GoogleIcon = styled(Icon).attrs({name: "google-calendar"})`
    width: 40px;
    height: 40px;
    margin-right: 14px;

    ${MediaRange.lessThan("mobile")`
      margin-right: 8px;
      width: 16px;
      height: 16px;
    `}
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;

  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
  `}
`

const SyncButton = styled(DashedButton)`
  width: 240px;

  ${MediaRange.lessThan("mobile")`
    align-self: flex-end;
  `}
`

const Email = styled.div`
  font-family: Roboto Slab;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
`

const DeleteIcon = styled(Icon).attrs({ name: "delete" })`
  fill: #9AA0A6;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 8px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  ${MediaRange.lessThan("mobile")`
    align-self: flex-start;
    margin-bottom: 24px;
  `}
`


export const GoogleCalendar = () => {
  const onSuccess = useEvent(getRefreshToken)
  const email = useStore($syncedEmail)
  const isSynced = useStore($isSynced)
  const isAdded = useStore($isGoogleCalendarAdded)
  const onSync = useEvent(syncGoogleCalendar)
  const onDelete = useEvent(deleteSynchronization)

  const { signIn } = useGoogleLogin({
    clientId: `${config.GOOGLE_CLIENT_ID}`,
    redirectUri: `${window.location.protocol}//${window.location.hostname}/coach/schedule`,
    onSuccess: onSuccess,
    uxMode: "redirect",
    scope: "profile email https://www.googleapis.com/auth/calendar",
    accessType: "offline",
    responseType: "code",
  })

  const handleOnClick = () => {
    isSynced === "synced" ? onSync("desynchronize") : onSync("synchronize")
  }

  return (
    <>
      <Title>Google-??????????????????</Title>
      <Description>?????????????????????????????????? ???? ?????????? google-????????????????????, ?? ???? ?????????????? ???????????????????????? ????????, ?????????? ???? ????????????</Description>
      {!isAdded ? <GoogleButton onClick={signIn}>
        <GoogleIcon />
        <div>???????????????????? Google-??????????????????</div>
      </GoogleButton>
        :
        (<Row>
          <UserInfo>
            <Email>{email}</Email>
            <DeleteIcon onClick={() => onDelete()} />
          </UserInfo>
          <SyncButton onClick={handleOnClick}>{isSynced === "synced" ? "??????????????????" : "????????????????"} ??????????????????????????</SyncButton>
        </Row>)
      }
    </>
  )
}

