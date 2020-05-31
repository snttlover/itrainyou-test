import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`

const Counter = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  color: #FFFFFF;
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
