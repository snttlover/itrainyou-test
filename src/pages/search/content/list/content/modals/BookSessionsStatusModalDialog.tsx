import React from "react"
import { useEvent, useStore } from "effector-react"
import { Dialog } from "@/components/dialog/Dialog"
import styled from "styled-components"
import { SuccessfullyBookedModal } from "./types/Success"
import { MediaRange } from "@/lib/responsive/media"
import { Spinner } from "@/components/spinner/Spinner"
import { Event, Store } from "effector-root"
import { BookedSessionsForViewTypes } from "@/components/coach-card/select-date/select-date.model"

export type BookSessionsStatusModalDialogTypes = {
  sessionsData: {
    buySessionsLoading: Store<boolean>,
    $bookedSessionsForView: BookedSessionsForViewTypes,
    $bookSessionsStatusModalVisibility: Store<boolean>,
    toggleBookSessionsStatusModal: Event<void | boolean>
  }
}

export const BookSessionsStatusModalDialog = (props: BookSessionsStatusModalDialogTypes) => {
  const visibility = useStore(props.sessionsData.$bookSessionsStatusModalVisibility)
  const toggle = useEvent(props.sessionsData.toggleBookSessionsStatusModal)
  const isLoading = useStore(props.sessionsData.buySessionsLoading)

  return (
    <StyledDialog isLoaded={!isLoading} value={visibility} onChange={() => toggle()}>
      <Container>
        {isLoading ? <Spinner /> : <SuccessfullyBookedModal sessionsData={props.sessionsData} />}
      </Container>
    </StyledDialog>
  )
}


const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`

const StyledDialog = styled(Dialog)<{isLoaded: boolean}>`
  width: 100%;
  max-width: 600px;
  height: ${({ isLoaded }) => (isLoaded ? "unset" : "500px")};
  padding: 24px 16px;
    ${MediaRange.lessThan("mobile")`
  `}
`
