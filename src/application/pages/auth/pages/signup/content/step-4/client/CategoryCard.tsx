import { DashedButton } from "@app/components/button/dashed/DashedButton"
import { Button } from "@app/components/button/normal/Button"
import { Category } from "@app/lib/api/categories"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 36px;
`

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #424242;
  display: flex;
  align-items: center;
`

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`

const Description = styled.p`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
`
const ButtonsContainer = styled.div`
  margin-top: 8px;
  width: 160px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
`


type CategoryCardProps = {
  category: Category
  className?: string
  selected?: boolean
  onSelect: (id: number) => void
}

export const CategoryCard = ({ category, className, onSelect, selected }: CategoryCardProps) => {
  const ButtonComponent = selected ? Button : DashedButton
  return (
    <Container className={className}>
      <Title>
        <Icon src={category.icon} /> {category.name}
      </Title>
      <Description>{category.description}</Description>
      <ButtonsContainer>
        <ButtonComponent as={Button} onClick={() => onSelect(category.id)}>{selected ? 'Выбрано' : 'Выбрать'}</ButtonComponent>
      </ButtonsContainer>
    </Container>
  )
}
