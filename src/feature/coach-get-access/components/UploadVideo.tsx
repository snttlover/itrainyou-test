import { DashedButton } from "@/components/button/dashed/DashedButton"
import { ProgressBar } from "@/components/progress-bar/ProgressBar"
import {
  $form,
  $videoUploadProgress,
  videoUploaded,
  videoUploadFx,
} from "@/feature/coach-get-access/coach-get-access.model"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent, useStore } from "effector-react"
import * as React from "react"
import { useCallback, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import styled from "styled-components"
import play from "../../../pages/auth/pages/signup/content/step-4/coach/play.svg"

const Video = styled.video.attrs({
  preload:"metadata"
})`
  max-width: 100%;
  max-height: 100%;
  outline: none;
`

const InterviewContainer = styled.div`
    margin: 24px 16px 0;

  ${MediaRange.greaterThan("mobile")`
    max-width: 640px;
    margin: 0 auto 0;
  `}

  ${MediaRange.greaterThan("tablet")`
    max-width: 640px;
  `}
`

const InterviewTitle = styled.div`
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

const InterviewDescription = styled.div`
    font-family: Roboto;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #5B6670;
    margin-bottom: 16px;
    
    ${MediaRange.lessThan("mobile")` 
    font-size: 14px;
    line-height: 22px;
    `}
`

const Question = styled.li`
  margin-left: 14px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;

  & > div {
    margin-left: 8px;
  }

  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
  `}
`

const InterviewQuestions = styled.ol`
  margin: 8px 0 0;
  background-color: #fff;
  border-radius: 2px;
  padding: 16px 8px;
  outline: none;

  ${Question} {
    margin-top: 16px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  ${ProgressBar} {
    margin-top: 43px;
  }

  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
    padding: 32px 32px 24px 32px;
    
    ${Question} {
      margin-top: 28px;
    }
  `}
`

const $videoInterview = $form.map(form => form.videoInterview)

export const UploadVideo = () => {
  const [error, setError] = useState<null | string>(null)
  const video = useStore($videoInterview)
  const isVideoUploading = useStore(videoUploadFx.pending)
  const videoUploadProgress = useStore($videoUploadProgress)
  const _videoUploaded = useEvent(videoUploaded)

  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = React.createRef<HTMLVideoElement>()

  const maxSize = 3221225472

  const onDropAccepted = useCallback(acceptedFiles => {
    setError(null)
    _videoUploaded(acceptedFiles[0])
  }, [])
  
  const onDropRejected = useCallback((files: FileRejection[]) => {
    if (files[0].file.size > maxSize) setError("Слишком большой размер видео — максимальный размер  3 Гб")
    else setError("Вы можете загрузить видео в формате MP4, MPEG, OGG, WEBM или MOV")
  }, [])

  const { getRootProps, getInputProps, open } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    noClick: true,
    accept: ["video/mp4", "video/mpeg", "video/ogg", "video/webm", ".mov"],
    maxSize,
  })

  return (
    <InterviewContainer>

      <InterviewQuestions {...getRootProps()}>
        <InterviewTitle>Видеоинтервью</InterviewTitle>
        <InterviewDescription>Запишите ответы на наши вопросы на видео. Мы хотим лучше узнать Вас!</InterviewDescription>
        <Question>
          <div>
            Что для Вас является наилучшим результатом коучинга? <br />
            (Приведите пример из Вашей практики)
          </div>
        </Question>
        <Question>
          <div>Перечислите ситуации/запросы, при которых коучинг не работает</div>
        </Question>
        <Question>
          <div>Какие цели в профессиональном развитии Вы ставите перед собой в ближайшем будущем?</div>
        </Question>
        <Question>
          <div>
            Представьте ситуацию, что мы являемся Вашим потенциальным клиентом. Опишите, что такое коучинг так, чтобы мы
            приняли решение работать с Вами.
          </div>
        </Question>
        {!video && isVideoUploading && <ProgressBar secondary percent={videoUploadProgress} />}
        {video && !isVideoUploading && (
          <VideoContainer>
            {!isPlaying && <PlayButton />}
            <Video
              controls={isPlaying}
              ref={videoRef}
              onClick={() => {
                if (videoRef.current && !isPlaying) {
                  videoRef.current
                    .play()
                    .then(() => {
                      setIsPlaying(true)
                    })
                    .catch(error => console.error(error))
                }
              }}
            >
              <source src={video + "#t=3.5"} />
            </Video>
          </VideoContainer>
        )}
        {error && <ErrorText>{error}</ErrorText>}
        {!isVideoUploading && <AddVideo onClick={open}>Загрузить видео</AddVideo>}
      </InterviewQuestions>
      <input 
        {...getInputProps()}
      />
    </InterviewContainer>
  )
}

const ErrorText = styled.div`
  color: #FF6B00;
  font-size: 14px;
  font-family: 'Roboto';
  margin-top: 24px;
  text-align: center;
  ${MediaRange.lessThan("mobile")`
    font-size: 12px;
    margin-top: 8px;
  `}
`

const PlayButton = styled.img.attrs({ src: play })`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`

const VideoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 12px;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 24px;
  `}
`

const AddVideo = styled(DashedButton).attrs({ "data-secondary": true })`
  margin: 28px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  padding: 8px 24px;

  ${MediaRange.lessThan("mobile")`
    width: 180px;
    padding: 4px 24px;
  `}
`
