import React from "react"
import styled from "styled-components"
import { Calendar } from "#/components/calendar/Calendar"
import { Button } from "#/components/button/normal/Button"
import { MediaRange } from "#/lib/responsive/media"
import { useEvent, useList, useStore, useStoreMap } from "effector-react/ssr"
import {
  $formattedPickedRescheduleSession,
  $rescheduleDate,
  $rescheduleSelectedSessions,
  $rescheduleSessionsDates,
  changePickedRescheduleSession,
  changeRescheduleDate,
  rescheduleSession,
} from "#/pages/client/session/content/session-page-content/reschedule-session/reschedule-session"
import dayjs from "dayjs"

export const RescheduleSessionDatepicker = () => {
  const date = useStore($rescheduleDate)
  const changeDate = useEvent(changeRescheduleDate)
  const enabledDates = useStore($rescheduleSessionsDates)
  const pickSession = useEvent(changePickedRescheduleSession)
  const session = useStore($formattedPickedRescheduleSession)
  const submit = useEvent(rescheduleSession)
  const tags = useStore($rescheduleSelectedSessions)

  return (
    <Container>
      <Column>
        <StyledCalendar
          enabledDates={enabledDates}
          value={date ? new Date(date) : null}
          isBig={true}
          onChange={date => {
            changeDate(date as Date)
          }}
        />
      </Column>
      <Column>
        <SelectSessionContainer>
          <PickedDate>{date ? dayjs(date).format(`DD MMMM`) : `Выберите дату`}</PickedDate>
          {!!date && (
            <Tags>
              {tags.map(session => (
                <Tag key={session.id} data-selected={session.active} onClick={() => pickSession(session.id)}>
                  {session.time}
                </Tag>
              ))}
            </Tags>
          )}
          {!!session && (
            <>
              <SelectedSession>
                <SelectedSessionDate>{session.date}</SelectedSessionDate>
                <SelectedSessionTime>{session.time}</SelectedSessionTime>
              </SelectedSession>
            </>
          )}
          <Actions>
            <RescheduleButton disabled={!session} onClick={() => submit()}>Перенести</RescheduleButton>
          </Actions>
        </SelectSessionContainer>
      </Column>
    </Container>
  )
}

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
  cursor: pointer;
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
