import React, { useState } from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { RescheduleSessionCard } from "@/pages/client/session/content/session-page-content/reschedule-session/dialog/RescheduleSessionCard"
import { useEvent, useStore } from "effector-react/ssr"
import {
  $rescheduleVisibility,
  changeRescheduleVisibility
} from "@/pages/client/session/content/session-page-content/reschedule-session/reschedule-session"

export const RescheduleSession = ({ className }: { className?: string }) => {
  const visibility = useStore($rescheduleVisibility)
  const onChangeVisibility = useEvent(changeRescheduleVisibility)

  return (
    <>
      <Button className={className} onClick={() => onChangeVisibility(true)}>
        Перенести сессию
      </Button>
      {visibility && <RescheduleSessionCard onChangeVisibility={onChangeVisibility} />}
    </>
  )
}

const Button = styled.div`
  display: flex;
  width: 100%;
  padding: 13px 0;
  align-items: center;
  justify-content: center;
  color: #424242;

  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  background: #fff;
  border-radius: 2px;
  margin-top: 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  ${MediaRange.lessThan(`mobile`)`
    font-size: 14px;
    line-height: 18px;
    margin-top: 12px;
    padding: 10px 0;
  `}
`

export const TabletRescheduleSession = styled(RescheduleSession)`
  display: none;
  ${MediaRange.lessThan(`tablet`)`
    display: flex;
  `}
`
