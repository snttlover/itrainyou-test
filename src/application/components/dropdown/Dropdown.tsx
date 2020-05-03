import * as React from "react"
import styled, { css } from "styled-components"
import { ClickOutside } from "../click-outside/ClickOutside"
import { useState } from "react"
import arrowImage from "./arrow.svg"

type ButtonTypes = {
  opened: boolean
}

const Button = styled.button<ButtonTypes>`
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-color: ${props => props.opened ? `#bbc2f1` : `trasparent`};
  padding: 7px 12px;
  display: flex;
  align-items: center;
  height: 36px;
  cursor: pointer;
  outline: none;
  background: #fff;
  justify-content: space-between;
`

const Arrow = styled.img.attrs({ src: arrowImage })`
  transition: all 300ms;
  color: #544274;
  margin-left: 20px;
  width: 12px;
`

const expandedStyles = css`
  ${Button} {
    position: relative;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
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
      z-index: 20;
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
  width: 400px;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  margin-top: 35px;
  height: auto;
  padding: 8px 0;
  background: #ffffff;  
  border-radius: 0px 2px 2px 2px;
  border: 1px solid #bbc2f1;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

type DropdownTypes = {
  renderTitle: () => React.ReactNode
  children: React.ReactNode[] | React.ReactNode
  className?: string
  onClose?: () => any
}

export const Dropdown = (props: DropdownTypes) => {
  const [focused, changeFocus] = useState(false)

  const changeFocusHandler = (focus: boolean) => {
    if (!focus) {
      props.onClose && props.onClose()
    }
    changeFocus(focus)
  }

  const autocomplete = <Items>{props.children}</Items>
  const autocompleteVisibility = !!props.children && focused

  return (
    <ClickOutside
      onClickOutside={() => {changeFocusHandler(false)}}
    >
      <Container className={props.className} expanded={autocompleteVisibility}>
        <Button opened={focused} onClick={() => {changeFocusHandler(!focused)}}>
          {props.renderTitle()}
          <Arrow />
        </Button>
        {autocompleteVisibility && autocomplete}
      </Container>
    </ClickOutside>
  )
}
