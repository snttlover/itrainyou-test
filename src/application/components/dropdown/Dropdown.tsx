import * as React from "react"
import styled, { css } from "styled-components"
import { ClickOutside } from "../click-outside/ClickOutside"
import { useState } from "react"
import arrowImage from "./arrow.svg"

const Button = styled.button`
  border: 1px solid #3b8ac3;
  border-radius: 4px;
  padding: 7px 12px;
  display: flex;
  align-items: center;
  height: 36px;
  cursor: pointer;
  outline: none;
  background: #fff;
`

const Arrow = styled.img.attrs({ src: arrowImage })`
  color: #544274;
  margin-left: 20px;
  width: 12px;
`

const expandedStyles = css`
  ${Button} {
    position: relative;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      background: #fff;
      height: 4px;
      z-index: 2;
    }
  }
  ${Arrow} {
    transform: rotate(-180deg);
  }
`

type ContainerTypes = {
  expanded: boolean
}

const Container = styled.div<ContainerTypes>`
  position: relative;
  display: inline-flex;
  ${props => props.expanded && expandedStyles}
`

const Items = styled.div`
  width: 100%;
  min-width: 400px;
  position: absolute;
  z-index: 1;
  top: 0;
  margin-top: 35px;
  height: auto;
  padding: 8px 0;
  background: #ffffff;
  border: 1px solid #449bd9;
  border-radius: 0px 4px 4px 4px;
`

type SearchInputTypes = {
  renderTitle: () => React.ReactNode
  children: React.ReactNode[]
}

export const Dropdown = (props: SearchInputTypes) => {
  const [focused, changeFocus] = useState(false)

  const autocomplete = (
    <Items>
      {props.children}
    </Items>
  )
  const autocompleteVisibility = props.children && focused

  return (
    <ClickOutside
      onClickOutside={() => {
        changeFocus(false)
      }}
    >
      <Container expanded={autocompleteVisibility}>
        <Button
          onClick={() => {
            changeFocus(true)
          }}
        >
          {props.renderTitle()}
          <Arrow />
        </Button>
        {autocompleteVisibility && autocomplete}
      </Container>
    </ClickOutside>
  )
}
