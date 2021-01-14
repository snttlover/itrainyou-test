import React from "react"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { Button } from "@/components/button/normal/Button"
import { MediaRange } from "@/lib/responsive/media"
import {useHistory} from "react-router-dom"

type CantCancelSessionDialogTypes = {
    visibility: boolean
    onChangeVisibility: React.Dispatch<React.SetStateAction<boolean>>
    text: string
}

export const CantCancelSessionDialog = (props: CantCancelSessionDialogTypes) => {
  const history = useHistory()
  const redirectToSupport= () => {
    history.push("/coach/support/")
  }
    
  return (
    <StyledDialog value={props.visibility} onChange={props.onChangeVisibility}>
      <Container>
        <Header>Невозможно отменить сессию</Header>
        <Description>Сессия начинается меньше, чем за 24 часа. И у клиенты были уже заморожены средства на карте. Если хотите отменить сессию — обратитесь в поддержку</Description>
        <Actions>
          <Yes onClick={redirectToSupport}>Написать в поддержку</Yes>
        </Actions>
      </Container>
    </StyledDialog>
  )
}

const Container = styled.div``

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 400px;
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #7d36a8;
  margin-bottom: 12px;
  ${MediaRange.lessThan("mobile")`
    margin-top: 30px;
  `}
`

const Description = styled.div`
  font-size: 14px;
  line-height: 18px;

  color: #5b6670;
  margin-bottom: 32px;
`

const Actions = styled.div`
  display: flex;
`

const Yes = styled(Button)`
  flex: 1;
  width: 50%;
`