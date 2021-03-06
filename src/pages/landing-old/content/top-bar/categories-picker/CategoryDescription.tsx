import * as React from "react"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

const Tooltip = styled.div`
  width: 256px;
  height: auto;
  position: absolute;
  z-index: 1;
  padding: 8px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  left: 20px;
  top: 0;
  display: none;

  ${MediaRange.lessThan("tablet")`
     left: unset;
     right: 0;
     top: 20px;
  `}

  ${MediaRange.lessThan("mobile")`
    right: 0;
    width: 100%;
    top: unset;
  `}
`

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover ${Tooltip} {
    display: block;
  }
  ${MediaRange.lessThan("mobile")`
      position: unset;
  `}
`

const InfoIcon = styled(Icon).attrs({ name: "info" })`
  fill: #919be0;
  width: 17px;
  height: 17px;
`

type CategoryDescriptionProps = {
  children: React.ReactChild
  className?: string
}

export const CategoryDescription = (props: CategoryDescriptionProps) => {
  const clickHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <StyledContainer className={props.className} onClick={clickHandler}>
      <InfoIcon />
      <Tooltip>{props.children}</Tooltip>
    </StyledContainer>
  )
}
