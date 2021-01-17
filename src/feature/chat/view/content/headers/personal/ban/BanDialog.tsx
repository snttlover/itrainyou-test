import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { Checkbox, CheckboxContent } from "@/components/checkbox/Checkbox"
import { Button } from "@/components/button/normal/Button"

type BanDialogTypes = {
  onSuccess: () => void
  visibility: boolean
  onChangeVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export const BanDialog = (props: BanDialogTypes) => {
  const [cancelSessions, changeSessionsCancel] = useState(false)

  useEffect(() => {
    changeSessionsCancel(false)
  }, [props.visibility])

  return (
    <StyledDialog value={props.visibility} onChange={props.onChangeVisibility}>
      <Container>
        <Header>Вы уверены, что хотите заблокировать клиента?</Header>
        <Description>При блокировке отменятся все сессии, которые клиент купил у вас</Description>
        <StyledCheckbox value={cancelSessions} onChange={changeSessionsCancel}>
          Отменить все сессии
        </StyledCheckbox>
        <StyledButton disabled={!cancelSessions} onClick={() => props.onSuccess()}>
          Заблокировать
        </StyledButton>
      </Container>
    </StyledDialog>
  )
}

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 560px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledCheckbox = styled(Checkbox)`
  margin: 0 auto;
  margin-bottom: 106px;
  ${CheckboxContent} {
    margin-left: 11px;
  }
`

const StyledButton = styled(Button)`
  margin: 0 auto;
  width: 160px;
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #783D9D;
  margin-bottom: 16px;
  width: 100%;
  max-width: 432px;
`

const Description = styled.div`
  font-size: 16px;
  line-height: 22px;

  text-align: center;
  color: #424242;
  margin-bottom: 102px;
  width: 100%;
  max-width: 350px;
`
