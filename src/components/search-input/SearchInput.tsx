import * as React from "react"
import styled, { css } from "styled-components"
import { Input } from "../input/Input"
import { ClickOutside } from "../click-outside/ClickOutside"
import { useState } from "react"

type InputTypes = {
  opened: boolean
}

const StyledInput = styled(Input)`
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 30px;
  padding: 8px 12px;
  font-size: 16px;

  &::placeholder {
    color: #424242;
  }
`

const expandedStyles = css`
  ${StyledInput} {
    position: relative;
    border-radius: 20px 20px 0 0;
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
`

const Container = styled.div<InputTypes>`
  position: relative;
  input {
    width: 100%;
  }
  ${props => props.opened && expandedStyles}
`

const Autocomplete = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  margin-top: 35px;
  height: auto;
  padding: 8px 0;
  background: #ffffff;
  border: 1px solid #919be0;
  border-top: 0;
  border-radius: 0px 0px 4px 4px;
  max-height: 300px;
  overflow: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

type SearchInputTypes = {
  value: string
  children: React.ReactNode[] | React.ReactNode
  placeholder?: string
  className?: string
  onChange?: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  onFocus?: (e: React.FocusEvent) => void
  onBlur?: (e: React.FocusEvent) => void
}

export const SearchInput = (props: SearchInputTypes) => {
  const [focused, changeFocus] = useState(false)

  const autocomplete = (
    <Autocomplete
      onClick={() => {
        changeFocus(false)
      }}
    >
      {props.children}
    </Autocomplete>
  )
  const autocompleteVisibility = !!React.Children.toArray(props.children).length && focused

  return (
    <ClickOutside
      onClickOutside={() => {
        changeFocus(false)
      }}
    >
      <Container className={props.className} opened={autocompleteVisibility}>
        <StyledInput
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onFocus={e => {
            changeFocus(true)
            props.onFocus && props.onFocus(e)
          }}
          onBlur={e => {
            props.onBlur && props.onBlur(e)
          }}
          onKeyDown={props.onKeyDown}
        />
        {autocompleteVisibility && autocomplete}
      </Container>
    </ClickOutside>
  )
}
