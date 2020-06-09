import { $datetimeLeft } from "@/application/pages/coach-home/coach-home.model"
import { useStore } from "effector-react"
import styled from "styled-components"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 458px;
  margin-top: 114px;
  margin-bottom: 152px;
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 52px;
    margin-bottom: 114px;
  `}
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #424242;
  margin-bottom: 12px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 16px;
  `}
`

const Sections = styled.div`
  display: flex;
  align-items: center;
`

const Section = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  &:last-child {
    margin-right: 0;
  }
  ${MediaRange.lessThan(`mobile`)`
    display: flex;
    flex-direction: column;
    margin-right: 16px;
  `}
`

const Numeric = styled.div`
  font-family: Roboto Slab;
  font-weight: bold;
  font-size: 32px;
  line-height: 26px;
  text-align: center;
  color: #7d36a8;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 24px;
    line-height: 26px;
  `}
`

const SectionDescription = styled.div`
  font-family: Roboto;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 8px;
  ${MediaRange.lessThan(`mobile`)`
    margin-left: 0;
    margin-top: 8px;
    font-size: 14px;
    line-height: 18px;
  `}
`

export const Timer = () => {
  const dateTime = useStore($datetimeLeft)
  return (
    <Container>
      <Title>Осталось</Title>
      <Sections>
        <Section>
          <Numeric>{dateTime.days}</Numeric>
          <SectionDescription>дней</SectionDescription>
        </Section>

        <Section>
          <Numeric>{dateTime.hours}</Numeric>
          <SectionDescription>часов</SectionDescription>
        </Section>

        <Section>
          <Numeric>{dateTime.minutes}</Numeric>
          <SectionDescription>минут</SectionDescription>
        </Section>

        <Section>
          <Numeric>{dateTime.seconds}</Numeric>
          <SectionDescription>секунды</SectionDescription>
        </Section>
      </Sections>
    </Container>
  )
}
