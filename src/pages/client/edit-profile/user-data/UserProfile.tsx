import { Avatar } from "@/components/avatar/Avatar"
import { Button } from "@/components/button/normal/Button"
import { FormItem } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { MediaRange } from "@/lib/responsive/media"
import { UploadModal } from "./UploadModal"
import { BirthdayFormGroup } from "./BirthdayFormGroup"
import {
  $isClientProfileFormValid,
  $isUploadModelOpen,
  $clientProfileForm,
  $clientProfileFormErrors,
  lastNameChanged,
  middleNameChanged,
  nameChanged,
  userProfileGate,
  toggleUploadModal,
  saveClientUserData,
  $clientProfileSaving,
} from "./client-profile.model"
import { useEvent, useGate, useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { Spinner } from "@/components/spinner/Spinner"
import { useHistory, useLocation } from "react-router-dom"
import {
  $userHasCoach, becomeCoach
} from "@/pages/client/profile/content/coach-button/profile-coach-button"

export const UserProfile = () => {
  useGate(userProfileGate)

  const values = useStore($clientProfileForm)
  const errors = useStore($clientProfileFormErrors)
  const isUploadModalShowed = useStore($isUploadModelOpen)
  const _toggleUploadModal = useEvent(toggleUploadModal)
  const _nameChanged = useEvent(nameChanged)
  const _lastNameChanged = useEvent(lastNameChanged)
  const _middleNameChanged = useEvent(middleNameChanged)
  const canSendForm = useStore($isClientProfileFormValid)
  const _userHasCoach = useStore($userHasCoach)
  const _becomeCoach = useEvent(becomeCoach)
  const save = useEvent(saveClientUserData)
  const loading = useStore($clientProfileSaving)

  const history = useHistory()
  const location = useLocation()
  const submitChanges = () => {
    save()
    if (location.state !== undefined) _becomeCoach()
  }

  return (
    <Form>
      {loading && <StyledSpinner />}
      <Title>Редактирование профиля</Title>
      <AvatarWrapper>
        <FormItem label={<UserAvatar src={values.image.file} onClick={() => _toggleUploadModal()} />} required={_userHasCoach || location.state !== undefined} />
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
      <FormItem label='Отчество' error={errors.middleName} required={_userHasCoach || location.state !== undefined}>
        <Input withoutBorder value={values.middleName} onChange={_middleNameChanged} />
      </FormItem>
      <BirthdayFormGroup required={_userHasCoach || location.state !== undefined} />
      {isUploadModalShowed && <UploadModal onClose={() => _toggleUploadModal()} />}
      <StyledFormItem>
        <StyledSubmit onClick={submitChanges} disabled={!canSendForm}>
          Сохранить изменения
        </StyledSubmit>
      </StyledFormItem>
    </Form>
  )
}

const StyledSpinner = styled(Spinner)`
  background: #eceff1;
`

const Form = styled.div`
  position: relative;
`

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

const StyledSubmit = styled(DashedButton)`
  width: auto;
`

const StyledFormItem = styled(FormItem)`
  display: flex;
  flex-direction: row;
`

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}
