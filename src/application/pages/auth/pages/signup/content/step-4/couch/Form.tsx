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
} from "@/application/pages/auth/pages/signup/content/step-4/step-4-couch.model"
import { useStore } from "effector-react"
import { useCallback } from "react"
import * as React from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import Carousel from "react-multi-carousel"

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
const AddPhotosButton = styled(DashedButton)`
  border: 1px solid #544274;
  color: #544274;
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
      <Photos />
      <ButtonContainer>
        <AddPhotosButton onClick={() => open()}>Добавить фотографии</AddPhotosButton>
      </ButtonContainer>
      <input {...getInputProps()} />
    </InformationContainer>
  )
}

const Photo = styled.div<{ src: string }>`
  width: 100px;
  height: 100px;
  background: url("${({ src }) => src}");
  background-position: center;
  background-size: cover;
  margin-left: 8px;
`

const StyledCarousel = styled(Carousel)`
  margin-top: 24px;
`

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    partialVisibilityGutter: 0 // this is optional if you are not using partialVisible props
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    partialVisibilityGutter: 0 // this is optional if you are not using partialVisible props
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    partialVisibilityGutter: 0 // this is optional if you are not using partialVisible props
  }
}

const Photos = () => {
  const photos = useStore($photos)
  return (
    <StyledCarousel removeArrowOnDeviceType={["mobile", "tablet", "desktop"]} responsive={responsive}>
      {photos.map((src, index) => (
        <Photo key={src} src={src} onClick={() => photoRemoved(index)} />
      ))}
    </StyledCarousel>
  )
}
