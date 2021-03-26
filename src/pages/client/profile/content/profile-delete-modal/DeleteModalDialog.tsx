import React from "react"
import { useStore } from "effector-react"
import { Dialog } from "@/components/dialog/Dialog"
import styled from "styled-components"
import { useEvent } from "effector-react"
import { $cardsSessionsForView } from "@/pages/client/wallet/cards/cards.model"
import { CardSessions } from "./CardSessions"
import { ConfirmDelete } from "./ConfirmDelete"
import { toggleDeleteCardModalDialog, $showDeleteCardModalDialog} from "@/pages/client/profile/profile-page.model"
import { MediaRange } from "@/lib/responsive/media"

export const DeleteModalDialog = () => {
  const visibility = useStore($showDeleteCardModalDialog)
  const hide = useEvent(toggleDeleteCardModalDialog)
  const cards = useStore($cardsSessionsForView)
  
  return (
    <StyledDialog isSessions={cards.length > 0} value={visibility} onChange={hide}>
      <Container>
        {cards.length > 0 ? <CardSessions /> : <ConfirmDelete />}
      </Container>
    </StyledDialog>
  )
}


const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`

const StyledDialog = styled(Dialog)<{isSessions: boolean}>`
  width: 100%;
  max-width: ${({ isSessions }) => (isSessions ? "600px" : "480px")};
  padding: ${({ isSessions }) => (isSessions ? "24px 40px" : "24px 16px")};
    ${MediaRange.lessThan("mobile")`
  `}
`