import React, { FormEvent, useEffect } from "react"
import styled from "styled-components"
import { FormItem } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { useEvent, useGate, useStore } from "effector-react/ssr"
import {
  $changeGeneralSettingsForm,
  $changeGeneralSettingsFormErrors,
  $isGeneralSettingsFormFormValid,
  changeGeneralSettingsFx,
  emailChanged,
  SettingsGate,
  timeZoneChanged,
} from "@/pages/common/settings/content/general-settings-form/general-settings.model"
import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { DropdownItem, SelectInput, SelectInputProps } from "@/components/select-input/SelectInput"
import { timeZones } from "@/pages/common/settings/content/general-settings-form/time-zones"
import { mounted } from "@/pages/common/settings/content/general-settings-form/general-settings.model"

const StyledForm = styled.form`
  width: 100%;
  margin-top: 24px;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 20px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 22px;
  `}
`

const StyledFormItem = styled(FormItem)`
  margin-bottom: 20px;
`

const StyledSpinner = styled(Spinner)`
  background: rgba(236, 239, 241, 0.24);
`

const Actions = styled.div`
  ${MediaRange.lessThan(`tablet`)`
     display: flex;
     justify-content: center;
   `}
`

const StyledSelectInput = styled(SelectInput)<SelectInputProps<string>>`
  height: 36px;
  ${DropdownItem} {
    width: 100%;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

export const GeneralSettingsForm = () => {
  const form = useStore($changeGeneralSettingsForm)
  const errors = useStore($changeGeneralSettingsFormErrors)
  const isFormValid = useStore($isGeneralSettingsFormFormValid)
  const isFetching = useStore(changeGeneralSettingsFx.pending)
  const changeGeneralSettings = useEvent(changeGeneralSettingsFx)
  const _mounted = useEvent(mounted)
  const emailChange = useEvent(emailChanged)
  const timeZoneChange = useEvent(timeZoneChanged)

  useGate(SettingsGate)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    changeGeneralSettings({ email: form.email, timeZone: form.timeZone })
    e.preventDefault()
  }

  useEffect(() => {
    _mounted()
  }, [])

  return (
    <StyledForm onSubmit={submitHandler}>
      <Title>Общие</Title>
      <StyledFormItem label='Почта' error={errors.email}>
        <Input value={form.email} onChange={emailChange} />
      </StyledFormItem>
      <StyledFormItem label='Часовой пояс'>
        <StyledSelectInput
          value={form.timeZone}
          placeholder='Выберите часовой пояс'
          options={timeZones}
          onChange={(value: string | number) => {
            timeZoneChange(value.toString())
          }}
        />
      </StyledFormItem>
      <Actions>
        <DashedButton disabled={!isFormValid || isFetching}>Сохранить изменения</DashedButton>
      </Actions>
      {isFetching && <StyledSpinner />}
    </StyledForm>
  )
}
