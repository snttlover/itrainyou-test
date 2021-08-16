import React, { FC } from "react"
import styled from "styled-components"

type ProgressProps = {
  value: number
}

export const FullContentProgress: FC<ProgressProps> = ({ value }) => {
  return (
    <StyledProgress>
      <ProgressLineWrapper>
        <ProgressLine value={value} />
      </ProgressLineWrapper>
    </StyledProgress>
  )
}

const StyledProgress = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: 2;
`

const ProgressLineWrapper = styled.div`
  width: 100%;
  max-width: 100px;
  margin-left: 20px;
  margin-right: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  height: 8px;
  overflow: hidden;
`

type ProgressLineProps = {
  value: number
}

const ProgressLine = styled.div<ProgressLineProps>`
  background: #fff;
  width: ${props => props.value}%;
  height: 100%;
  transition: 300ms width;
`
