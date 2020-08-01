import React from "react"
import styled from "styled-components"
import { DialogOverlay } from "@/components/dialog/DialogOverlay"
import { RescheduleSessionCoach as Coach } from "@/pages/client/session/content/session-page-content/reschedule-session/dialog/content/RescheduleSessionCoach"
import { RescheduleSessionDatepicker as Datepicker } from "@/pages/client/session/content/session-page-content/reschedule-session/dialog/content/ RescheduleSessionDatepicker"
import { MediaRange } from "@/lib/responsive/media"
import { Icon } from "@/components/icon/Icon"

type RescheduleSessionCardTypes = {
  onChangeVisibility: (value: boolean) => void
}

export const RescheduleSessionCard = (props: RescheduleSessionCardTypes) => (
  <DialogOverlay onClick={() => props.onChangeVisibility(false)}>
    <Container>
      <MobileClose onClick={() => props.onChangeVisibility(false)} />
      <MobileHeader>Перенос сессии</MobileHeader>
      <Coach />
      <Datepicker />
    </Container>
  </DialogOverlay>
)

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
