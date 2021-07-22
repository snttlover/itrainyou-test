import React from "react"
import { useStore } from "effector-react"
import { Dialog } from "@/old-components/dialog/Dialog"
import styled from "styled-components"
import { useEvent } from "effector-react"
import { MediaRange } from "@/lib/responsive/media"
import { Button } from "@/old-components/button/normal/Button"
import { $addTinkoffCardModalVisibility, toggleAddTinkoffCardModal } from "@/pages/coach/home/coach-home.model"
import { addCard } from "@/feature/client-funds-up/dialog/models/units"
import { $userData } from "@/feature/user/user.model"

export const AddTinkoffCardDialog = () => {
  const _addCard = useEvent(addCard)
  const _toggle = useEvent(toggleAddTinkoffCardModal)
  const visibility = useStore($addTinkoffCardModalVisibility)
  const coachId = useStore($userData).coach?.id
    
  return (
    <StyledDialog value={visibility} onChange={_toggle}>
      <Container>
        <Title>Привязка карты</Title>
        <SubTitle>Вы будете перенаправлены на страницу Тинькоффа для добавления и привязки карты (будет списан и возвращен 1 рубль).</SubTitle>
        <StyledConfirmButton disabled={!coachId} onClick={() =>_addCard()}>Хорошо</StyledConfirmButton>
      </Container>
    </StyledDialog>
  )
}

const SubTitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    color: #424242;
    margin-bottom: 24px;
`

const StyledConfirmButton = styled(Button)`
  width: 100%;
  max-width: 100px;
  justify-self: center;  
`

const Title = styled.div`
    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 12px;
    align-self: flex-start;
`

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 400px;
  padding: 24px 16px;
    ${MediaRange.lessThan("mobile")`
  `}
`