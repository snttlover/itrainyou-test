import React from "react"
import { useStore } from "effector-react"
import { Dialog } from "@/components/dialog/Dialog"
import styled from "styled-components"
import { useEvent } from "effector-react"
import { SuccessfullyBulked } from "./types/Success"
import { MediaRange } from "@/lib/responsive/media"
import { showBulkedSessionsModal, $bulkedSessionsModal, $bulkedSessions,$sessionsPickerStore } from "@/pages/search/coach-by-id/coach-by-id.model"
import { Spinner } from "@/components/spinner/Spinner"

export const BulkedSessionsModalDialog = () => {
  const visibility = useStore($bulkedSessionsModal)
  const hide = useEvent(showBulkedSessionsModal)
  const isLoaded = useStore($sessionsPickerStore.buySessionsLoading)

  return (
    <StyledDialog isLoaded={!isLoaded} value={visibility} onChange={() => hide()}>
      <Container>
        {!isLoaded ? <SuccessfullyBulked /> : <Spinner /> }
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
