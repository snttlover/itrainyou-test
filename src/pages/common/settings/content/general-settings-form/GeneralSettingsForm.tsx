import React, { FormEvent, useEffect } from "react"
import styled from "styled-components"
import { FormItem } from "@/old-components/form-item/FormItem"
import { Input } from "@/old-components/input/Input"
import { DashedButton } from "@/old-components/button/dashed/DashedButton"
import { useEvent, useGate, useStore } from "effector-react"
import {
  $changeGeneralSettingsForm,
  $changeGeneralSettingsFormErrors,
  $isGeneralSettingsFormFormValid,
  changeGeneralSettingsFx,
  emailChanged,
  phoneChanged,
  SettingsGate,
  timeZoneChanged,
} from "@/pages/common/settings/content/general-settings-form/general-settings.model"
import { Spinner } from "@/old-components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { DropdownItem, useSelectInput, SelectInputProps } from "@/old-components/select-input/SelectInput"
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
  ${MediaRange.lessThan("mobile")`
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
  ${MediaRange.lessThan("tablet")`
     display: flex;
     justify-content: center;
   `}
`

export const GeneralSettingsForm = () => {

  const {SelectInput} = useSelectInput()
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

  const form = useStore($changeGeneralSettingsForm)
  const errors = useStore($changeGeneralSettingsFormErrors)
  const isFormValid = useStore($isGeneralSettingsFormFormValid)
  const isFetching = useStore(changeGeneralSettingsFx.pending)
  const changeGeneralSettings = useEvent(changeGeneralSettingsFx)
  const _mounted = useEvent(mounted)
  const emailChange = useEvent(emailChanged)
  const phoneChange = useEvent(phoneChanged)
  const timeZoneChange = useEvent(timeZoneChanged)

  useGate(SettingsGate)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {    
    changeGeneralSettings({ email: form.email, phone: form.phone, timeZone: form.timeZone })

    e.preventDefault()
  }

  useEffect(() => {
    _mounted()
  }, [])

  return (
    <StyledForm onSubmit={submitHandler}>
      <Title>??????????</Title>
      <StyledFormItem label='??????????' error={errors.email}>
        <Input value={form.email} onChange={emailChange}/>
      </StyledFormItem>

      <StyledFormItem label='??????????????' error={errors.phone}>
        <Input
          mask='+7 (111) 111-11-11'
          placeholder='+7 (900) 000-00-00'
          value={form.phone}
          onChange={phoneChange}
          type='tel'
        />
      </StyledFormItem>
          
      <StyledFormItem label='?????????????? ????????'>
        <StyledSelectInput
          value={form.timeZone}
          placeholder='???????????????? ?????????????? ????????'
          options={timeZones}
          onChange={(value: string | number) => {
            timeZoneChange(value.toString())
          }}
        />
      </StyledFormItem>
      <Actions>
        <DashedButton disabled={!isFormValid || isFetching}>?????????????????? ??????????????????</DashedButton>
      </Actions>
      {isFetching && <StyledSpinner />}
    </StyledForm>
  )
}
