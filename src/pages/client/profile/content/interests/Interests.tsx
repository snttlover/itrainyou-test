import * as React from "react"
import styled from "styled-components"
import { SessionStats } from "@/pages/client/profile/content/interests/SessionStats"
import { InterestsCategories } from "@/pages/client/profile/content/interests/InterestsCategories"
import { MediaRange } from "@/lib/responsive/media"
import arrowIcon from "@/components/coach-card/images/arrow.svg"
import { useState } from "react"
import { getCategoryColorById } from "@/feature/categories/categories.store"
import { Icon } from "@/components/icon/Icon"
import { useList } from "effector-react"
import { $profileCategories } from "@/pages/client/profile/profile-page.model"

const Container = styled.div`
  padding-right: 140px;
  width: 100%;
  margin-top: 32px;
  position: relative;
  max-width: 790px;
  ${MediaRange.lessThan("tablet")`
    padding-right: unset;
  `}

  ${MediaRange.lessThan("mobile")`
    padding-right: 0;
    margin-top: 0;
  `}
`

const Interests = styled.div`
  max-width: 650px;
  width: 100%;
  border-radius: 2px;
  background: #fff;
  padding: 24px;
    ${MediaRange.lessThan("mobile")`
    padding: 12px;
  `}
`
type ArrowType = { reverse?: boolean }

type CategoryIconTypes = {
  color: string
  selected: boolean
}

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;

  ${MediaRange.lessThan("mobile")`
     font-size: 16px;
     line-height: 26px;
  `}
`

const Arrow = styled.img.attrs<ArrowType>({ src: arrowIcon })`
  margin-left: 13px;
  width: 14px;
  height: 14px;
  cursor: pointer;
  ${({ reverse }: ArrowType) => reverse && "transform: rotate(180deg)"}
`

const CategoryIcon = styled(Icon).attrs({ name: "tabletka" })<CategoryIconTypes>`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  fill: ${props => props.color};
  display: ${props => props.selected ? "" : "none"};
  
  @media screen and (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`

const CategoriesIcons = styled.div`
  display: flex;
  @media screen and (max-width: 480px) {
    order: 0;
  }
`
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ProfileInterests = () => {
  const [isShowed, changeisShow] = useState(false)

  const toggleInterests = (e: React.SyntheticEvent) => {
    changeisShow(!isShowed)
  }

  return (
    <Container>
      <SessionStats />
      <Interests>
        <TitleContainer>
          <Title>Интересы</Title>
          <CategoriesIcons>
            {useList($profileCategories, category => (
              <CategoryIcon color={getCategoryColorById(category.id)} selected={category.selected} />
            ))}
          </CategoriesIcons>
          <Arrow reverse={isShowed} onClick={toggleInterests} />
        </TitleContainer>
        {isShowed && (<InterestsCategories />)}
      </Interests>
    </Container>
  )
}
