import { Checkbox } from "#/components/checkbox/Checkbox"
import { Icon } from "#/components/icon/Icon"
import { Category } from "#/feature/categories/categories.store"
import { MediaRange } from "#/lib/responsive/media"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div<{ disabled?: boolean }>`
  background: #ffffff;
  border-radius: 2px;
  padding: 8px;
  user-select: none;
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
  ${MediaRange.greaterThan("mobile")`
    padding: 20px;
    margin: 0 auto;
  `}
  ${MediaRange.greaterThan("tablet")`
    width: 100%;
  `}
`

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Tabletka = styled(Icon).attrs({ name: "tabletka" })<{ color: string }>`
  fill: ${({ color }) => color};
  min-width: 16px;
  width: 16px;
  height: 16px;
  margin-left: 12px;

  ${MediaRange.greaterThan("mobile")`
    width: 24px;
    height: 24px;
  `}
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 16px;
  line-height: 26px;
  color: #424242;
  margin-left: 8px;
  padding-right: 20px;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

type ArrowType = { reverse: boolean }

const Arrow = styled(Icon).attrs({ name: "arrow" })<ArrowType>`
  position: absolute;
  fill: #4858cc;
  top: 50%;
  right: 0;
  transform: translate(0, -50%) ${({ reverse }: ArrowType) => reverse && "rotate(180deg)"};
  transition: transform 200ms ease;
`

const Description = styled.p`
  font-size: 14px;
  line-height: 18px;
  margin-top: 12px;
  color: #424242;

  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
  `}
`

type CategoryCardProps = {
  category: Category
  selected: boolean
  onSelect: (id: number) => void
  className?: string
  disabled?: boolean
}

export const CategoryCard = styled(({ category, selected, onSelect, className, disabled }: CategoryCardProps) => {
  const [isOpen, setOpen] = useState(false)

  const realDisabled = !selected && disabled

  return (
    <Container className={className} onClick={() => setOpen(!isOpen)} disabled={realDisabled}>
      <Header>
        <Checkbox
          value={selected}
          color={category.color}
          onChange={() => {
            if (realDisabled) return
            onSelect(category.id)
          }}
        />
        <Tabletka color={category.color} />
        <Title>{category.name}</Title>
        <Arrow reverse={isOpen} />
      </Header>
      {isOpen && <Description>{category.description}</Description>}
    </Container>
  )
})``
