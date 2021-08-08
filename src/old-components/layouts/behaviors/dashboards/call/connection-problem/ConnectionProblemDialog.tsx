import React, { FC } from "react"
import styled from "styled-components"
import { Dialog } from "@/new-components/dialog/Dialog"
import { Button } from "@/new-components/button/Button"

type ConnectionProblemDialogProps = {
  className?: string
  tryAgain: () => void
  onChange: (val: boolean) => void
  value: boolean
}

export const ConnectionProblemDialog = (props: ConnectionProblemDialogProps) => {
  return (
    <StyledConnectionProblemDialog {...props}>
      <Title>Не получилось подключиться к сессии</Title>
      <Actions>
        <TryAgainButton onClick={() => props.tryAgain()}>Попробовать снова</TryAgainButton>
      </Actions>
    </StyledConnectionProblemDialog>
  )
}

const StyledConnectionProblemDialog = styled(Dialog)``

const Title = styled.div`
  margin-right: 40px;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #424242;
  max-width: 328px;
`

const Actions = styled.div`
  margin-top: 64px;
  display: flex;
  align-items: center;
`

const TryAgainButton = styled(Button)`
  margin: 0 auto;
`
