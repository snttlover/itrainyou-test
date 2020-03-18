import * as React from "react"
import styled from "styled-components"
import { Input } from "../input/Input"
import { ClickOutside } from "../click-outside/ClickOutside"
import { SyntheticEvent, useState } from "react"

const Container = styled.div`
  position: relative;
  input {
    width: 100%;
  }
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
  border: 1px solid #449bd9;
  border-radius: 0px 0px 4px 4px;
`


const Loader = styled.div`
  position: absolute;
  height: calc(100% + 4px);
  background: #449bd9;
  left: -5px;
  top: -2px;
  opacity: 0.47;
  border-radius: 4px;
  z-index: -1;

  animation-name: loader-animation;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  @keyframes loader-animation {
    0% {
      left: -2px;
      width: 0;
    }
    49% {
      left: 0;
      width: 100%;
    }
    100% {
      left: calc(100% + 2px);
      width: 0;
    }
  }
`

type SearchInputTypes = {
  value: string
  children: React.ReactNode[] | React.ReactNode
  placeholder?: string
  className?: string
  isLoading?: boolean
  onChange?: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  onFocus?: (e: React.FocusEvent) => void
}

const StyledInput = styled(Input)`
  border: 1px solid #449bd9;
  padding: 8px 12px;
  &:hover {
    border: 1px solid #424242;
  }
`

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
  const autocompleteVisibility = props.children && focused

  return (
    <ClickOutside
      onClickOutside={() => {
        changeFocus(false)
      }}
    >
      <Container className={props.className}>
        { props.isLoading && <Loader /> }
        <StyledInput
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onFocus={(e) => {
            changeFocus(true)
            props.onFocus && props.onFocus(e)
          }}
          onKeyDown={props.onKeyDown}
        />
        {autocompleteVisibility && autocomplete}
      </Container>
    </ClickOutside>
  )
}
