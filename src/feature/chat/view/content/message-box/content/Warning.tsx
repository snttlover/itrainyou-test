import React from "react"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"

type WarningProps = {
  className?: string
}

export const Warning: React.FC<WarningProps> = ({ children, className }) => {
  return (
    <StyledWarning className={className}>
      <WarningIcon />
      {children}
    </StyledWarning>
  )
}

const StyledWarning = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;

  background: #fff8f2;
  border-radius: 8px;

  font-family: Roboto;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

const WarningIcon = styled(Icon).attrs({ name: "warning" })`
  width: 20px;
  height: 20px;
  margin-right: 18px;
  flex-basis: 20px;
`
