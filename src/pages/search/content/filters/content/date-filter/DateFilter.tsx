import { date as formatedDate } from "#/lib/formatting/date"
import * as React from "react"
import styled from "styled-components"
import { RadioGroup, RadioOption } from "#/components/radio/Radio"
import { useEffect, useState } from "react"
import { Calendar, CalendarDateType } from "#/components/calendar/Calendar"
import { useEvent, useStore } from "effector-react/ssr"
import arrowImage from "./images/arrow.svg"
import { $searchPageQuery, addSearchPageQuery, removeSearchPageQuery } from "#/pages/search/coaches-search.model"
import {
  $calendarVisibility,
  changeVisibility,
} from "#/pages/search/content/filters/content/date-filter/calendar.model"

const Container = styled.div`
  padding-top: 16px;
`

const Header = styled.div`
  font-size: 16px;
  line-height: 22px;
  position: relative;
`

const Text = styled.div`
  margin-top: 8px;
  margin-bottom: 18px;
  font-size: 12px;
  line-height: 16px;
`

const StyledRadioOption = styled(RadioOption)``

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${StyledRadioOption} {
    margin-bottom: 16px;
  }
`

type ArrowTypes = {
  opened: boolean
}

const Arrow = styled.img.attrs({ src: arrowImage })<ArrowTypes>`
  transition: all 300ms;
  width: 24px;
  height: 24px;
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;
  transform: rotate(${props => (props.opened ? `180deg` : `0`)});
`

export const DateFilter = () => {
  const q = useStore($searchPageQuery)

  let start = q.nearest_session_date__gte ? formatedDate(q.nearest_session_date__lte).valueOf() : null
  let end = q.nearest_session_date__lte ? formatedDate(q.nearest_session_date__gte).valueOf() : null

  const getRangeType = () => {
    if (!!start && !!end) {
      return `range`
    }
    if (!!end) {
      return `to`
    }
    return `from`
  }

  const [rangeType, changeRangeType] = useState(getRangeType())

  const updateRangeType = (newType: string) => {
    const currentRangeType = rangeType
    changeRangeType(newType)

    if (newType === `range`) {
      return navigateWithDate([date as Date, date as Date], newType)
    }

    if ([`to`, `from`].includes(newType)) {
      if (currentRangeType === `range`) {
        // @ts-ignore
        return navigateWithDate(date[0], newType)
      }
      navigateWithDate(date, newType)
    }
  }

  const getCalendarValue = (): CalendarDateType => {
    if (rangeType === `range`) {
      // @ts-ignore
      return [new Date(formatedDate(start).valueOf()), new Date(formatedDate(end).valueOf())]
    }
    if (rangeType === `to`) {
      // @ts-ignore
      return new Date(formatedDate(end).valueOf())
    }
    // @ts-ignore
    return new Date(formatedDate(start).valueOf() || Date.now())
  }

  const [date, changeDate] = useState<CalendarDateType>(getCalendarValue())

  const calendarVisibility = useStore($calendarVisibility)
  const changeCalendarVisibility = useEvent(changeVisibility)
  const addQuery = useEvent(addSearchPageQuery)
  const removeQuery = useEvent(removeSearchPageQuery)

  const startText = () => {
    if (date && [`from`, `range`].includes(rangeType)) {
      // @ts-ignore
      const currentDate: Date = date.length ? date[0] : date
      return `c ${formatedDate(currentDate).format(`D MMM`)}`
    }
    return ``
  }
  const endText = () => {
    if (date && [`to`, `range`].includes(rangeType)) {
      // @ts-ignore
      const currentDate: Date = date.length ? date[1] : date
      return `до ${formatedDate(currentDate).format(`D MMM`)}`
    }
    return ``
  }

  const formatDateToBackend = (date: Date) => formatedDate(date).format(`YYYY-MM-DD`)

  const navigateWithDate = (date: CalendarDateType, range?: string | undefined) => {
    range = range || rangeType

    if (range === `range`) {
      changeDate(date)
      addQuery({
        // @ts-ignore
        nearest_session_date__lte: formatDateToBackend(date[1]),
        // @ts-ignore
        nearest_session_date__gte: formatDateToBackend(date[0]),
      })
      return
    }

    if (range === `to`) {
      removeQuery(["nearest_session_date__gte"])
      addQuery({
        nearest_session_date__lte: formatDateToBackend(date as Date),
      })
    }

    if (range === `from`) {
      removeQuery(["nearest_session_date__lte"])
      addQuery({
        nearest_session_date__gte: formatDateToBackend(date as Date),
      })
    }

    changeDate(date)
  }

  const toggleCalendarVisibility = () => {
    changeCalendarVisibility(!calendarVisibility)
    if (!calendarVisibility) {
      changeRangeType(`from`)
      changeDate(new Date())
    } else {
      removeQuery(["nearest_session_date__gte", "nearest_session_date__lte"])
    }
  }

  const selectDateText = () => {
    if (!calendarVisibility) {
      return `Выбрать промежуток`
    }
    return ``
  }

  let pinTo: null | Date = null
  if (rangeType === `to`) {
    pinTo = formatedDate(formatedDate().format(`YYYY-MM-DD`)).toDate()
  }
  if (rangeType === `from`) {
    pinTo = formatedDate(date as Date)
      .add(10, `year`)
      .toDate()
  }

  const calendar = () => (
    <>
      <Text>
        {startText()} {endText()}
      </Text>
      <RadioContainer>
        <RadioGroup value={rangeType} onChange={updateRangeType} name='date-range-type'>
          <StyledRadioOption value='from'>От</StyledRadioOption>
          <StyledRadioOption value='to'>До</StyledRadioOption>
          <StyledRadioOption value='range'>Промежуток</StyledRadioOption>
        </RadioGroup>
        <Calendar value={date} selectRange={rangeType === `range`} pinTo={pinTo} onChange={navigateWithDate} />
      </RadioContainer>
    </>
  )

  return (
    <Container>
      <Header>
        Даты
        <Arrow opened={calendarVisibility} onClick={toggleCalendarVisibility} />
      </Header>
      {calendarVisibility ? calendar() : <Text>{selectDateText()}</Text>}
    </Container>
  )
}
