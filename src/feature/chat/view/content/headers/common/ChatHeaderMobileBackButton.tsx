import React from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { Link } from "react-router-dom"

export const ChatHeaderMobileBackButton = ({ to }: { to: string }) => (
  <Link to={to}>
    <Button />
  </Link>
)

const Button = styled(Icon).attrs({ name: "left-icon" })`
  width: 18px;
  height: 18px;
  cursor: pointer;
  fill: ${props => props.theme.colors.primary};
  margin-right: 12px;
  display: none;
  ${MediaRange.lessThan("mobile")`
    display: flex;
  `}
`
