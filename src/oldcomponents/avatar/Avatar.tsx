import { Icon } from "@/oldcomponents/icon/Icon"
import * as React from "react"
import styled from "styled-components"

const AvatarContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AvatarPlaceholder = styled(Icon).attrs({ name: "user" })`
  width: 70%;
  height: 70%;
  fill: ${props => props.theme.colors.primary};
`

const AvatarImage = styled.div<{ src: string | null }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

type AvatarProps = {
  src: string | null
  onClick?: () => void
}

export const Avatar = ({ src, ...props }: AvatarProps) => (
  <AvatarContainer {...props}>{src ? <AvatarImage src={src} /> : <AvatarPlaceholder />}</AvatarContainer>
)
