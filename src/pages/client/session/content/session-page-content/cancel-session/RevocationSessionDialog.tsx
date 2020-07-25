import React from "react"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { Textarea } from "@/components/textarea/Textarea"
import { Avatar } from "@/components/avatar/Avatar"
import { RatingPicker } from "@/components/rating/RatingPicker"
import { DashedButton } from "@/components/button/dashed/DashedButton"

type RevocationDialogTypes = {
  visibility: boolean
  onChangeVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export const RevocationSessionDialog = (props: RevocationDialogTypes) => (
  <StyledDialog value={props.visibility} onChange={props.onChangeVisibility}>
    <Container>
      <Header>Оцените коуча</Header>
      <UserInfo>
        <StyledAvatar src='https://static.mk.ru/upload/entities/2019/05/08/00/articles/detailPicture/c7/b5/08/6e/5dda626cb409b1fa6942c29040609e17.jpg' />
        <UserName>Gregory Bell</UserName>
      </UserInfo>
      <RatingPicker value={3} onChange={value => {}} />
      <Form>
        <Description>Напишите отзыв о сессии</Description>
        <StyledTextarea value='' placeholder='' onChange={() => {}} />
      </Form>
      <StyledButton>Оценить</StyledButton>
    </Container>
  </StyledDialog>
)

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 560px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 400px;
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
`

const StyledButton = styled(DashedButton)`
  width: 160px;
`
