import React from "react"
import styled from "styled-components"
import { Calendar } from "@/components/calendar/Calendar"
import { Button } from "@/components/button/normal/Button"
import { MediaRange } from "@/lib/responsive/media"

const date = new Date()

export const RescheduleSessionDatepicker = () => (
  <Container>
    <Column>
      <StyledCalendar value={date} isBig={true} onChange={() => {}} />
    </Column>
    <Column>
      <SelectSessionContainer>
        <PickedDate>22 апреля</PickedDate>
        <Tags>
          <Tag data-selected={true}>12:00</Tag>
          <Tag data-disabled={true}>12:00</Tag>
          <Tag>12:00</Tag>
        </Tags>
        <SelectedSession>
          <SelectedSessionDate>22.04.19</SelectedSessionDate>
          <SelectedSessionTime>12:00</SelectedSessionTime>
        </SelectedSession>
        <Actions>
          <RescheduleButton>Перенести</RescheduleButton>
        </Actions>
      </SelectSessionContainer>
    </Column>
  </Container>
)

const Container = styled.div`
  display: flex;
  padding: 24px;
  background: #fff;
  margin-top: 4px;
  ${MediaRange.lessThan(`mobile`)`
    flex-direction: column;
    padding: 0 24px;
    padding-top: 10px;
  `}
`

const Column = styled.div`
  width: 50%;
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  border-right: 1px solid #dbdee0;
  &:last-child {
    border-right: none;
  }
  ${MediaRange.lessThan(`mobile`)`
    width: 100%;
    flex-basis: 100%;
    border-right: none;
  `}
`

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 252px;
  ${MediaRange.lessThan(`mobile`)`
    max-width: unset;
  `}
`

const SelectSessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 252px;
  ${MediaRange.lessThan(`mobile`)`
    max-width: unset;
    border-top: 1px solid #dbdee0;
    padding-top: 20px;
    margin-top: 10px;
  `}
`

const PickedDate = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
  padding: 8px 16px;
  margin-bottom: 16px;
  ${MediaRange.lessThan(`mobile`)`
    padding: 8px 0;
  `}
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.div`
  padding: 2px 8px;

  border-radius: 24px;
  margin-bottom: 10px;
  margin-right: 16px;

  font-size: 12px;
  line-height: 16px;

  color: #5b6670;

  &[data-disabled="true"] {
    color: #fff;
    background: #dbdee0;
  }

  &[data-selected="true"] {
    color: #fff;
    background: ${props => props.theme.colors.primary};
  }
`
const SelectedSession = styled.div`
  padding: 8px 16px;
  margin-top: 10px;
  border-top: 1px solid #dbdee0;
  display: flex;

  ${MediaRange.lessThan(`mobile`)`
    border-top: 1px solid #dbdee0;
    margin-top: 20px;
    padding: 8px 0;
    padding-top: 24px;
  `}
`

const SelectedSessionDate = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #5b6670;
  margin-right: 4px;
`

const SelectedSessionTime = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 24px;
  `}
`
const RescheduleButton = styled(Button)`
  width: 140px;
`
