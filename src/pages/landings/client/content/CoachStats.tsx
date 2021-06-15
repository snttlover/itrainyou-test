import React from "react"
import styled from "styled-components"

import { Container } from "../../common/Container"

import mainImage from "../assets/coach-stats/rocketman.svg"
import qualityImage from "../assets/coach-stats/quality.svg"
import medalIcon from "../assets/coach-stats/medal.svg"

const Wrapper = styled.section`
  background: #f4f5f7;
`

const StyledContainer = styled(Container)`
  position: relative;
  padding: 24px 0 123px;

  @media (min-width: 768px) {
    padding: 40px 0;
  }

  @media (min-width: 1140px) {
    padding: 40px 0 128px;
  }
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #424242;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`

const MainImage = styled.img`
  width: 252px;
  display: block;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 282px;
    position: absolute;
    bottom: -20px;
    right: 30px;
  }

  @media (min-width: 1140px) {
    width: 432px;
    bottom: -42px;
    right: 30px;
  }
`

const QualityImage = styled.img`
  position: absolute;
  bottom: 20px;
  right: 0;
  width: 110px;

  @media (min-width: 768px) {
    width: 94px;
    bottom: 200px;
    right: 30px;
  }

  @media (min-width: 1140px) {
    width: 120px;
    bottom: 270px;
    right: 30px;
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const ListItem = styled.li`
  margin: 0;
  padding: 0;
  padding-left: 48px;
  position: relative;

  width: 288px;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #424242;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    width: 382px;

    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }

  &::before {
    position: absolute;
    content: "";
    width: 32px;
    height: 32px;
    top: 0;
    left: 0;
    background-image: url('${medalIcon}');
    background-size: 32px 32px;
  }
`

export const CoachStats = () => (
  <Wrapper>
    <StyledContainer>
      <Title>Коучи iTrainYou —</Title>
      <MainImage src={mainImage} />
      <QualityImage src={qualityImage} />
      <List>
        <ListItem>Выпускники ведущих школ коучинга России и СНГ</ListItem>
        <ListItem>Проверены командой ITY и имеют подтверждение сертификации</ListItem>
        <ListItem>Оцениваются клиентами с помощью рейтинговой системы и отзывов</ListItem>
      </List>
    </StyledContainer>
  </Wrapper>
)
