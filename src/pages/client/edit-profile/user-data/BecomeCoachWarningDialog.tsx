import React from "react"
import styled from "styled-components"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { useEvent, useStore } from "effector-react"
import {
  $clientProfileCoachWarningDilalogVisibility,
  changeClientProfileCoachWarningDilalogVisibility,
} from "@/pages/client/edit-profile/user-data/client-profile.model"
import { Button } from "@/oldcomponents/button/normal/Button"

export const BecomeCoachWarningDialog = () => {
  const visibility = useStore($clientProfileCoachWarningDilalogVisibility)
  const changeVisibility = useEvent(changeClientProfileCoachWarningDilalogVisibility)

  return (
    <StyledDialog value={visibility} onChange={changeVisibility}>
      <Description>Для того, чтобы стать коучем, вам сначала надо заполнить все поля в личном кабинете </Description>
      <Actions>
        <Button onClick={() => changeVisibility(false)}>Заполнить</Button>
      </Actions>
    </StyledDialog>
  )
}

const StyledDialog = styled(Dialog)`
  max-width: 350px;
`

const Description = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
  margin-top: 20px;
`
const Actions = styled.div`
  margin-top: 20px;
  display: flex;
`

