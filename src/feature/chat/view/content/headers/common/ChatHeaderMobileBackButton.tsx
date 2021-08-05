import React from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { Icon } from "@/old-components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { Link } from "react-router-dom"

export const ChatHeaderMobileBackButton = ({ to }: { to?: string }): JSX.Element => {
  const history = useHistory()
  
  if (to) {
    return (
      <Link to={to}>
        <Button />
      </Link>
    )
  }

  return <Button onClick={()=>history.goBack()} />
}

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
