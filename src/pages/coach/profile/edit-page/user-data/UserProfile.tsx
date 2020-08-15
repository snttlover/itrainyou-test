import { Avatar } from "@/components/avatar/Avatar"
import { Button } from "@/components/button/normal/Button"
import { FormItem } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { MediaRange } from "@/lib/responsive/media"
import { $canSendForm, saveCoachData } from "@/pages/coach/profile/edit-page/edit-page.model"
import { UploadModal } from "./UploadModal"
import { BirthdayFormGroup } from "./BirthdayFormGroup"
import {
  $isStep3FormValid,
  $isUploadModelOpen,
  $step3Form,
  $step3FormErrors,
  lastNameChanged,
  nameChanged,
  userProfileGate,
  toggleUploadModal,
} from "./step3.model"
import { useEvent, useGate, useStore } from "effector-react/ssr"
import * as React from "react"
import styled from "styled-components"

const Title = styled.h1`
  margin-top: 36px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #424242;

  ${Button} {
    margin-top: 16px;
  }

  ${MediaRange.greaterThan("mobile")`
    font-size: 24px;
    line-height: 26px;
    justify-content: space-between;
    
    ${Button} {
      margin-top: 0;
    }
  `}
`

const UserAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  cursor: pointer;
`

const AvatarWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  ${FormItem} {
    margin-bottom: 0;
    width: auto;
  }

  ${MediaRange.greaterThan("mobile")`
    margin-top: 36px;
  `}
`

const AvatarHint = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  color: #424242;
  width: 360px;

  h4 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #424242;
  }

  p {
    margin-top: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #9aa0a6;
  }
`

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}

export const UserProfile = () => {
  useGate(userProfileGate)

  const values = useStore($step3Form)
  const errors = useStore($step3FormErrors)
  const isFormValid = useStore($isStep3FormValid)
  const isUploadModalShowed = useStore($isUploadModelOpen)
  const _toggleUploadModal = useEvent(toggleUploadModal)
  const _nameChanged = useEvent(nameChanged)
  const _lastNameChanged = useEvent(lastNameChanged)
  const canSendForm = useStore($canSendForm)
  const _saveCoachData = useEvent(saveCoachData)

  return (
    <>
      <Title>
        Редактирование профиля
        <Button onClick={() => _saveCoachData()} disabled={!canSendForm}>
          Сохранить изменения
        </Button>
      </Title>
      <AvatarWrapper>
        <FormItem label={<UserAvatar src={values.image.file} onClick={() => _toggleUploadModal()} />} required />
        <AvatarHint>
          <h4>Добавить фото</h4>
          <p>Формат: jpg, png. Максимальный размер файла: 2Mb. Рекомендованный размер: 200х200 px.</p>
        </AvatarHint>
      </AvatarWrapper>
      <FormItem label='Имя' error={errors.name} required>
        <Input withoutBorder value={values.name} onChange={_nameChanged} />
      </FormItem>
      <FormItem label='Фамилия' error={errors.lastName} required>
        <Input withoutBorder value={values.lastName} onChange={_lastNameChanged} />
      </FormItem>
      <BirthdayFormGroup />
      {isUploadModalShowed && <UploadModal onClose={() => _toggleUploadModal()} />}
    </>
  )
}
