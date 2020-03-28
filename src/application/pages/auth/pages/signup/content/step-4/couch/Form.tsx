import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { FormItem } from "@/application/components/form-item/FormItem"
import { Input } from "@/application/components/input/Input"
import { Textarea } from "@/application/components/textarea/Textarea"
import { MediaRange } from "@/application/lib/responsive/media"
import {
  $step4Form,
  $step4FormErrors,
  descriptionChanged,
  educationChanged,
  phoneChanged,
  workExperienceChanged
} from "@/application/pages/auth/pages/signup/content/step-4/step-4-couch.model"
import { useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"

const InformationContainer = styled.div`
  margin: 56px 16px 0;
  ${FormItem} {
    margin-top: 24px;
    margin-bottom: 0;
  }

  ${MediaRange.greaterThan("mobile")`
    margin: 102px 16px 0;
  `}

  ${MediaRange.greaterThan("tablet")`
    width: 610px;
    margin: 102px auto 0;
  `}
`

const InformationTitle = styled.h2`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
`

const PhoneHint = styled.p`
  margin-top: 4px;
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
`

const AddPhotosButton = styled(DashedButton)`
  border: 1px solid #544274;
  color: #544274;
  margin: 24px auto 0;
`

export const Form = () => {
  const values = useStore($step4Form)
  const errors = useStore($step4FormErrors)

  return (
    <InformationContainer>
      <InformationTitle>Заполните информацию</InformationTitle>
      <FormItem label='Место обучения' error={errors.education} required>
        <Input value={values.education} onChange={educationChanged} />
      </FormItem>
      <FormItem label='Опыт работы' error={errors.workExperience} required>
        <Textarea value={values.workExperience} onChange={workExperienceChanged} rows={8} />
      </FormItem>
      <FormItem label='О себе' error={errors.description} required>
        <Textarea value={values.description} onChange={descriptionChanged} rows={8} />
      </FormItem>
      <FormItem label='Телефон' error={errors.phone} required>
        <Input value={values.phone} type='phone' onChange={phoneChanged} />
      </FormItem>
      <PhoneHint>Телефон будет виден только администраторам и супервизорам</PhoneHint>
      <AddPhotosButton>Добавить фотографии</AddPhotosButton>
    </InformationContainer>
  )
}
