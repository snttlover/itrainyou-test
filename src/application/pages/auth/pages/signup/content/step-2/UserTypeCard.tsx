import * as React from "react"
import styled from "styled-components"

const Title = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`

const Description = styled.li`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  position: relative;
  font-weight: 300;

  &:before {
    content: "";
    position: absolute;

    width: 10px;
    height: 4px;
    left: -20px;
    top: calc(50% - 5px);
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotateZ(-45deg);
  }
`

const List = styled.ul`
  list-style-type: none;
  list-style-position: outside;
  margin-left: 20px;
`

const Block = styled.div<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? "#449bd9" : "#fff")};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 8px;

  ${Title} {
    color: ${({ selected }) => (selected ? "#fff" : "#544274")};
  }

  ${Description} {
    color: ${({ selected }) => (selected ? "#fff" : "#424242")};

    &:before {
      border-color: ${({ selected }) => (selected ? "#fff" : "#544274")};
    }
  }
`

type UserTypeCardProps = {
  title: string
  descriptions: string[]
  className?: string
  selected?: boolean
  onClick: () => void
}

export const UserTypeCard = styled(({ title, descriptions, ...props }: UserTypeCardProps) => (
  <Block {...props}>
    <Title>{title}</Title>
    <List>
      {descriptions.map((desc, i) => (
        <Description key={i}>{desc}</Description>
      ))}
    </List>
  </Block>
))``