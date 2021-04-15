import * as React from "react"
import styled from "styled-components"
import { Icon } from "@/oldcomponents/icon/Icon"
import { useState } from "react"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #F8F8FD;
  border-radius: 8px;
`

const InfoIcon = styled(Icon).attrs({name: "info"})`
    width: 20px;
    height: 20px;
    margin-right: 20px;
`

const Close = styled(Icon).attrs({ name: "close" })`
  width: 24px;
  heigth: 24px;
  cursor: pointer;
  fill: #5B6670;
  justify-self: flex-end;
  margin-left: auto; 
`

const Content = styled.div`
    max-width: 85%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #5B6670;
`

export const Informer = styled(({ className, label, error, children, ...props }) => {

  const [showed, setShowed] = useState(true)
  return (
    <>
      { showed ? <Container>
        <InfoIcon />
        <Content>
          {children}
        </Content>
        <Close onClick={() => setShowed(false)}/>
      </Container> : null}
    </>
  )
})``