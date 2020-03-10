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

type SearchInputTypes = {
  value: string
  children: React.ReactNode[]
  placeholder?: string
  className?: string
  onChange?: (value: string) => void
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
  const autocompleteVisibility = props.children.length && focused

  return (
    <ClickOutside
      onClickOutside={() => {
        changeFocus(false)
      }}
    >
      <Container className={props.className}>
        <StyledInput
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onFocus={() => {
            changeFocus(true)
          }}
        />
        {autocompleteVisibility && autocomplete}
      </Container>
    </ClickOutside>
  )
}
