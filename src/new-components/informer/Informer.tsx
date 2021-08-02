import * as React from "react"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"
import { useState } from "react"
import { MediaRange } from "@/lib/responsive/media"
import { IconName } from "@/old-components/icon/Icon"

const Container = styled.div<{backGround: string}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 18px;
  background: ${({ backGround }) => backGround};
  border-radius: 8px;

  ${MediaRange.lessThan("mobile")`
    padding: 8px;
  `}
`

type IconType = {
  colorful?: boolean
  iconName: IconName
}

const InfoIcon = styled(Icon).attrs(({ iconName }: IconType) => ({
  name: !!iconName ? iconName : "info",
}))<IconType>`
  width: 22px;
  height: 22px;
  margin-right: 18px;
  fill: ${({ colorful }) => colorful ? "#FF6B00" : "#5B6670"};
`

const Close = styled(Icon).attrs({ name: "close" })<{crossColor?: boolean}>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: ${({ crossColor }) => crossColor ? "#ffffff" : "#5B6670"};
  justify-self: flex-end;
  margin-left: auto; 
`

const Content = styled.div<{closable?: boolean, color: string}>`
    max-width: 85%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: ${({ color }) => color};
    display: flex;
    align-items: center;

    ${MediaRange.lessThan("mobile")`
      max-width:${
  // @ts-ignore
  ({ closable }) => closable ? "77%" : "85%"};
      flex-direction: column;
    `}
`

export const Informer = styled(({ iconName, onCrossClick, crossColored, closable, colorful, backGround, color, children }) => {

  const [showed, setShowed] = useState(true)

  enum backGroundColors {
    orange = "#FFF8F2",
    blue = "linear-gradient(91.34deg, #0A58CC -38.45%, #9E58CC 128.49%), linear-gradient(90deg, #4858CC -50%, #783D9D 150%), #FFFFFF",
    no = "#ffffff",
    default = "#F8F8FD",
  }

  enum colors {
    orange = "#FF6B00",
    default = "#5B6670",
  }

  const calculateBackGround = () => {
    if (backGround === "orange") return backGroundColors.orange
    if (backGround === "blue") return backGroundColors.blue
    if (backGround === "no") return backGroundColors.no
    return backGroundColors.default
  }

  const calculateColor = () => {
    if (color === "orange") return colors.orange
    return colors.default
  }

  const handleOnCrossClick = () => {
    setShowed(false)
    if (onCrossClick) onCrossClick()
  }

  return (
    <>
      { showed ? <Container backGround={calculateBackGround()}>
        <InfoIcon iconName={iconName} colorful={colorful} />
        <Content closable={closable} color={calculateColor()}>
          {children}
        </Content>
        {closable ? <Close crossColor={crossColored} onClick={handleOnCrossClick}/> : null}
      </Container> : null}
    </>
  )
})``