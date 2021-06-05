import React from "react"
import styled from "styled-components"

import { MobileSlider } from "./who-is/MobileSlider"

const Wrapper = styled.section`
  background: #4858cc;
  padding: 24px 0 63px;
`

const items = [
  `Я работаю с вами в <strong>настоящем</strong> моменте, смотря <strong>в будущее</strong>`,
  `Совместно с вами <strong>конкретизирую</strong> шаги для <strong>достижения результата</strong>`,
  `Приумножаю энергию для <strong>реализации цели</strong>`,
  `Помогаю построить картину <strong>конечного результата</strong>`,
  `Открываю ваши <strong>возможности и ресурсы</strong>`,
]

export const WhoIs = () => {
  return (
    <Wrapper>
      <MobileSlider items={items} />
    </Wrapper>
  )
}
