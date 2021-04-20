import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Description, Title } from "@/pages/coach/schedule/CoachSchedulePage"
import { Icon } from "@/oldcomponents/icon/Icon"
import { useGoogleLogin } from "react-google-login"
import { config } from "@/config"
import { getRefreshToken, $syncedEmail, $isSynced, $isGoogleCalendarAdded, syncGoogleCalendar } from "@/pages/coach/schedule/models/sessions.model"
import { useEvent, useStore } from "effector-react"
import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"

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

    &:hover {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
    }
`

const GoogleIcon = styled(Icon).attrs({name: "google-calendar"})`
    width: 40px;
    height: 40px;
    margin-right: 20px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
`

const SyncButton = styled(DashedButton)`
  width: 240px;
`

const Email = styled.div`
  font-family: Roboto Slab;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
`

export const GoogleCalendar = () => {
  const onSuccess = useEvent(getRefreshToken)
  const email = useStore($syncedEmail)
  const isSynced = useStore($isSynced)
  const isAdded = useStore($isGoogleCalendarAdded)
  const onSync = useEvent(syncGoogleCalendar)

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
      <Title>Google-календарь</Title>
      <Description>Синхронизируйтесь со своим google-календарём, и мы отметим недоступными даты, когда вы заняты</Description>
      {!isAdded ? <GoogleButton onClick={signIn}>
        <GoogleIcon />
        <div>Подключить Google-календарь</div>
      </GoogleButton>
        :
        (<Row>
          <Email>{email}</Email>
          <SyncButton onClick={handleOnClick}>{isSynced === "synced" ? "Отключить" : "Включить"} синхронизацию</SyncButton>
        </Row>)
      }
    </>
  )
}

