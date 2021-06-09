import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  width: 264px;
  height: 400px;
  padding: 44px 0 28px;

  &:first-child {
    margin-left: 16px;
  }

  &:last-child {
    margin-right: 16px;
  }
`

type Props = {
  coach: any
}

export const Card = ({ coach }: Props) => <Wrapper key={coach.id}>{coach.name}</Wrapper>
