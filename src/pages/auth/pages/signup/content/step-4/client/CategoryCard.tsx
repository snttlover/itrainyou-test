import { DashedButton } from "@/old-components/button/dashed/DashedButton"
import { Button } from "@/old-components/button/normal/Button"
import { Icon } from "@/old-components/icon/Icon"
import { Category } from "@/feature/categories/categories.store"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"
import { useState } from "react"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 0;
  background: #ffffff;
  padding: 16px;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  ${MediaRange.greaterThan("mobile")`
    padding: 24px;
    margin: 24px auto 0;
    width: 100%;
  `}
`

const Title = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  color: #424242;
  display: flex;
  align-items: center;
  justify-content: center;
  
  
  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 24px;
    justify-content: space-between;
    width: 100%;
    align-self: flex-start;
  `}
`

const TabletkaIcon = styled(Icon).attrs({ name: "tabletka" })<{ color: string }>`
  width: 16px;
  height: 16px;
  margin-left: auto;
  margin-right: 14px;
  fill: ${({ color }) => color};
  ${MediaRange.greaterThan("mobile")`
    margin-left: 12px;
    margin-right: 30px;        
  `}
`

const Description = styled.p`
  margin-top: 16px;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

const ButtonsDesktop = styled.div`
  width: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;

  ${MediaRange.lessThan("mobile")`
    width: 116px;
    display: none;
  `}
`

const ButtonsMobile = styled.div`
  width: auto;
  margin-left: auto;
  display: none;
  flex-direction: column;

  ${MediaRange.lessThan("mobile")`
    width: 116px;
    display: flex;
    margin-top: 16px;
  `}
`

const DefaultButton = styled(Button)<{ color: string }>`
  padding: 12px 24px;
  display: block;
  background: ${({ color, theme }) => theme.colors.primary};
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`

const StyledDashedButton = styled(DashedButton)<{ color: string }>`
  padding: 11.5px 24px 12.5px 24px;
  display: block;
  color: ${({ color, theme }) => theme.colors.primary};
  background: #F8F8FD;
  border: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

`

type ArrowType = { reverse?: boolean }

const Arrow = styled(Icon).attrs({ name: "arrow" })`
  width: 20px;
  height: 20px;
  cursor: pointer;
  fill: #424242;
  transition: transform 200ms ease;
  ${({ reverse }: ArrowType) => reverse && "transform: rotate(180deg)"}
`

type CategoryCardProps = {
  category: Category
  className?: string
  selected?: boolean
  onSelect: (id: number) => void
}

export const CategoryCard = styled(({ category, className, onSelect, selected }: CategoryCardProps) => {

  const [isShowed, changeisShow] = useState(false)

  const _toggle = (e: React.SyntheticEvent) => {
    changeisShow(!isShowed)
    e.stopPropagation()
  }

  const handleOnButtonClick = (e: React.SyntheticEvent) => {
    changeisShow(true)
    onSelect(category.id)
    e.stopPropagation()
  }

  const ButtonComponent = selected ? DefaultButton : StyledDashedButton
  return (
    <Container className={className} onClick={_toggle}>
      <Title>
        {category.name} <TabletkaIcon color={category.color} />
        <Arrow reverse={isShowed} onClick={_toggle} />
        <ButtonsDesktop>
          <ButtonComponent color={category.color} onClick={handleOnButtonClick}>
            {selected ? "Выбрано" : "Выбрать"}
          </ButtonComponent>
        </ButtonsDesktop>
      </Title>
      {isShowed && <Description>{category.description}</Description>}
      <ButtonsMobile>
        <ButtonComponent color={category.color} onClick={handleOnButtonClick}>
          {selected ? "Выбрано" : "Выбрать"}
        </ButtonComponent>
      </ButtonsMobile>
    </Container>
  )
})``
