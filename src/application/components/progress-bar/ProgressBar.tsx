import styled from "styled-components"
import * as React from "react"

const Line = styled.div`
  width: 100%;
  background: #D3D7F3;
  border-radius: 4px;
  height: 4px;
`
const Progress = styled.div<{percent: number}>`
  width: ${({percent}) => percent}%;
  background: #4858CC;
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
