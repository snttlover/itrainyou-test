import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { FormItem } from "@/application/components/form-item/FormItem"
import { Input } from "@/application/components/input/Input"
import { Textarea } from "@/application/components/textarea/Textarea"
import { MediaRange } from "@/application/lib/responsive/media"
import {
  $photos,
  $step4Form,
  $step4FormErrors,
  descriptionChanged,
  educationChanged,
  phoneChanged,
  photoRemoved,
  photoUploadFx,
  workExperienceChanged
} from "@/application/pages/auth/pages/signup/content/step-4/step-4-coach.model"
import { useStore } from "effector-react"
import { useCallback } from "react"
import * as React from "react"
import { useDropzone } from "react-dropzone"
import ReactIdSwiper from "react-id-swiper"
import ReactInputMask from "react-input-mask"
import styled from "styled-components"
import { SwiperOptions } from "swiper"

const InputMask: any = ReactInputMask

const InformationContainer = styled.div`
  margin: 32px 16px 0;
  ${FormItem} {
    margin-top: 24px;
    margin-bottom: 0;
  }

  ${MediaRange.greaterThan("mobile")`
    max-width: 600px;
    width: 80%;
    margin: 52px auto 0;
  `}
`

const InformationTitle = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #7d36a8;

  ${MediaRange.greaterThan("mobile")`    
    font-size: 24px;
    line-height: 26px;
  `}
  ${MediaRange.greaterThan("tablet")`    
    font-size: 24px;
    line-height: 26px;
  `}
`

const PhoneHint = styled.p`
  margin-top: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
const AddPhotosButton = styled(DashedButton)`
  margin: 24px auto 0;
`

export const Form = () => {
  const values = useStore($step4Form)
  const errors = useStore($step4FormErrors)

  const onDropAccepted = useCallback(acceptedFiles => {
    acceptedFiles.forEach(photoUploadFx)
  }, [])

  const { getInputProps, open } = useDropzone({
    onDropAccepted,
    multiple: true,
    noClick: true,
    maxSize: 2097152,
    accept: ["image/gif", "image/png", "image/jpg", "image/jpeg"]
  })

  return (
    <InformationContainer>
      <InformationTitle>Заполните информацию</InformationTitle>
      <FormItem label='Место обучения' error={errors.education}>
        <Input withoutBorder value={values.education} onChange={educationChanged} />
      </FormItem>
      <FormItem label='Опыт работы' error={errors.workExperience}>
        <Textarea withoutBorder value={values.workExperience} onChange={workExperienceChanged} rows={8} />
      </FormItem>
      <FormItem label='О себе' error={errors.description}>
        <Textarea withoutBorder value={values.description} onChange={descriptionChanged} rows={8} />
      </FormItem>
      <FormItem label='Телефон' error={errors.phone}>
        <Input
          mask='+7 111 111-11-11'
          placeholder='+7 900 000-00-00'
          value={values.phone}
          onChange={(value: any) => phoneChanged(value)}
          withoutBorder
          type='tel'
        />
        }
      </FormItem>
      <PhoneHint>Телефон будет виден только администраторам и супервизорам</PhoneHint>
      <Photos />
      <ButtonContainer>
        <AddPhotosButton secondary onClick={() => open()}>
          Добавить фотографии
        </AddPhotosButton>
      </ButtonContainer>
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
    prevEl: ".photos__prev-button"
  },
  slidesPerView: "auto"
}

const Photos = () => {
  const photos = useStore($photos).map((src, index) => (
    <Photo key={src} src={src} onClick={() => photoRemoved(index)}>
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
      <Other>{photos}</Other>
    </PhotoList>
  )
}
