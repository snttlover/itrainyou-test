import React from "react"
import styled from "styled-components"
import { Dialog } from "@/old-components/dialog/Dialog"
import { useEvent, useStore } from "effector-react"
import {
  $fillFieldsToBecomeCoachWarningDialogVisibility,
  changeFillFieldsToBecomeCoachWarningDialogVisibility,
} from "@/pages/client/edit-profile/user-data/client-profile.model"
import { Button } from "@/old-components/button/normal/Button"

export const FIllFieldsToBecomeCoachWarningDialog = () => {
  const visibility = useStore($fillFieldsToBecomeCoachWarningDialogVisibility)
  const changeVisibility = useEvent(changeFillFieldsToBecomeCoachWarningDialogVisibility)

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

