import React from "react"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { Button } from "@/components/button/normal/Button"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { MediaRange } from "@/lib/responsive/media"

type CancelSessionDialogTypes = {
  visibility: boolean
  onChangeVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export const PricesDialog = (props: CancelSessionDialogTypes) => {
  return (
    <StyledDialog value={props.visibility} onChange={props.onChangeVisibility}>
      <Container>
        <Header>Укажите цену</Header>
        <Description>Для выбора типа сессии необходимо указать цену сессии в меню справа</Description>

        <Actions>
          <StyledButton onClick={() => props.onChangeVisibility(false)}>Ок</StyledButton>
        </Actions>
      </Container>
    </StyledDialog>
  )
}

const StyledButton = styled(Button)`
   width: 100px;
`

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
