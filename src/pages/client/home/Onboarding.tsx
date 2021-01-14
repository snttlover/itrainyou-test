import * as React from "react"
import styled from "styled-components"
import difImg from "./Group.svg"
import topImg from "./goToTopImg.svg"

export function Onboarding (){
  return (
    <Container>
      <RowContainer>
        <Container>
          <TextTitle>Начните менить свою жизнь!</TextTitle>
          <TextSubtitle>Найдите себе коуча, который поможет вам справиться с трудностями</TextSubtitle>
        </Container>
        <DifficultiesImg src={difImg}/>
      </RowContainer>
      <ToTopImg src={topImg}/>
    </Container>
  )
}

const DifficultiesImg = styled.img`
  width: 289px;
`
const ToTopImg = styled.img`
  width: 327px;
`

const TextTitle = styled.div`
  font-family: "Roboto Slab";
  font-size: 24px;
`

const TextSubtitle = styled.div`
  font-family: "Roboto";
  font-size: 16px;
  width: 363px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const RowContainer = styled.div`
  display: flex;

`