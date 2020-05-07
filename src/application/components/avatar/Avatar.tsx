import { Icon } from "@/application/components/icon/Icon"
import * as React from "react"
import styled from "styled-components"

const AvatarContainer = styled.div<{size: number}>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: 50%;
`

const Placeholder = styled(Icon).attrs({ name: 'user' })`
  width: 100%;
  height: 100%;
  fill: #4858CC;
  stroke: #4858CC;
`

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

type AvatarProps = {
  src: string
  size?: number
  onClick: () => void
}

export const Avatar = ({ src, size = 80, ...props}: AvatarProps) => (
  <AvatarContainer size={size} {...props}>
    {src ? <AvatarImage src={src} /> : <Placeholder />}
  </AvatarContainer>
)
