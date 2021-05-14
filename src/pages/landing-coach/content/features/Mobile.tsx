import React from "react"
import styled from "styled-components"

import { content } from "./content"

import { Container } from "../../common/Container"

const StyledContainer = styled(Container)`
  padding: 24px 0;
  color: white;

  @media (min-width: 768px) {
    padding: 40px 0 104px;
  }
`

const Title = styled.h2`
  margin: 0 auto;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin: 0;
    font-size: 32px;
    line-height: 44px;
    text-align: left;
    margin-bottom: 32px;
  }
`
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`

const MobileImage = styled.img`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`
const TabletImage = styled.img`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

const ListItem = styled.li`
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;

    &:nth-child(1) {
      margin-bottom: 308px;

      img {
        top: 0;
        right: -30px;
        width: 416px;
      }
    }

    &:nth-child(2) {
      margin-bottom: 47px;
      h3,
      p {
        margin-left: auto;
      }

      img {
        top: -130px;
        left: 0;
        width: 369px;
      }
    }

    &:nth-child(3) {
      img {
        top: 0;
        right: 0;
        width: 404px;
      }
    }
  }

  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
    color: #ffffff;
    max-width: 328px;
    margin-bottom: 16px;

    @media (min-width: 768px) {
      font-size: 24px;
      line-height: 32px;
      max-width: 328px;
    }
  }

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #ffffff;
    margin-bottom: 16px;

    @media (min-width: 768px) {
      margin-bottom: 0;
      max-width: 328px;
    }
  }

  img {
    position: relative;

    @media (max-width: 767px) {
      margin-bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
    }

    @media (min-width: 768px) {
      margin-bottom: 0;
      position: absolute;
    }
  }
`

export const Mobile = ({ className }: any) => (
  <StyledContainer className={className}>
    <Title>Используйте все функции личного кабинета</Title>
    <List>
      {content.map(item => (
        <ListItem key={item.id}>
          <h3>
            {item.id}. {item.title}
          </h3>
          <p>{item.descr}</p>
          <MobileImage src={item.imageMobile} alt={item.title} title={item.title} />
          <TabletImage src={item.imageTablet} alt={item.title} title={item.title} />
        </ListItem>
      ))}
    </List>
  </StyledContainer>
)
