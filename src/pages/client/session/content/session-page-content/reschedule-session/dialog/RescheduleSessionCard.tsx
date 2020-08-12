import React from "react"
import styled from "styled-components"
import { DialogOverlay } from "@/components/dialog/DialogOverlay"
import { RescheduleSessionCoach as Coach } from "@/pages/client/session/content/session-page-content/reschedule-session/dialog/content/RescheduleSessionCoach"
import { RescheduleSessionDatepicker as Datepicker } from "@/pages/client/session/content/session-page-content/reschedule-session/dialog/content/ RescheduleSessionDatepicker"
import { MediaRange } from "@/lib/responsive/media"
import { Icon } from "@/components/icon/Icon"
import { useStore } from "effector-react/ssr"
import {
  $rescheduleCoach,
  $rescheduleInitLoading,
} from "@/pages/client/session/content/session-page-content/reschedule-session/reschedule-session"
import { Loader } from "@/components/spinner/Spinner"

type RescheduleSessionCardTypes = {
  onChangeVisibility: (value: boolean) => void
}

export const RescheduleSessionCard = (props: RescheduleSessionCardTypes) => {
  const coach = useStore($rescheduleCoach)
  const loading = useStore($rescheduleInitLoading)

  return (
    <DialogOverlay onClick={() => props.onChangeVisibility(false)}>
      <>
        {loading && (
          <StyledLoader>
            <Loader />
          </StyledLoader>
        )}
        <Container onClick={e => e.stopPropagation()}>
          <MobileClose onClick={() => props.onChangeVisibility(false)} />
          <MobileHeader>Перенос сессии</MobileHeader>
          {!!coach && <Coach coach={coach} />}
          <Datepicker />
        </Container>
      </>
    </DialogOverlay>
  )
}

const StyledLoader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.8);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  ${MediaRange.lessThan(`mobile`)`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    background: #fff;
    padding: 16px;
  `}
`

const MobileClose = styled(Icon).attrs({ name: `close` })`
  fill: ${props => props.theme.colors.primary};
  width: 25px;
  height: 25px;
  flex-basis: 25px;
  cursor: pointer;
  display: none;
  align-self: flex-end;
  ${MediaRange.lessThan(`mobile`)`
    display: block;
    flex: none;
  `}
`

const MobileHeader = styled.div`
  font-family: Roboto Slab;
  display: none;
  margin-top: 24px;
  justify-content: center;
  margin-bottom: 32px;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  ${MediaRange.lessThan(`mobile`)`
    display: flex;
  `}
`
