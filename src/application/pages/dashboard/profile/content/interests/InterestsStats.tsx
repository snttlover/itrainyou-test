import styled from "styled-components"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${MediaRange.lessThan(`mobile`)`
    right: unset;
    top: 30px;
    left: 0;
    flex-direction: row;
    height: auto;
    width: 100%;
  `}
`

const Tab = styled.div`
  width: 140px;
  height: 140px;
  align-items: center;
  justify-content: center;
  background: #4858CC;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
  
  ${MediaRange.lessThan(`mobile`)`
    margin-bottom: unset;
    margin-right: 16px;
    width: 100px;
    height: 100px;
    
    &:last-child {
      margin-right: 0;
    }
  `}  
`

const Title = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 16px;
  color: #FFFFFF;
  width: 91px;
  
  ${MediaRange.lessThan(`mobile`)`
    width: 74px;
    margin-bottom: 10px;
  `}
`

const Counter = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  color: #FFFFFF;
  ${MediaRange.lessThan(`mobile`)`
     font-size: 28px;
     line-height: 26px;
  `}
`

export const InterestsStats = () => (
  <Container>
    <Tab>
      <Title>Сессий пройдено</Title>
      <Counter>56</Counter>
    </Tab>
    <Tab>
      <Title>Всего часов</Title>
      <Counter>24</Counter>
    </Tab>
  </Container>
)
