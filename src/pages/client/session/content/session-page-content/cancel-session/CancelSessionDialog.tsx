import React from "react"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { Button } from "@/components/button/normal/Button"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { MediaRange } from "@/lib/responsive/media"

type CancelSessionDialogTypes = {
  text: string
  onCancel: () => void
  visibility: boolean
  onChangeVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export const CancelSessionDialog = (props: CancelSessionDialogTypes) => {
  const cancelSession = () => {
    props.onCancel()
    props.onChangeVisibility(false)
  }

  return (
    <StyledDialog value={props.visibility} onChange={props.onChangeVisibility}>
      <Container>
        <Header>Хотите отменить сессию?</Header>
        <Description>{props.text}</Description>

        <Actions>
          <No onClick={() => props.onChangeVisibility(false)}>Нет</No>
          <Yes onClick={cancelSession}>Да</Yes>
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
  color: #424242;
  margin-bottom: 12px;
  ${MediaRange.lessThan(`mobile`)`
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

const No = styled(DashedButton)`
  flex: 1;
  width: 50%;
  margin-right: 8px;
`

const Yes = styled(Button)`
  flex: 1;
  width: 50%;
`
