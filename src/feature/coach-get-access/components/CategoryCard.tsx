import { Checkbox } from "@/oldcomponents/checkbox/Checkbox"
import { Icon } from "@/oldcomponents/icon/Icon"
import { Category } from "@/feature/categories/categories.store"
import { MediaRange } from "@/lib/responsive/media"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import { CategoryDescription } from "@/pages/landing-old/content/top-bar/categories-picker/CategoryDescription"

const Container = styled.div<{ disabled?: boolean }>`
  background: #ffffff;
  border-radius: 2px;
  padding: 8px;
  max-width: 280px;
  justify-contert: center;
  width: 100%;
  user-select: none;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
`

const Tabletka = styled(Icon).attrs({ name: "tabletka" })<{ color: string }>`
  fill: ${({ color }) => color};
  min-width: 16px;
  width: 16px;
  height: 16px;
  margin-left: 8px;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  margin-left: 12px;

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
  `}
`

const Category = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledCategoriesDescription = styled(CategoryDescription)`
  margin-left: 5px;
`

type CategoryCardProps = {
  category: Category
  selected: boolean
  onSelect: (id: number) => void
  className?: string
  disabled?: boolean
}

export const CategoryCard = styled(({ category, selected, onSelect, className, disabled }: CategoryCardProps) => {
  const realDisabled = !selected && disabled

  return (
    <Container className={className} disabled={realDisabled}>
      <Category>
        <Checkbox
          value={selected}
          color={"#783D9D"}
          onChange={() => {
            if (realDisabled) return
            onSelect(category.id)
          }}
        />
        <Title>{category.name}</Title>
        <Tabletka color={category.color} />
        <StyledCategoriesDescription>{category.description}</StyledCategoriesDescription>
      </Category>
    </Container>
  )
})``
