import styled from "styled-components"
import * as React from "react"

const Line = styled.div`
  width: 100%;
  background: #A3CFF3;
  border-radius: 4px;
  height: 4px;
`
const Progress = styled.div<{percent: number}>`
  width: ${({percent}) => percent}%;
  background: #449BD9;
  border-radius: 4px;
  height: 4px;
`

type ProgressBarProps = {
  percent: number
  className?: string
}

export const ProgressBar = styled(({percent, ...props}: ProgressBarProps) => (
  <Line {...props}>
    <Progress percent={percent}/>
  </Line>
))``
