import { DashedButton } from "@/components/button/dashed/DashedButton"
import { FormItem } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { Textarea } from "@/components/textarea/Textarea"
import {
  $form,
  $formErrors,
  $selectLegalForm,
  $feeRatio,
  photoUploadFx,
  educationChanged,
  descriptionChanged,
  workExperienceChanged,
  phoneChanged,
  $photos,
  photoRemoved,
  changeLegalDataCheckBox,
  innChanged,
  supervisionsChanged,
  socialNetworkChanged,
} from "@/feature/coach-get-access/coach-get-access.model"
import { MediaRange } from "@/lib/responsive/media"
import { useStore, useEvent } from "effector-react"
import { useCallback } from "react"
import * as React from "react"
import { useDropzone } from "react-dropzone"
import ReactIdSwiper from "react-id-swiper"
import styled from "styled-components"
import { SwiperOptions } from "swiper"
import { Checkbox } from "@/components/checkbox/Checkbox"
import { PriceWithCommisionInput } from "@/feature/coach-get-access/components/PriceWithCommisionInputGroup"

const InformationContainer = styled.div`
  margin: 10px 16px 0;
  ${FormItem} {
    margin-top: 24px;
    margin-bottom: 0;
  }

  ${MediaRange.greaterThan("mobile")`
    max-width: 640px;
    margin: 10px auto 0;
    width: 100%;
  `}
`

const InformationTitle = styled.div`
    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #783D9D;
    margin-bottom: 8px;
    
    ${MediaRange.greaterThan("mobile")`
        margin: 0 auto;
        max-width: 640px;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 8px;
       `}
            ${MediaRange.greaterThan("tablet")` 
                font-size: 20px;
                line-height: 28px;
                margin-bottom: 8px;
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

const FormSection = styled.div`
  border-radius: 2px;
  background: #fff;
  padding: 24px;
  margin: 12px 0px;  
    ${MediaRange.lessThan("mobile")`
    padding: 8px;
  `}
`

const Title = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #424242;
    margin-left: 12px;  
`

const LegalItem = styled.div`
  display: flex;
  align-items: flex-start;  
  margin-top: 15px;
`

const LegalForm = ({ id, onSelect, selected, name }: LegalDataProps) => {

  return (
    <LegalItem key={id}>
      <Checkbox
        value={selected}
        color={"#783D9D"}
        onChange={() => onSelect(id)}
      />
      <Title>{name}</Title>
    </LegalItem>
  )
}

type LegalDataProps = {
    id: number
    selected: boolean
    onSelect: (id: number) => void
    name: string
}

export const Form = () => {
  const values = useStore($form)
  const errors = useStore($formErrors)
  const legalForm = useStore($selectLegalForm)
  const feeRatio = useStore($feeRatio)

  const _photoUploadFx = useEvent(photoUploadFx)
  const _educationChanged = useEvent(educationChanged)
  const _workExperienceChanged = useEvent(workExperienceChanged)
  const _descriptionChanged = useEvent(descriptionChanged)
  const _phoneChanged = useEvent(phoneChanged)
  const _changeLegalDataCheckBox = useEvent(changeLegalDataCheckBox)
  const _innChanged = useEvent(innChanged)
  const _supervisionsChanged = useEvent(supervisionsChanged)
  const _socialNetworkChanged = useEvent(socialNetworkChanged)

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
          <Textarea value={values.workExperience} onChange={_workExperienceChanged} rows={1} />
        </FormItem>
        <FormItem label='О себе' error={errors.description}>
          <Textarea value={values.description} placeholder={"Сюда вы можете добавить свои статьи в журналах и т.д."} onChange={_descriptionChanged} rows={8} />
        </FormItem>
      </FormSection>

      <FormSection>
        <InformationTitle>Юридические данные</InformationTitle>
        <Description>Эти данные нужны нам для проверки, они не будут видны клиентам</Description>
        <FormItem label='ИНН' error={errors.inn}>
          <Input value={values.inn} onChange={_innChanged} type='number' />
        </FormItem>
        <FormItem label='Кем вы являетесь'>
          {legalForm.map(item => (
            <LegalForm
              key={item.id}
              id={item.id}
              onSelect={id => _changeLegalDataCheckBox(id)}
              selected={item.selected}
              name={item.name}
            />
          ))}
        </FormItem>
      </FormSection>
        
      <FormSection>
        <InformationTitle>Дополнительная информация</InformationTitle>
        <Description>Телефон будет виден только администраторам и супервизорам</Description>
        <FormItem label='Телефон' error={errors.phone}>
          <Input
            mask='+1 111 111-11-11'
            placeholder='+7 900 000-00-00'
            value={values.phone}
            onChange={(value: any) => _phoneChanged(value)}
            type='tel'
          />
        </FormItem>
        <FormItem label='Ссылки на ваши социальные сети' error={errors.socialNetworks}>
          <Textarea value={values.socialNetworks} onChange={_socialNetworkChanged} rows={8} />
        </FormItem>
        <FormItem label='Проходите ли вы супервизии? Как часто? Контакты супервизора' error={errors.supervisions}>
          <Textarea value={values.supervisions} onChange={_supervisionsChanged} rows={8} />
        </FormItem>
      </FormSection>
        
      <FormSection>
        <InformationTitle>Цена за сессию</InformationTitle>
        <Description>Укажите стоимость вашей сессии для каждого времени. Цена для клиента — цена вашей сессии с учетом комиссии платформы ({feeRatio*100}%).</Description>
        <PriceWithCommisionInput title='30 минут' name='d30Price' />
        <PriceWithCommisionInput title='45 минут' name='d45Price' />
        <PriceWithCommisionInput title='60 минут' name='d60Price' />
        <PriceWithCommisionInput title='90 минут' name='d90Price' />
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
    prevEl: ".photos__prev-button",
  },
  slidesPerView: "auto",
}

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
      <Other>{photos}</Other>
    </PhotoList>
  )
}