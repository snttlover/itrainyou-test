import { FormItem } from "@/old-components/form-item/FormItem"
import { Input } from "@/old-components/input/Input"
import { Textarea } from "@/old-components/textarea/Textarea"
import {
  $form,
  $formErrors,
  photoUploadFx,
  educationChanged,
  descriptionChanged,
  workExperienceChanged,
  $photos,
  photoRemoved,
} from "./coach-data.model"
import { MediaRange } from "@/lib/responsive/media"
import { useStore, useEvent } from "effector-react"
import { useCallback } from "react"
import * as React from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"
import { DashedButton } from "@/old-components/button/dashed/DashedButton"
import ReactIdSwiper from "react-id-swiper"
import { SwiperOptions } from "swiper"

const InformationContainer = styled.div`
  margin: 32px 0 0;
  ${FormItem} {
    margin-top: 24px;
    margin-bottom: 0;
  }

  ${MediaRange.greaterThan("mobile")`
    max-width: 640px;
    margin: 0 auto 0;
    width: 100%;
  `}
`

const InformationTitle = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #783D9D;
  
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

const PhotoError = styled.p`
  font-family: Roboto;
  color: #ff6b00;
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`

const FormSection = styled.div`
  border-radius: 2px;
  background: #fff;
  padding: 24px;
  margin: 24px 0px;  
    ${MediaRange.lessThan("mobile")`
    padding: 8px;
  `}
`

const Description = styled.div`
    font-family: Roboto;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #5B6670;

    ${MediaRange.lessThan("mobile")` 
    font-size: 14px;
    line-height: 22px;
    `}
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const AddPhotosButton = styled(DashedButton)`
  margin: 24px auto 0;
`

export const CoachAdditionalInformationForm: React.FC = () => {
  const values = useStore($form)
  const errors = useStore($formErrors)

  const _photoUploadFx = useEvent(photoUploadFx)
  const _educationChanged = useEvent(educationChanged)
  const _workExperienceChanged = useEvent(workExperienceChanged)
  const _descriptionChanged = useEvent(descriptionChanged)

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

      <FormSection>
        <InformationTitle>Личные данные</InformationTitle>
        <FormItem label='Место обучения' error={errors.education}>
          <Input value={values.education} onChange={_educationChanged} />
        </FormItem>
        <FormItem label='Опыт работы' error={errors.workExperience}>
          <Textarea value={values.workExperience} onChange={_workExperienceChanged} rows={8} />
        </FormItem>
        <FormItem label='О себе' error={errors.description}>
          <Textarea value={values.description} onChange={_descriptionChanged} rows={8} />
        </FormItem>
      </FormSection>

      <FormSection>
        <InformationTitle>Фотографии</InformationTitle>
        <Description>Сюда вы можете добавить фотографии своих сертификатов, дипломов и т.д</Description>
        <Photos />
        <ButtonContainer>
          <AddPhotosButton data-secondary onClick={() => open()}>
            Добавить фотографии
          </AddPhotosButton>
        </ButtonContainer>
        <input {...getInputProps()} />
      </FormSection>
      
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
  display: none;

  ${MediaRange.greaterThan("mobile")`
    display: flex;
    flex-wrap: wrap;
  `}
`

const swiperOptions: SwiperOptions = {
  navigation: {
    nextEl: ".photos__next-button",
    prevEl: ".photos__prev-button",
  },
  slidesPerView: "auto",
}

const PinkPhotoBlock = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  background-color: #DFD0E7;
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

const Slider320 = styled.div`
  width: 100vw;
  margin-left: -16px;
  margin-right: -16px;
  ${MediaRange.greaterThan("mobile")`
    display: none;
  `}

  ${Photo} {
    &:first-of-type {
      margin-left: 16px;
    }
  }
`

const Photos = () => {
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
      <Slider320>
        <ReactIdSwiper {...swiperOptions}>{photos}</ReactIdSwiper>
      </Slider320>
      <Other>
        {photos}
      </Other>
    </PhotoList>
  )
}
