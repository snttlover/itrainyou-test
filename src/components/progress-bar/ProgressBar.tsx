import styled from "styled-components"
import * as React from "react"

const Line = styled.div<{ secondary?: boolean }>`
  width: 100%;
  background: ${({ secondary }) => (secondary ? "#DFD0E7" : "#d3d7f3")};
  border-radius: 4px;
  height: 4px;
`
const Progress = styled.div<{ percent: number; secondary?: boolean }>`
  width: ${({ percent }) => percent}%;
  background: ${({ secondary }) => (secondary ? "#783D9D" : "#4858cc")};
  border-radius: 4px;
  height: 4px;
`

type ProgressBarProps = {
  percent: number
  secondary?: boolean
  className?: string
}

export const ProgressBar = styled(({ percent, ...props }: ProgressBarProps) => (
  <Line {...props}>
    <Progress secondary={props.secondary} percent={percent} />
  </Line>
))``
