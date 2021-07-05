import * as React from "react"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"
import { useState } from "react"
import { MediaRange } from "@/lib/responsive/media"
import { IconName } from "@/old-components/icon/Icon"

const Container = styled.div<{backGround?: string}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 18px;
  background: ${({ backGround }) => backGround ? backGround : "#F8F8FD"};
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

const Content = styled.div<{closable?: boolean}>`
    max-width: 85%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #5B6670;
    display: flex;
    align-items: center;

    ${MediaRange.lessThan("mobile")`
      max-width:${
  // @ts-ignore
  ({ closable }) => closable ? "77%" : "85%"};
      flex-direction: column;
    `}
`

export const Informer = styled(({ className, error, iconName, onCrossClick, crossColored, closable, colorful, backGround, children, ...props }) => {

  const [showed, setShowed] = useState(true)

  const calculateBackGround = () => {
    if (backGround === "blue") return "linear-gradient(91.34deg, #0A58CC -38.45%, #9E58CC 128.49%), linear-gradient(90deg, #4858CC -50%, #783D9D 150%), #FFFFFF;"
    if (backGround === "no") return "#ffffff"
    return "#F8F8FD"
  }

  const handleOnCrossClick = () => {
    setShowed(false)
    if (onCrossClick) onCrossClick()
  }

  return (
    <>
      { showed ? <Container backGround={calculateBackGround()}>
        <InfoIcon iconName={iconName} colorful={colorful} />
        <Content closable={closable}>
          {children}
        </Content>
        {closable ? <Close crossColor={crossColored} onClick={handleOnCrossClick}/> : null}
      </Container> : null}
    </>
  )
})``