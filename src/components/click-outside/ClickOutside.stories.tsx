import * as React from "react"
import { Button } from "../button/normal/Button"
import { ClickOutside } from "./ClickOutside"
import { useState } from "react"
import styled from "styled-components"

export default {
  component: ClickOutside,
  title: "ClickOutside"
}

const Container = styled.div`
  width: 300px;
  height: 150px;
  background: blueviolet;
  color: #fff;
  margin-top: 20px;
`

export const normal = () => {
  const [focused, change] = useState(false)

  const button = <Button onClick={() => {
    change(!focused)
  }}>ToggleShow</Button>

  return (
    <>
      <p>has{focused ? `` : `n\`t`} focus</p>
      {button}
      {focused && <ClickOutside onClickOutside={() => change(false)}>
        <Container onClick={() => change(!focused)}>
          {button}
        </Container>
      </ClickOutside>}
    </>
  )
}
