import React from "react"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { Button } from "@/components/button/normal/Button"
import { DashedButton } from "@/components/button/dashed/DashedButton"

type CancelSessionDialogTypes = {
  visibility: boolean
  onChangeVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export const CancelSessionDialog = (props: CancelSessionDialogTypes) => (
  <StyledDialog value={props.visibility} onChange={props.onChangeVisibility}>
    <Container>
      <Header>Хотите отменить сессию?</Header>
      <Description>Сессия отменится автоматически</Description>

      <Actions>
        <No>Нет</No>
        <Yes>Да</Yes>
      </Actions>
    </Container>
  </StyledDialog>
)

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