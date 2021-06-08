import * as React from "react"
import styled from "styled-components"
import { Icon } from "@/oldcomponents/icon/Icon"
import { useState } from "react"
import { MediaRange } from "@/lib/responsive/media"

const Container = styled.div<{noBack?: boolean}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: ${({ noBack }) => noBack ? "unset" : "#F8F8FD"};
  border-radius: 8px;

  ${MediaRange.lessThan("mobile")`
      padding: 8px;
    `}
`

const InfoIcon = styled(Icon).attrs({name: "info"})<{colorful?: boolean}>`
  width: 20px;
  height: 20px;
  margin-right: 20px;
  fill: ${({ colorful }) => colorful ? "#FF6B00" : "#5B6670"};
`

const Close = styled(Icon).attrs({ name: "close" })`
  width: 24px;
  heigth: 24px;
  cursor: pointer;
  fill: #5B6670;
  justify-self: flex-end;
  margin-left: auto; 
`

const Content = styled.div<{closable?: boolean}>`
    max-width: 85%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
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

export const Informer = styled(({ className, label, error, closable, colorful, noBack, children, ...props }) => {

  const [showed, setShowed] = useState(true)
  return (
    <>
      { showed ? <Container noBack={noBack}>
        <InfoIcon colorful={colorful} />
        <Content closable={closable}>
          {children}
        </Content>
        {closable ? <Close onClick={() => setShowed(false)}/> : null}
      </Container> : null}
    </>
  )
})``