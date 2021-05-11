import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

import beforeImg from "../assets/before-after/before.svg"
import afterImg from "../assets/before-after/after.svg"

const Wrapper = styled.section`
  background: #4858cc;

  margin-bottom: 122px;
`

const StyledContainer = styled(Container)`
  padding: 91px 0 106px;
  display: flex;
  color: white;
`

const Card = styled.p`
  padding: 16px;
  width: 348px;
  min-height: 128px;
  background: #ffffff;
  position: relative;
  z-index: 2;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  color: #ffffff;
`

const BeforeSection = styled.div`
  margin-right: 210px;
  position: relative;
`

const BeforeTitle = styled(Title)`
  width: 206px;
  margin-bottom: 24px;
`

const BeforeCard = styled(Card)`
  border-radius: 8px 8px 0px 8px;
  color: #ff6b00;
`

const BeforeImage = styled.img`
  display: block;
  position: absolute;
  bottom: -40px;
  right: -95px;
`

const AfterSection = styled.div`
  position: relative;
`

const AfterTitle = styled(Title)`
  width: 261px;
  margin-bottom: 119px;
`

const AfterCard = styled(Card)`
  border-radius: 8px 0px 8px 8px;
  color: #4858cc;
`

const AfterImage = styled.img`
  display: block;
  position: absolute;
  top: -94px;
  right: -207px;
`

const messages = [
  {
    before: "Мне приходится самому искать клиентов 🤔",
    after: "Клиенты сами находят меня с помощью iTrainYou 🚀",
  },
  {
    before: "На поиск кабинета уходит много времени, а на аренду — дополнительные деньги 🙄",
    after: "Я работаю в удобное мне время из любой точки мира 🌍",
  },
  {
    before: "Мне не с кем посоветоваться или поделиться результатами своей работы 📈",
    after: "На платформе классное комьюнити коучей и мы на связи 📱",
  },
  {
    before: "Иногда я не знаю, как поступить в спорных ситуациях 😬",
    after:
      "Спорные и конфликтные ситуации на платформе решает администратор — беспристрастно и честно для обеих сторон 👍",
  },
  {
    before: "Нужно всегда иметь при себе блокнот/ежедневник, чтобы записывать планы или заметки о сессиях 🗒️",
    after: "Вся информация о моей практике систематизирована и находится в электронном виде на платформе iTrainYou 🖥️",
  },
  {
    before: "Мне нужно дополнительно следить за получением оплаты от клиентов 💰",
    after:
      "Я привязал карту в личном кабинете iTrainYou и больше не переживаю о том, что оплата поступит позже или не поступит вообще 💳",
  },
  {
    before: "Административная работа тоже входит в мои обязанности: я сам напоминаю клиентам о предстоящих сессиях 📨",
    after:
      "Платформа автоматически направляет уведомления об изменениях и предстоящих сессиях и клиенту, и мне. Я ничего не забываю! 👍",
  },
  {
    before:
      "На моем телефоне все приложения — для работы. WhatsApp, Телеграм, Viber — во всех мессенджерах я переписываюсь с клиентами. Так легко запутаться! 🗯️",
    after:
      "А у меня мессенджеры — для личных переписок. Все дела с клиентами я веду во внутренних чатах на платформе iTrainYou 💪",
  },
]

export const BeforeAfter = () => {
  const [i, setI] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (i === messages.length - 1) {
        setI(0)
      } else {
        setI(i + 1)
      }
    }, 3000)

    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <Wrapper>
      <StyledContainer>
        <BeforeSection>
          <BeforeTitle>До ITrainYou</BeforeTitle>
          <BeforeCard>{messages[i].before}</BeforeCard>
          <BeforeImage src={beforeImg} />
        </BeforeSection>
        <AfterSection>
          <AfterTitle>После ITrainYou</AfterTitle>
          <AfterCard>{messages[i].after}</AfterCard>
          <AfterImage src={afterImg} />
        </AfterSection>
      </StyledContainer>
    </Wrapper>
  )
}
