import React from "react"
import { useEvent, useStore } from "effector-react"
import { Dialog } from "@/components/dialog/Dialog"
import styled from "styled-components"
import { BookedModal } from "./BookedModal"
import { MediaRange } from "@/lib/responsive/media"
import { Spinner } from "@/components/spinner/Spinner"
import {
  $bookSessionsStatusModalVisibility,
  $buySessionsLoading,
  toggleBookSessionsStatusModal
} from "@/pages/search/content/list/content/modals/book-sessions-status-modal.model"

export const BookSessionsStatusModalDialog = () => {
  const visibility = useStore($bookSessionsStatusModalVisibility)
  const toggle = useEvent(toggleBookSessionsStatusModal)
  const isLoading = useStore($buySessionsLoading)

  return (
    <StyledDialog isLoaded={!isLoading} value={visibility} onChange={toggle}>
      <Container>
        {isLoading ? <Spinner /> : <BookedModal />}
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
