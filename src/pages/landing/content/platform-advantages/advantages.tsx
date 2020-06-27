import * as React from "react"
import image1 from "./images/1.svg"
import image2 from "./images/2.svg"
import image3 from "./images/3.svg"
import image4 from "./images/4.svg"
import styled from "styled-components"
import mobilePinImage from "./images/mobile-advantage-slider-button-active.svg"

const ListItem = styled.div`
  display: block;
  position: relative;
  padding-left: 15px;
  text-align: left !important;
  &:after {
    width: 10px;
    height: 10px;
    content: "";
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    background: url("${mobilePinImage}") no-repeat;
  }
`

export default [
  {
    title: `Удобный поиск`,
    description: () => `Выбирайте коучей по направлению, цене и времени за несколько кликов.`,
    image: image1
  },
  {
    title: `Взаимодействие с коучем`,
    description: () => (
      <div>
        Все, связанное с вашим коучем в одном месте:
        <ListItem>Чат</ListItem>
        <ListItem>Материалы сессии</ListItem>
        <ListItem>Работа с сессиями</ListItem>
      </div>
    ),
    image: image2
  },
  {
    title: `Сессия здесь и сейчас`,
    description: () => `Возможность начать быструю сессию по волнующей проблеме.`,
    image: image3
  },
  {
    title: `Сам вебинар`,
    description: () => `В назначенное время сессии создается комната общения с коучем внутри платформы.`,
    image: image4
  },
  {
    title: `Мобильное приложение`,
    description: () => `Разработали удобный доступ к личный кабинет со смартфона.`,
    image: image4
  }
]
