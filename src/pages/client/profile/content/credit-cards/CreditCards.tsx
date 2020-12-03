import * as React from "react"
import styled from "styled-components"
import { InterestsStats } from "@/pages/client/profile/content/interests/InterestsStats"
import { CreditCardsList } from "./CreditCardsList"
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
    padding-right: 70px;
  `}

  ${MediaRange.lessThan("mobile")`
    padding-right: 0;
    padding-top: 100px;
    margin-top: 16px;
  `}
`

const Cards = styled.div`
  max-width: 650px;
  width: 100%;
  border-radius: 2px;
  background: #fff;
  padding: 24px;
`
type ArrowType = { reverse?: boolean }

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;

  ${MediaRange.lessThan("mobile")`
     padding-top: 30px;
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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ProfileCreditCards = () => {
  const [isShowed, changeisShow] = useState(false)

  const toggleCards = (e: React.SyntheticEvent) => {
    changeisShow(!isShowed)
  }

  return (
    <Container>
      <Cards>
        <TitleContainer>
          <Title>Привязанные карты</Title>
          <Arrow reverse={isShowed} onClick={toggleCards} />
        </TitleContainer>
        {isShowed && (<CreditCardsList />)}
      </Cards>
    </Container>
  )
}