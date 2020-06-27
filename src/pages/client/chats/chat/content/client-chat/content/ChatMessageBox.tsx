import React from "react"
import styled from "styled-components"
import {MediaRange} from "@/lib/responsive/media"

const Container = styled.div`
  background: #dbdee0;
  border-radius: 0px 0px 2px 2px;
  padding: 12px;
  display: flex;
  align-items: center;
`

const StyledInput = styled.input`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  padding: 7px 15px;
  border-radius: 18px;
  background: #fff;
  border: none;
  outline: none;
  flex: 1;

  &::placeholder {
    color: #9aa0a6;
  }
  
  ${MediaRange.lessThan(`mobile`)`
    padding: 7px 15px;
  `}
`

type ChatMessageBoxTypes = {
  value: string
  onChange: (value: string) => void
}

export const ChatMessageBox = (props: ChatMessageBoxTypes) => (
  <Container>
    <StyledInput
      value={props.value}
      placeholder='Напишите сообщение...'
      onChange={e => props.onChange(e.target.value)}
    />
  </Container>
)
