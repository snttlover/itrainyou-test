import { DashedButton } from "@app/components/button/dashed/DashedButton"
import { Button } from "@app/components/button/normal/Button"
import { FormItem } from "@app/components/form-item/FormItem"
import { Input } from "@app/components/input/Input"
import { Textarea } from "@app/components/textarea/Textarea"
import { $categoriesList } from "@app/feature/categories/categories.store"
import { MediaRange } from "@app/lib/responsive/media"
import { CategoryCard } from "@app/pages/auth/pages/signup/content/step-4/couch/CategoryCard"
import {
  $step4Form,
  educationChanged,
  workExperienceChanged,
  descriptionChanged,
  phoneChanged, videoUploadFx, $videoUploadProgress, videoUploaded
} from "@app/pages/auth/pages/signup/content/step-4/step-4-couch.model"
import {
  $userData,
  registerUserFx,
  toggleCategorySelection,
  userRegistered
} from "@app/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react"
import { useCallback } from "react"
import * as React from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import { ProgressBar } from "@/application/components/progress-bar/ProgressBar"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0 0;
  outline: none;
  ${MediaRange.greaterThan("mobile")`
    margin: 44px 0 0;
  `}
`

const CategoriesContainer = styled.div`
  margin: 0 8px;

  ${CategoryCard} {
    margin-top: 16px;
  }

  ${MediaRange.greaterThan("mobile")`
    ${CategoryCard} {
      margin-top: 24px;
      
      &:first-of-type {
        margin-top: 28px;
      }
    }
  `};
  //
  ${MediaRange.greaterThan("tablet")`
    width: 610px;
    margin: 0 auto;
  `};
  //
`

const CategoriesTitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

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

const InterviewContainer = styled.div`
  margin: 44px 8px 0;

  ${MediaRange.greaterThan("tablet")`
    width: 700px;
    margin: 44px auto 0;
  `};
  //
`

const InterviewTitle = styled.h2`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  text-align: center;

  ${MediaRange.greaterThan("mobile")`    
    font-size: 36px;
    line-height: 44px;
  `}
`

const InterviewDescription = styled.h2`
  margin-top: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;

  ${MediaRange.greaterThan("mobile")`    
    margin: 16px auto 0;
    font-size: 20px;
    line-height: 26px;
    width: 60%;
  `}
`

const Question = styled.li`
  counter-increment: item;

  &:before {
    display: inline-block;
    padding-right: 4px;
    font-weight: bold;
    text-align: right;
    content: counter(item) ".";
  }
`

const InterviewQuestions = styled.ol`
  list-style-type: none;
  list-style-position: inside;
  counter-reset: item;
  margin: 12px 8px 0;
  font-size: 12px;
  line-height: 16px;
  font-weight: 300;

  ${Question} {
    margin-top: 12px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
    margin: 62px 8px 0;
  `}
`

const VideoUploader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #449bd9;
  box-sizing: border-box;
  border-radius: 4px;
  height: 172px;
  width: 288px;
  margin: 24px auto 0;
  position: relative;
  padding: 12px;
  cursor: pointer;

  ${MediaRange.greaterThan("mobile")`
    width: 400px;
    height: 240px;
  `}
`

const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
`

const SendRequestButton = styled(Button)`
  margin: 36px auto 44px;
  background: #544274;
`

type CouchInformation = {}

export const CouchInformation = ({}: CouchInformation) => {
  const selectedCategories = useStore($userData).categories
  const values = useStore($step4Form)
  const loading = useStore(registerUserFx.pending)
  const isVideoUploading = useStore(videoUploadFx.pending)
  const videoUploadProgress = useStore($videoUploadProgress)

  const categories = useStore($categoriesList).map(category => (
    <CategoryCard
      key={category.id}
      category={category}
      selected={selectedCategories.includes(category.id)}
      onSelect={id => toggleCategorySelection(id)}
    />
  ))

  const onDropAccepted = useCallback(acceptedFiles => {
    videoUploaded(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, open } = useDropzone({
    onDropAccepted,
    multiple: false,
    noClick: true,
    accept: ["video/mp4"]
  })
  return (
    <Container {...getRootProps()}>
      <CategoriesContainer>
        <CategoriesTitle>Выберите направления, в которых вы проводите сессии:</CategoriesTitle>
        {categories}
      </CategoriesContainer>
      <InformationContainer>
        <InformationTitle>Заполните информацию</InformationTitle>
        <FormItem label='Место обучения'>
          <Input value={values.education} onChange={educationChanged} />
        </FormItem>
        <FormItem label='Опыт работы'>
          <Textarea value={values.workExperience} onChange={workExperienceChanged} rows={8} />
        </FormItem>
        <FormItem label='О себе'>
          <Textarea value={values.description} onChange={descriptionChanged} rows={8} />
        </FormItem>
        <FormItem label='Телефон'>
          <Input value={values.phone} type='number' onChange={phoneChanged} />
        </FormItem>
        <PhoneHint>Телефон будет виден только администраторам и супервизорам</PhoneHint>
        <AddPhotosButton>Добавить фотографии</AddPhotosButton>
      </InformationContainer>
      <InterviewContainer>
        <InterviewTitle>Видеоинтервью</InterviewTitle>
        <InterviewDescription>
          Запишите ответы на наши вопросы на видео. Мы хотим лучше узнать Вас!
        </InterviewDescription>
        <InterviewQuestions>
          <Question>Что для Вас является наилучшим результатом коучинга? (Приведите пример из Вашей практики)</Question>
          <Question>Перечислите ситуации/запросы, при которых коучинг не работает</Question>
          <Question>Какие цели в профессиональном развитии вы ставите перед собой в ближайшем будущем?</Question>
          <Question>
            Представьте ситуацию, что мы являемся Вашим потенциальным клиентом. Опишите, что такое коучинг так, чтобы мы
            приняли решение работать с Вами.
          </Question>
        </InterviewQuestions>
        <VideoUploader onClick={open}>
          {!values.videoInterview && isVideoUploading && <ProgressBar percent={videoUploadProgress} />}
          {values.videoInterview && !isVideoUploading && <Video src={values.videoInterview} />}
          {!values.videoInterview && !isVideoUploading && 'Добавить видео'}
        </VideoUploader>
        <input {...getInputProps()}/>
        <SendRequestButton disabled={loading || isVideoUploading} onClick={() => userRegistered()}>
          Отправить заявку
        </SendRequestButton>
      </InterviewContainer>
    </Container>
  )
}
