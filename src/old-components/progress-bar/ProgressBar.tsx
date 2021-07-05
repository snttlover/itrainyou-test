import styled from "styled-components"
import * as React from "react"

const Line = styled.div<{ secondary?: boolean }>`
  width: 100%;
  background: ${({ theme }) => `${theme.colors.primary}1F`};
  border-radius: 4px;
  height: 4px;
`

const Progress = styled.div<{ percent: number; secondary?: boolean; colorful?: boolean }>`
  width: ${({ percent }) => percent}%;
  background: ${({ percent, theme, colorful }) => {
    if (!!colorful) {
      if (percent < 15) return "#FF6B00"
      if (percent >= 15 && percent < 40) return "#F6C435"
      if (percent >= 40) return "#00B3AF"
    }
    else {
      return theme.colors.primary
    }
    return "white"
  }};
  border-radius: 4px;
  height: 4px;
`

type ProgressBarProps = {
  percent: number
  secondary?: boolean
  className?: string
  colorful?: boolean
}

export const ProgressBar = styled(({ percent, colorful, ...props }: ProgressBarProps) => (
  <Line {...props}>
    <Progress secondary={props.secondary} colorful={colorful} percent={percent} />
  </Line>
))``
