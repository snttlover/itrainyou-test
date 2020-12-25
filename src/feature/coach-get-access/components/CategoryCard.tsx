import { Checkbox } from "@/components/checkbox/Checkbox"
import { Icon } from "@/components/icon/Icon"
import { Category } from "@/feature/categories/categories.store"
import { MediaRange } from "@/lib/responsive/media"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import {CategoryDescription} from "@/pages/landing/content/top-bar/categories-picker/CategoryDescription"

const Container = styled.div<{ disabled?: boolean }>`
  background: #ffffff;
  border-radius: 2px;
  padding: 8px;
  max-width: 280px;
  justify-contert: center;
    width: 100%;
`

const Tabletka = styled(Icon).attrs({ name: "tabletka" })<{ color: string }>`
  fill: ${({ color }) => color};
  min-width: 16px;
  width: 16px;
  height: 16px;
  margin-left: 12px;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  margin-left: 12px;
    
    ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
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

const Category = styled.div`
  display: flex;
  align-items: center;  
  margin-bottom: 18px;
`

const StyledCategoriesDescription = styled(CategoryDescription)`
  margin-left: 10px;
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
          color={category.color}
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
