import React from "react"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { Avatar } from "@/components/avatar/Avatar"
import { useEvent, useStore } from "effector-react"
import {
  $sessionToDelete,
  $showRemoveSessionModal,
  closeRemoveSessionModal
} from "@/pages/coach/schedule/models/remove-session.model"
import { removeSession } from "@/pages/coach/schedule/models/sessions.model"
import { date } from "@/lib/formatting/date"
import { fixAvatarAndImageUrl } from "@/lib/helpers/fix-avatar-and-image-url"
import { Button } from "@/components/button/normal/Button"
import { DashedButton } from "@/components/button/dashed/DashedButton"

export const RemoveSessionModal = () => {
  const session = useStore($sessionToDelete)
  const showModal = useStore($showRemoveSessionModal)
  const _removeSession = useEvent(removeSession)
  const _closeModal = useEvent(closeRemoveSessionModal)
  const {id, client} = fixAvatarAndImageUrl(session)

  const month = date(session.startTime.valueOf()).format("D MMMM")
  const time = `${date(session.startTime.valueOf()).format("HH:mm")}-${date(session.endTime.valueOf()).format("HH:mm")}`

  const removeSessionHandler = () => {
    _closeModal()
    _removeSession(id)
  }

  return (
    <StyledDialog value={showModal} onChange={_closeModal}>
      <Container>
        <Header>Вы точно хотите удалить сессию?</Header>
        <Description>
          Если вы удалите сессию, то она автоматически отменится у клиента, после чего будет удалена
          из вашего расписания.
        </Description>
        <UserInfo>
          <StyledAvatar src={client?.avatar || null} />
          <UserName>{client?.firstName} {client?.lastName}</UserName>
        </UserInfo>
        <SessionTime><SessionTimeBold>{month} </SessionTimeBold>{time}</SessionTime>

        <ButtonsContainer>
          <StyledDashedButton onClick={_closeModal}>Нет</StyledDashedButton>
          <StyledSuccessButton onClick={removeSessionHandler}>Да</StyledSuccessButton>
        </ButtonsContainer>
        
      </Container> 
    </StyledDialog>
  )
}

const StyledSuccessButton = styled(Button)`
  width: 220px;
  margin-left: 16px;
`

const StyledDashedButton = styled(DashedButton)`
  width: 220px;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const SessionTime = styled.div`
  font-size: 20px;
  margin-bottom: 40px;
`

const SessionTimeBold = styled.span`
  font-weight: 500;
`

const UserName = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 12px;
`

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
`

const StyledDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 51px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #424242;
  margin-bottom: 12px;
`

const Description = styled.div`
  color: #5B6670;
  max-width: 400px;
  margin-bottom: 72px;
  text-align: center;
  line-height: 24px;
`
