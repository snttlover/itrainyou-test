import React, { useEffect, useRef, useState } from "react"
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
  onSend: (value: string) => void
}

export const ChatMessageBox = (props: ChatMessageBoxTypes) => {
  const [value, change] = useState(``)
  const input = useRef<HTMLInputElement>(null)

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      props.onSend(value)
      change(``)
    }
  }

  useEffect(() => {
    if (input.current && window.innerWidth <= 768) {
      input.current.focus()
    }
  }, [])

  return (
    <Container>
      <StyledInput
        ref={input}
        value={value}
        placeholder='Напишите сообщение...'
        onChange={e => change(e.target.value)}
        onKeyDown={keydownHandler}
      />
    </Container>
  )
}
