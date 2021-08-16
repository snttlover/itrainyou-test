import React from "react"
import styled from "styled-components"

import { content } from "./content"

import { Container } from "../../../common/Container"

const StyledContainer = styled(Container)`
  padding: 24px 0;
  color: white;

  @media (min-width: 768px) {
    padding: 40px 0 140px;
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

  span {
    display: block;
    font-family: Roboto Slab;
    font-style: normal;
    font-weight: bold;
  }

  @media (min-width: 768px) {
    margin: 0;
    font-size: 32px;
    line-height: 44px;
    text-align: left;
    margin-bottom: 32px;
    max-width: 445px;

    span {
      display: inline;
    }
  }
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`

const Image = styled.img`
  display: block;
`

const ListItem = styled.li`
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;

  & p {
    position: relative;
    z-index: 2;
  }

  &:nth-child(1) {
    img {
      width: 338px;
    }
  }

  &:nth-child(2) {
    img {
      width: 323px;
    }
  }

  &:nth-child(3) {
    img {
      width: 367px;
    }
  }

  &:nth-child(4) {
    img {
      width: 380px;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;

    &:nth-child(1) {
      margin-bottom: 367px;

      img {
        top: -10px;
        right: -10px;
        width: 436px;
      }
    }

    &:nth-child(2) {
      margin-bottom: 297px;

      h3,
      p {
        margin-left: auto;
      }

      img {
        top: -5px;
        left: -8px;
        width: 360px;
      }
    }

    &:nth-child(3) {
      margin-bottom: 188px;

      img {
        top: -187px;
        right: -10px;
        width: 436px;
      }
    }

    &:nth-child(4) {
      h3,
      p {
        margin-left: auto;
      }

      img {
        top: -30px;
        left: -8px;
        width: 367px;
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

    @media (min-width: 558px) {
      width: 288px;
      margin: 0 auto;
      margin-bottom: 16px;
    }

    @media (min-width: 768px) {
      margin: 0;
      margin-bottom: 16px;
      font-size: 24px;
      line-height: 32px;
      width: 328px;
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

    @media (min-width: 558px) {
      width: 288px;
      margin: 0 auto;
      margin-bottom: 16px;
    }

    @media (min-width: 768px) {
      margin: 0;
      margin-bottom: 0;
      width: 328px;
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
    <Title>
      <span>Используйте</span> <span>все функции личного</span> кабинета
    </Title>
    <List>
      {content.map(item => (
        <ListItem key={item.id}>
          <h3>
            {item.id}. {item.title}
          </h3>
          <p>{item.descr}</p>
          <Image src={item.image} alt={item.title} title={item.title} />
        </ListItem>
      ))}
    </List>
  </StyledContainer>
)
