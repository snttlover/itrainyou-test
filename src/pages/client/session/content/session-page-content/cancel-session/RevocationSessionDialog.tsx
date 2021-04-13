import React, { useState } from "react"
import styled from "styled-components"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { Textarea } from "@/oldcomponents/textarea/Textarea"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import { RatingPicker } from "@/oldcomponents/rating/RatingPicker"
import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { useEvent, useStore } from "effector-react"
import { Loader } from "@/oldcomponents/spinner/Spinner"
import {
  $rating,
  $resume,
  $revocationUser,
  $revocationVisibility,
  changeRation,
  changeRevocationResume,
  changeRevocationVisibility,
  revocationFx,
  sendReview,
} from "@/pages/client/session/content/session-page-content/cancel-session/session-revocation"
import { clientChat } from "@/pages/client/chats/chat/client-chat.model"

export const RevocationSessionDialog = () => {
  const rating = useStore($rating)
  const resume = useStore($resume)

  const changeResume = useEvent(changeRevocationResume)

  const [noRatingError, setNoRatingError] = useState(false)

  const changeRating = (props: number) => {
    useEvent(changeRation)(props)
    setNoRatingError(false)
  }

  const chat = useStore(clientChat.chat.$chat)

  const submit = () => {
    if(rating){
      useEvent(sendReview)()
    } else{
      console.log("error")
      setNoRatingError(true)
    }
  }

  const changeVisibility = useEvent(changeRevocationVisibility)
  const visibility = useStore($revocationVisibility)

  const pending = useStore(revocationFx.pending)

  const user = useStore($revocationUser)

  return (
    <StyledDialog value={visibility} onChange={changeVisibility}>
      <Container>
        {pending && (
          <StyledLoader>
            <Loader />
          </StyledLoader>
        )}
        <Header>Оцените коуча</Header>
        <UserInfo>
          <StyledAvatar src={user?.avatar || null} />
          <UserName>{user?.name}</UserName>
        </UserInfo>
        <RatingPicker value={rating} error={noRatingError} onChange={changeRating} />
        <Form>
          <Description>Напишите отзыв о сессии</Description>
          <StyledTextarea value={resume} placeholder='' onChange={changeResume} />
        </Form>
        <StyledButton disabled={pending} onClick={submit}>
          Оценить
        </StyledButton>
      </Container>
    </StyledDialog>
  )
}

const StyledLoader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 560px;
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
  margin-bottom: 32px;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`

const UserName = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 12px;
`

const Form = styled.div`
  margin-top: 17px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
`

const Description = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
`

const StyledTextarea = styled(Textarea)`
  width: 100%;
  resize: none;
  height: 140px;
  color: #424242;
`

const StyledButton = styled(DashedButton)`
  width: 160px;
`
