import styled from "styled-components"
import { Button } from "@/application/components/button/normal/Button"
import { Avatar } from "@/application/components/avatar/Avatar"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  margin-bottom: 24px;
  padding: 12px 16px;
  background: #fff;
  border-radius: 2px;
  display: flex;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
  ${MediaRange.lessThan(`mobile`)`
    margin-bottom: 12px;
  `}
`

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin-right: 16px;
  ${MediaRange.lessThan(`mobile`)`
    width: 60px;
    height: 60px;
    margin-right: 8px;
  `}
`

const NameContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Name = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-top: 5px;
  margin-bottom: 20px;

  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 22px;
    margin-top: 15px;
    margin-bottom: 12px;
  `}
`

const Duration = styled.div`
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  padding: 4px 8px;
  background: #9aa0a6;
  border-radius: 12px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 8px;
    line-height: 10px;
    padding: 3px 8px;
  `}
`

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`

const Time = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  text-align: right;
  color: #7d36a8;
  margin-bottom: 23px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 22px;
    margin-top: 0;
    position: absolute;
    z-index: 1;
    right: 8px;
    top: 8px;
  `}
`

const StyledButton = styled(Button)`
  width: 151px;
  font-weight: normal;
  ${MediaRange.lessThan(`mobile`)`
    display: none;
  `}
`

type CoachSessionCardTypes = {
  avatar: null | string,
  name: string
  duration: string
  time: string
  isActive?: boolean
}

export const CoachSessionCard = (props: CoachSessionCardTypes) => (
  <Container>
    <StyledAvatar src={props.avatar} />
    <NameContainer>
      <Name>{props.name}</Name>
      <Duration>{props.duration}</Duration>
    </NameContainer>
    <ActionsContainer>
      <Time>{props.time}</Time>
      {props.isActive && <StyledButton data-slim>Зайти в сессию</StyledButton>}
    </ActionsContainer>
  </Container>
)
