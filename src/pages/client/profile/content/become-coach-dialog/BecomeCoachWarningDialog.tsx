import React, { useEffect } from "react"
import styled from "styled-components"
import { Close, Dialog } from "@/old-components/dialog/Dialog"
import { Button } from "@/old-components/button/normal/Button"
import { DashedButton } from "@/old-components/button/dashed/DashedButton"
import { useEvent, useStore } from "effector-react"
import {
  $becomeCoachWarningDialogVisibility,
  becomeCoach,
  changeCoachWarningDialogVisibility,
  resetChangeCoachWarningDialogVisibility
} from "@/pages/client/profile/content/become-coach-dialog/models/units"

export const BecomeCoachWarningDialog = () => {
  const visibility = useStore($becomeCoachWarningDialogVisibility)
  const changeVisibility = useEvent(changeCoachWarningDialogVisibility)
  const _becomeCoach = useEvent(becomeCoach)
  const destroyed = useEvent(resetChangeCoachWarningDialogVisibility)

  useEffect(() => {
    return () => destroyed()
  }, [])

  return (
    <>
      <StyledDialog value={visibility} onChange={changeVisibility}>
        <Content>
          <Header>Вы действительно хотите стать коучем?</Header>
          <Description>
            Для доступа к функционалу коуча вам надо будет заполнить анкету и получить одобрение от супервизора
          </Description>
          <Actions>
            <No onClick={() => changeVisibility(false)}>Нет</No>
            <Yes onClick={() => _becomeCoach()}>Да</Yes>
          </Actions>
        </Content>
      </StyledDialog>
    </>
  )
}

const Content = styled.div`
   position: relative;
`

const StyledDialog = styled(Dialog)`
  max-width: 400px;
  ${Close} {
    display: none;
  }
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
`

const Description = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
  margin-top: 12px;
`

const Actions = styled.div`
  display: flex;
  position: relative;
  margin-top: 32px;
`

const Yes = styled(Button)`
  width: 50%;
`

const No = styled(DashedButton)`
  width: 50%;
  margin-right: 8px;
`
