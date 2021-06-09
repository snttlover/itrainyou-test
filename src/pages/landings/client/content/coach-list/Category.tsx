import React from "react"
import styled from "styled-components"

const Wrapper = styled.li<{ bgColor: string; textColor: string }>`
  padding: 5px 8px;
  border-radius: 8px;

  color: ${props => props.textColor};
  background-color: ${props => props.bgColor};

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  text-align: center;

  margin-bottom: 8px;

  @media (min-width: 768px) {
    margin-right: 8px;
  }
`

const colorMap = [
  {
    bg: "rgba(10, 167, 255, 0.07)",
    text: "rgba(10, 167, 255, 1)",
  },
  {
    bg: "rgba(255, 74, 0, 0.07)",
    text: "rgba(255, 74, 0, 1)",
  },
  {
    bg: "rgba(168, 214, 0, 0.07)",
    text: "rgba(168, 214, 0, 1)",
  },
  {
    bg: "rgba(255, 127, 0, 0.07)",
    text: "rgba(255, 127, 0, 1)",
  },
  {
    bg: "rgba(0, 179, 175, 0.07)",
    text: "rgba(0, 179, 175, 1)",
  },
  {
    bg: "rgba(215, 62, 175, 0.07)",
    text: "rgba(215, 62, 175, 1)",
  },
]

type Props = {
  id: number
  name: string
}

export const Category = ({ id, name }: Props) => (
  <Wrapper bgColor={colorMap[id - 1].bg} textColor={colorMap[id - 1].text}>
    {name}
  </Wrapper>
)
