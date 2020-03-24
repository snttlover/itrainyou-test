import { Checkbox } from "@app/components/checkbox/Checkbox"
import { Category } from "@app/lib/api/categories"
import { MediaRange } from "@app/lib/responsive/media"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import arrow from "./arrow.svg"

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 12px;
  user-select: none;
`

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
`

const Title = styled.div`
  margin-left: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #544274;
  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
  `}
`

type ArrowType = { reverse: boolean }

const Arrow = styled.img.attrs<ArrowType>({ src: arrow })`
  width: 12px;
  height: 7px;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translate(0, -50%) ${({ reverse }: ArrowType) => reverse && "rotate(180deg)"};
  transition: transform 200ms ease;
`

const Description = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  margin-top: 12px;

  ${MediaRange.greaterThan("mobile")`
    font-size: 14px;
    line-height: 18px;
  `}
`

type CategoryCardProps = {
  category: Category
  selected: boolean
  onSelect: (id: number) => void
  className?: string
}

export const CategoryCard = styled(({ category, selected, onSelect, className }: CategoryCardProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Container className={className} onClick={() => setOpen(!isOpen)}>
      <Header>
        <Checkbox value={selected} onChange={() => onSelect(category.id)} />
        <Icon src={category.icon} />
        <Title>{category.name}</Title>
        <Arrow reverse={isOpen} />
      </Header>
      {isOpen && <Description>{category.description}</Description>}
    </Container>
  )
})``
