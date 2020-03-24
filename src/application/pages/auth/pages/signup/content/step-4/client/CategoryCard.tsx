import { DashedButton } from "@app/components/button/dashed/DashedButton"
import { Button } from "@app/components/button/normal/Button"
import { Category } from "@app/lib/api/categories"
import { MediaRange } from "@app/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 36px 12px 0;
  ${MediaRange.greaterThan("mobile")`
    width: 92%;
    margin: 36px auto 0;
  `}
  ${MediaRange.greaterThan("tablet")`    
    margin: 52px auto 0;
  `}
`

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #424242;
  display: flex;
  align-items: center;

  ${MediaRange.greaterThan("mobile")`    
    font-size: 20px;
    line-height: 26px;
  `}
`

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  ${MediaRange.greaterThan("mobile")`    
    width: 36px;
    height: 36px;
  `}
`

const Description = styled.p`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  ${MediaRange.greaterThan("mobile")`    
    font-size: 16px;
    line-height: 22px;
  `}
`

const ButtonsContainer = styled.div`
  margin-top: 8px;
  width: 160px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
`

const DefaultButton = styled(Button)`
  border: solid 1px transparent;
`

type CategoryCardProps = {
  category: Category
  className?: string
  selected?: boolean
  onSelect: (id: number) => void
}

export const CategoryCard = styled(({ category, className, onSelect, selected }: CategoryCardProps) => {
  const ButtonComponent = selected ? DefaultButton : DashedButton
  return (
    <Container className={className}>
      <Title>
        <Icon src={category.icon} /> {category.name}
      </Title>
      <Description>{category.description}</Description>
      <ButtonsContainer>
        <ButtonComponent onClick={() => onSelect(category.id)}>{selected ? "Выбрано" : "Выбрать"}</ButtonComponent>
      </ButtonsContainer>
    </Container>
  )
})``
