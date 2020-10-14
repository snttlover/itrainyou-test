import { Button } from "@/components/button/normal/Button"
import { $isNoteEdit, $note, noteChanged, saveNote, setIsEdit } from "@/pages/coach/client/client-page.model"
import { SessionsStats } from "@/pages/coach/client/components/SessionsStats"
import { useEvent, useStore } from "effector-react/ssr"
import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Textarea } from "@/components/textarea/Textarea"

const Container = styled.div`
  width: 100%;
  margin-top: 32px;
  position: relative;
  max-width: 600px;

  ${MediaRange.lessThan(`tablet`)`
    padding-right: 0;
    padding-top: 80px;
    margin-top: 0;
  `}

  ${MediaRange.lessThan(`mobile`)`
    padding-right: 0;
    padding-top: 80px;
    margin-top: 0;
  `}
`

const Coaches = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  border-radius: 2px;
  background: #fff;
  padding: 24px;
  min-height: 350px;

  ${MediaRange.lessThan(`mobile`)`
    padding: 12px;
  `}
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;

  ${MediaRange.lessThan(`mobile`)`
     padding-top: 0;
     font-size: 16px;
     line-height: 26px;
  `}
`

const SubTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
`

const StyledTextArea = styled(Textarea)`
  margin-top: 8px;
  width: 100%;
  resize: none;
  min-height: 309px;
  margin-bottom: 12px;
`

const Text = styled.div`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
`

const StyledButton = styled(Button)`
  min-width: 160px;
  margin: auto auto 0;
`

export const CoachesList = () => {
  const isEdit = useStore($isNoteEdit)
  const note = useStore($note)

  const _saveNote = useEvent(saveNote)
  const _noteChanged = useEvent(noteChanged)
  const _setIsEdit = useEvent(setIsEdit)

  return (
    <Container>
      <SessionsStats />
      <Coaches>
        <Title>Записи о клиенте</Title>
        <SubTitle>Вы тут можете оставить свои мысли о клиенте (только для вас)</SubTitle>
        {isEdit ? <StyledTextArea value={note} onChange={_noteChanged} /> : <Text>{note}</Text>}
        <StyledButton onClick={() => (isEdit ? _saveNote() : _setIsEdit(true))}>
          {isEdit ? "Сохранить" : "Редактировать"}
        </StyledButton>
      </Coaches>
    </Container>
  )
}
