import React, { useState } from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { CancelSessionDialog } from "@/pages/client/session/content/session-page-content/cancel-session/CancelSessionDialog"

export const CancelSession = ({ className }: { className?: string }) => {
  const [cancelDialogVisibility, changeCancelDialogVisibility] = useState(false)
  return (
    <>
      <Button className={className} onClick={() => changeCancelDialogVisibility(true)}>
        Отменить сессию
      </Button>
      <CancelSessionDialog visibility={cancelDialogVisibility} onChangeVisibility={changeCancelDialogVisibility} />
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
