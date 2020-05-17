import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { Button } from "@/application/components/button/normal/Button"
import { Icon } from "@/application/components/icon/Icon"
import { Category } from "@/application/feature/categories/categories.store"
import { MediaRange } from "@/application/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 8px 0;
  background: #ffffff;
  padding: 12px 8px;
  border-radius: 2px;
  ${MediaRange.greaterThan("mobile")`
    width: 92%;
    padding: 24px 36px;
    margin: 36px auto 0;
  `}
  ${MediaRange.greaterThan("tablet")`    
    margin: 52px auto 0;
    width: 664px;
  `}
`

const Title = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #424242;
  display: flex;
  align-items: center;

  ${MediaRange.greaterThan("mobile")`
    font-size: 24px;
    line-height: 26px;
  `}
`

const TabletkaIcon = styled(Icon).attrs({ name: "tabletka" })<{ color: string }>`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  fill: ${({ color }) => color};
  ${MediaRange.greaterThan("mobile")`
    margin-right: 12px;        
    width: 36px;
    height: 36px;
  `}
`

const Description = styled.p`
  margin-top: 8px;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  ${MediaRange.greaterThan("mobile")`    
    font-size: 16px;
    line-height: 22px;
  `}
`

const ButtonsContainer = styled.div`
  width: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4px;

  ${MediaRange.greaterThan("mobile")`
    width: 160px;
    margin-top: 24px;
  `}
`

const DefaultButton = styled(Button)<{ color: string }>`
  height: 26px;
  padding: 0;
  display: none;
  background: ${({ color }) => color};

  ${MediaRange.greaterThan("mobile")`
    display: block;
  `}
`

const StyledDashedButton = styled(DashedButton)<{ color: string }>`
  height: 26px;
  padding: 0;
  display: none;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};

  ${MediaRange.greaterThan("mobile")`
    display: block;
  `}
`

const TextButton = styled.div<{ color: string }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${({ color }) => color};
  ${MediaRange.greaterThan("mobile")`
    display: none;
  `}
`

type CategoryCardProps = {
  category: Category
  className?: string
  selected?: boolean
  onSelect: (id: number) => void
}

export const CategoryCard = styled(({ category, className, onSelect, selected }: CategoryCardProps) => {
  const ButtonComponent = selected ? DefaultButton : StyledDashedButton
  return (
    <Container className={className}>
      <Title>
        <TabletkaIcon color={category.color} /> {category.name}
      </Title>
      <Description>{category.description}</Description>
      <ButtonsContainer>
        <ButtonComponent color={category.color} onClick={() => onSelect(category.id)}>
          {selected ? "Выбрано" : "Выбрать"}
        </ButtonComponent>
        <TextButton color={category.color} onClick={() => onSelect(category.id)}>
          {selected ? "Выбрано" : "Выбрать"}
        </TextButton>
      </ButtonsContainer>
    </Container>
  )
})``
