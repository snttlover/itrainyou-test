import { fetchCategoriesListFx } from "@/feature/categories/categories.store"
import { CoachInformation } from "@/feature/coach-get-access/components/CoachInformation"
import { MediaRange } from "@/lib/responsive/media"
import {
  $progress,
  coachGetAccessMounted,
  patchCoachDataFx,
  updateCoachData,
} from "@/pages/coach/home/get-access/coach-get-access.model"
import { useStore } from "effector-react/ssr"
import React, { useEffect } from "react"
import styled from "styled-components"

export const CoachFilledPercentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  padding: 0 16px;

  ${MediaRange.greaterThan("mobile")`
    padding: 0;
    justify-content: center;
  `}

  ${MediaRange.greaterThan("laptop")`
    display: none;
  `}
`

export const CircleContainer = styled.div`
  position: relative;
`

export const ProgressText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;

  text-align: center;

  ${MediaRange.greaterThan("mobile")`
    font-weight: bold;
    font-size: 32px;
    line-height: 26px;
  `}
`

const CircleProgressBar = styled(
  ({
    progress,
    radius,
    stroke,
    className,
  }: {
    progress: number
    radius: number
    stroke: number
    className?: string
  }) => {
    const normalizeRadius = radius - stroke * 2
    const circumference = normalizeRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
      <CircleContainer className={className}>
        <ProgressText>{progress.toFixed()}%</ProgressText>
        <svg width={radius * 2} height={radius * 2} transform='rotate(-90)'>
          <circle
            stroke='#E0CFEA'
            fill='transparent'
            strokeDasharray={0 + " " + 0}
            style={{ strokeDashoffset: 0 }}
            strokeWidth={stroke}
            r={normalizeRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke='#7D36A8'
            fill='transparent'
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeWidth={stroke}
            r={normalizeRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      </CircleContainer>
    )
  }
)``

const FilledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
`

const FilledText = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #424242;
  margin: 0;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}

  ${MediaRange.greaterThan("laptop")`
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  `}
`

const FilledDescription = styled.p`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #5b6670;

  width: 132px;

  ${MediaRange.greaterThan("mobile")`
    font-size: 14px;
    line-height: 18px;
  `}

  ${MediaRange.greaterThan("laptop")`
    font-size: 14px;
    line-height: 18px;
    color: #7D36A8;
    width: 160px;
  `}
`

const MobileProgress = styled(CircleProgressBar).attrs({ radius: 63, stroke: 4 })`
  ${MediaRange.greaterThan("mobile")`
    display: none;
  `}
`
const TabletProgress = styled(CircleProgressBar).attrs({ radius: 85, stroke: 6 })`
  display: none;
  ${MediaRange.greaterThan("mobile")`
    display: block;
  `}
`

const CoachFilledPercentContainerLaptop = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 190px;
  margin-top: 0;
  transform: translate(100%);
  right: -40px;

  ${TabletProgress} {
    margin-top: 6px;
  }

  ${MediaRange.greaterThan("laptop")`
    display: flex;
  `}
`

export const CoachGetAccess = ({ className }: { className?: string }) => {
  const progress = useStore($progress)
  const isLoading = useStore(patchCoachDataFx.pending)
  useEffect(() => {
    coachGetAccessMounted()
  }, [])

  return (
    <>
      <CoachFilledPercentContainer>
        <MobileProgress progress={progress} />
        <TabletProgress progress={progress} />
        <FilledTextContainer>
          <FilledText>Заполнено</FilledText>
          <FilledDescription>При заполнении 100%, вы сможете отправить заявку.</FilledDescription>
        </FilledTextContainer>
      </CoachFilledPercentContainer>

      <CoachFilledPercentContainerLaptop>
        <FilledText>Заполнено</FilledText>
        <TabletProgress progress={progress} />
        <FilledDescription>При заполнении 100%, вы сможете отправить заявку.</FilledDescription>
      </CoachFilledPercentContainerLaptop>

      <CoachInformation
        className={className}
        withoutCheckStep
        onRegisterClick={() => updateCoachData()}
        loading={isLoading}
      />
    </>
  )
}
