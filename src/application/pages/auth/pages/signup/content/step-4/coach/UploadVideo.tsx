import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { ProgressBar } from "@/application/components/progress-bar/ProgressBar"
import { MediaRange } from "@/application/lib/responsive/media"
import {
  $step4Form,
  $videoUploadProgress,
  videoUploaded,
  videoUploadFx
} from "@/application/pages/auth/pages/signup/content/step-4/step-4-coach.model"
import { useStore } from "effector-react"
import * as React from "react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import play from "./play.svg"

const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
  outline: none;
`

const InterviewContainer = styled.div`
  margin: 44px 8px 0;

  ${MediaRange.greaterThan("mobile")`
    max-width: 600px;
    width: 80%;
    margin: 44px auto 0;
  `};
  //
`

const InterviewTitle = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #7d36a8;
  margin-left: 8px;

  ${MediaRange.greaterThan("mobile")`    
    font-size: 24px;
    line-height: 26px;
  `}
`

const InterviewDescription = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  margin-left: 8px;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  margin-top: 4px;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 12px;
    font-size: 16px;
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
    margin: 24px 8px 0;
    padding: 32px 32px 24px 32px;
    
    ${Question} {
      margin-top: 28px;
    }
  `}
`

export const UploadVideo = () => {
  const video = useStore($step4Form.map(form => form.videoInterview))
  const isVideoUploading = useStore(videoUploadFx.pending)
  const videoUploadProgress = useStore($videoUploadProgress)

  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = React.createRef<HTMLVideoElement>()

  const onDropAccepted = useCallback(acceptedFiles => {
    videoUploaded(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, open } = useDropzone({
    onDropAccepted,
    multiple: false,
    noClick: true,
    accept: "video/*"
  })

  return (
    <InterviewContainer>
      <InterviewTitle>Видеоинтервью</InterviewTitle>
      <InterviewDescription>Запишите ответы на наши вопросы на видео. Мы хотим лучше узнать Вас!</InterviewDescription>
      <InterviewQuestions {...getRootProps()}>
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
              onPause={() => setIsPlaying(false)}
            >
              <source src={video} />
            </Video>
          </VideoContainer>
        )}
        {!isVideoUploading && <AddVideo onClick={open}>Загрузить видео</AddVideo>}
      </InterviewQuestions>
      <input {...getInputProps()} />
    </InterviewContainer>
  )
}

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

const AddVideo = styled(DashedButton).attrs({ secondary: true })`
  margin: 28px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
