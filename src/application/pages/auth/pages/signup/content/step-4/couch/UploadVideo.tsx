import { ProgressBar } from "@/application/components/progress-bar/ProgressBar"
import { MediaRange } from "@/application/lib/responsive/media"
import {
  $step4Form,
  $videoUploadProgress,
  videoUploaded,
  videoUploadFx
} from "@/application/pages/auth/pages/signup/content/step-4/step-4-couch.model"
import { useStore } from "effector-react"
import * as React from "react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"

const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
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
  outline: none;

  ${MediaRange.greaterThan("mobile")`
    width: 400px;
    height: 240px;
  `}
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

export const UploadVideo = () => {
  const video = useStore($step4Form.map(form => form.videoInterview))
  const isVideoUploading = useStore(videoUploadFx.pending)
  const videoUploadProgress = useStore($videoUploadProgress)

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
    <InterviewContainer>
      <InterviewTitle>Видеоинтервью</InterviewTitle>
      <InterviewDescription>Запишите ответы на наши вопросы на видео. Мы хотим лучше узнать Вас!</InterviewDescription>
      <InterviewQuestions>
        <Question>Что для Вас является наилучшим результатом коучинга? (Приведите пример из Вашей практики)</Question>
        <Question>Перечислите ситуации/запросы, при которых коучинг не работает</Question>
        <Question>Какие цели в профессиональном развитии вы ставите перед собой в ближайшем будущем?</Question>
        <Question>
          Представьте ситуацию, что мы являемся Вашим потенциальным клиентом. Опишите, что такое коучинг так, чтобы мы
          приняли решение работать с Вами.
        </Question>
      </InterviewQuestions>
      <VideoUploader {...getRootProps()} onClick={open}>
        {!video && isVideoUploading && <ProgressBar percent={videoUploadProgress} />}
        {video && !isVideoUploading && <Video src={video} />}
        {!video && !isVideoUploading && "Добавить видео"}
      </VideoUploader>
      <input {...getInputProps()} />
    </InterviewContainer>
  )
}