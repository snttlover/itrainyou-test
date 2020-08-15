import { FormItem } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { Textarea } from "@/components/textarea/Textarea"
import {
  $form,
  $formErrors,
  photoUploadFx,
  educationChanged,
  descriptionChanged,
  workExperienceChanged,
  phoneChanged,
  $photos,
  photoRemoved,
} from "./coach-data.model"
import { MediaRange } from "@/lib/responsive/media"
import { useStore, useEvent } from "effector-react/ssr"
import { useCallback } from "react"
import * as React from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"

const InformationContainer = styled.div`
  margin: 32px 0 0;
  ${FormItem} {
    margin-top: 24px;
    margin-bottom: 0;
  }

  ${MediaRange.greaterThan("mobile")`
    max-width: 600px;
    margin: 52px auto 0;
    width: 100%;
  `}
`

const InformationTitle = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #424242;

  ${MediaRange.greaterThan("mobile")`    
    font-size: 20px;
    line-height: 26px;
  `}

  &.photo {
    margin-top: 24px;
    ${MediaRange.greaterThan("mobile")`
      margin-top: 36px;
    `}
  }
`

const PhoneHint = styled.p`
  margin-top: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`

const PhotoError = styled.p`
  font-family: Roboto;
  color: #ff6b00;
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`

export const CoachAdditionalInformationForm: React.FC = () => {
  const values = useStore($form)
  const errors = useStore($formErrors)

  const _photoUploadFx = useEvent(photoUploadFx)
  const _educationChanged = useEvent(educationChanged)
  const _workExperienceChanged = useEvent(workExperienceChanged)
  const _descriptionChanged = useEvent(descriptionChanged)
  const _phoneChanged = useEvent(phoneChanged)

  const onDropAccepted = useCallback(acceptedFiles => {
    acceptedFiles.forEach(_photoUploadFx)
  }, [])

  const { getInputProps, open } = useDropzone({
    onDropAccepted,
    multiple: true,
    noClick: true,
    maxSize: 2097152,
    accept: ["image/gif", "image/png", "image/jpg", "image/jpeg"],
  })

  return (
    <InformationContainer>
      <InformationTitle>Дополнительная информация</InformationTitle>
      <FormItem label='Место обучения' error={errors.education}>
        <Input withoutBorder value={values.education} onChange={_educationChanged} />
      </FormItem>
      <FormItem label='Опыт работы' error={errors.workExperience}>
        <Textarea withoutBorder value={values.workExperience} onChange={_workExperienceChanged} rows={8} />
      </FormItem>
      <FormItem label='О себе' error={errors.description}>
        <Textarea withoutBorder value={values.description} onChange={_descriptionChanged} rows={8} />
      </FormItem>
      <FormItem label='Телефон' error={errors.phone}>
        <Input
          mask='+7 111 111-11-11'
          placeholder='+7 900 000-00-00'
          value={values.phone}
          onChange={(value: any) => _phoneChanged(value)}
          withoutBorder
          type='tel'
        />
      </FormItem>
      <PhoneHint>Телефон будет виден только администраторам и супервизорам</PhoneHint>
      <InformationTitle className='photo'>Фотографии</InformationTitle>
      {errors.photos && <PhotoError>{errors.photos}</PhotoError>}
      <Photos open={open} />
      <input {...getInputProps()} />
    </InformationContainer>
  )
}

const Photo = styled.div<{ src: string }>`
  position: relative;
  width: 64px;
  height: 64px;
  background: url("${({ src }) => src}");
  background-position: center;
  background-size: cover;
  border-radius: 2px;
  margin-right: 10px;
  margin-top: 10px;
  
  ${MediaRange.greaterThan("mobile")`
    margin-right: 7px;
    margin-top: 7px;
    width: 94px;
    height: 94px;
  `}
`

const PhotoList = styled.div`
  width: calc(100% + 16px);
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const PhotoCross = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  right: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 1px 2px 1px 1px;

  span {
    position: absolute;
    display: block;
    background: #4858cc;
    width: 8px;
    height: 1px;

    &:nth-of-type(1) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:nth-of-type(2) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`

const Other = styled.div`
  display: flex;
  flex-wrap: wrap;
`

type PhotosProps = {
  open: () => void
}

const PinkPhotoBlock = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  background-color: #e0cfea;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;

  ${MediaRange.greaterThan("mobile")`
    margin-right: 7px;
    margin-top: 7px;
    width: 94px;
    height: 94px;
  `}
`

const PlusIcon = styled(Icon).attrs({ name: "plus" })`
  fill: ${({ theme }) => theme.colors.primary};
`

const AddPhoto = ({ onClick }: { onClick: () => void }) => (
  <PinkPhotoBlock onClick={onClick}>
    <PlusIcon name='plus' />
  </PinkPhotoBlock>
)

const Photos: React.FC<PhotosProps> = ({ open }) => {
  const _photoRemoved = useEvent(photoRemoved)
  const photos = useStore($photos).map((src, index) => (
    <Photo key={src} src={src} onClick={() => _photoRemoved(index)}>
      <PhotoCross>
        <span />
        <span />
      </PhotoCross>
    </Photo>
  ))

  return (
    <PhotoList>
      <Other>
        <AddPhoto onClick={open} />
        {photos}
      </Other>
    </PhotoList>
  )
}
