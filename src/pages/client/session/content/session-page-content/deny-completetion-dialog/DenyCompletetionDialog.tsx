import React from "react"
import { useStore } from "effector-react"
import {
  $currentDenyCompletationProblem,
  $denyCompletationDialogVisibility,
  $denyCompletationProblem,
  $denyDialogRequestUser,
  $validDenyCompletationForm,
  changeCurrentDenyCompletationProblem,
  changeDenyCompletationProblem,
  denyCompletationProblems,
  hideDenyCompletetionDialogVisibility,
  sendDenyCompletationDialog,
} from "@/pages/client/session/content/session-page-content/deny-completetion-dialog/deny-completation-dialog"
import { Dialog } from "@/components/dialog/Dialog"
import styled from "styled-components"
import { useEvent } from "effector-react"
import { Textarea } from "@/components/textarea/Textarea"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { Avatar } from "@/components/avatar/Avatar"
import { SelectInput } from "@/components/select-input/SelectInput"
import { DenySessionRequestProblems } from "@/lib/api/coach/deny-session-request"

export const DenyCompletetionDialog = () => {
  const visibility = useStore($denyCompletationDialogVisibility)
  const hide = useEvent(hideDenyCompletetionDialogVisibility)
  const user = useStore($denyDialogRequestUser)
  const send = useEvent(sendDenyCompletationDialog)

  const problem = useStore($denyCompletationProblem)
  const changeProblem = useEvent(changeDenyCompletationProblem)

  const problemType = useStore($currentDenyCompletationProblem)
  const changeProblemType = useEvent(changeCurrentDenyCompletationProblem)

  const valid = useStore($validDenyCompletationForm)

  return (
    <StyledDialog value={visibility} onChange={() => hide()}>
      <Container>
        <Header>Что случилось?</Header>
        <Description>Скажите, что пошло не так. Наш администратор свяжется с вами в поддержке</Description>

        <User>
          <StyledAvatar src={user.avatar} />
          <Name>{user.name}</Name>
        </User>

        <StyledSelectInput
          placeholder='Выберите проблему'
          value={problemType}
          onChange={value => changeProblemType(value as DenySessionRequestProblems)}
          options={denyCompletationProblems}
        />
        
        <Label>Опишите проблему</Label>
        <StyledTextarea value={problem} onChange={changeProblem} />
            
        <Actions>
          <StyledButton
            disabled={!valid}
            onClick={() => {
              send()
              hide()
            }}
          >
            Отправить
          </StyledButton>
        </Actions>
      </Container>
    </StyledDialog>
  )
}

const StyledSelectInput = styled(SelectInput)`
  width: 100%;
  max-width: 280px;
  margin-top: 20px;
`

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 560px;
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #424242;
`

const Description = styled.div`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #5b6670;
  margin-top: 12px;
`
const User = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
`
const StyledAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
`
const Name = styled.div`
  margin-left: 8px;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
`
const Label = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  margin-top: 12px;
  margin-bottom: 2px;
`
const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`
const StyledButton = styled(DashedButton)`
  width: 100%;
  max-width: 160px;
`

const StyledTextarea = styled(Textarea)`
  resize: none;
  width: 100%;
  height: 140px;
`
