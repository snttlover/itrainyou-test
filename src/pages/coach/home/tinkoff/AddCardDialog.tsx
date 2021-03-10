import React from "react"
import { useStore } from "effector-react"
import { Dialog } from "@/components/dialog/Dialog"
import styled from "styled-components"
import { useEvent } from "effector-react"
import { MediaRange } from "@/lib/responsive/media"
import { Button } from "@/components/button/normal/Button"

export const AddTinkoffCardDialog = () => {

  return (
    <StyledDialog value={true} onChange={() => {}}>
      <Container>
        <Title>Привязка карты</Title>
        <SubTitle>Вы будете перенаправлены на страницу Тинькоффа для добавления и привязки карты (будет списан и возвращен 1 рубль).</SubTitle>
        <StyledConfirmButton>Хорошо</StyledConfirmButton>
      </Container>
    </StyledDialog>
  )
}

const SubTitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #5B6670;

    ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
  `}
`

const StyledConfirmButton = styled(Button)`
  width: 100%;
  max-width: 200px;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-right: 12px;
`

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 480px;
  padding: 24px 16px;
    ${MediaRange.lessThan("mobile")`
  `}
`