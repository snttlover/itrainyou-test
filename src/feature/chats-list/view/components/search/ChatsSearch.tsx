import React from "react"
import styled from "styled-components"
import { Input } from "@/old-components/input/Input"
import { Icon } from "@/old-components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

type ChatsSearchProps = {
  value: string
  onChange: (value: string) => void
  find: (payload: void) => void
}

export const ChatsSearch = (props: ChatsSearchProps) => {
  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      props.find()
    }
  }

  return (
    <Container>
      <StyledInput
        value={props.value}
        placeholder={"Поиск по имени"}
        onChange={props.onChange}
        onKeyDown={keydownHandler}
      />
      <SearchIcon onClick={() => props.find()} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 16px;
`

const StyledInput = styled(Input)`
  width: 100%;
  background: #f4f5f7;
  border-radius: 8px;
  padding: 8px;
  padding-left: 40px;
  border: none !important;
  font-size: 14px;
  line-height: 16px;
  &::placeholder {
    color: #9aa0a6;
  }
`

const SearchIcon = styled(Icon).attrs({ name: "chat-search" })`
  position: absolute;
  top: 50%;
  left: 26px;
  transform: translateY(-50%);
  fill: #5b6670;
  width: 15px;
`
