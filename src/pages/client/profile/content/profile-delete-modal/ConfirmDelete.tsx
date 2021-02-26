import React from "react"
import styled from "styled-components"
import { useEvent, useStore } from "effector-react"
import { Button } from "@/components/button/normal/Button"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { cardIdForDelete, confirmDeleteCard } from "@/pages/client/wallet/cards/cards.model"
import { toggleDeleteCardModalDialog } from "@/pages/client/profile/profile-page.model"


export const ConfirmDelete = () => {
  const hide = useEvent(toggleDeleteCardModalDialog)
  const id = useStore(cardIdForDelete)
  const confirm = useEvent(confirmDeleteCard)

  return (
    <>
      <Header>Удаление карты</Header>
      <Description>Вы уверены, что хотите удалить карту?</Description>
      <Actions>
        <StyledCancelButton
          onClick={() => hide()}
        >
                  Отмена
        </StyledCancelButton>
        <StyledConfirmButton
          onClick={() => {
            confirm(id!)
            hide(false)
          }}
        >
                  Удалить
        </StyledConfirmButton>
      </Actions>
    </>
  )
}

const Header = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #4858CC;
  text-align: left;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #9AA0A6;
  text-align: flex-start;
  margin-top: 16px;
  margin-bottom: 24px;
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

const StyledCancelButton = styled(Button)`
  width: 100%;
  max-width: 200px;
`

const StyledConfirmButton = styled(DashedButton)`
  width: 100%;
  max-width: 200px;
`
