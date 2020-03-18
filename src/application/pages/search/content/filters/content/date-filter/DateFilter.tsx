import * as React from "react"
import styled from "styled-components"
import { RadioGroup, RadioOption } from "@app/components/radio/Radio"
import { useState } from "react"
import { Calendar, CalendarDateType } from "@app/components/calendar/Calendar"
import { useStoreMap } from "effector-react"
import arrowImage from "./images/arrow.svg"
import {
  $searchPageQuery,
  addSearchPageQuery,
  loadCoaches,
  removeSearchPageQuery,
  setSearchPageQuery
} from "@app/pages/search/coaches-search.model"
import * as dayjs from "dayjs"
import { navigate } from "@reach/router"
import { serializeQuery } from "@app/lib/formatting/serialize-query"

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
  color: #424242;
`

const StyledRadioOption = styled(RadioOption)``

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${StyledRadioOption} {
    margin-bottom: 16px;
  }
`

const Arrow = styled.img.attrs({ src: arrowImage })`
  width: 24px;
  height: 24px;
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;
`

export const DateFilter = () => {
  const q = $searchPageQuery.getState()
  const start = q.nearest_session_date__lte ? dayjs(q.nearest_session_date__lte).valueOf() : null
  const end = q.nearest_session_date__gte ? dayjs(q.nearest_session_date__gte).valueOf() : null

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
      return [new Date(dayjs(start).valueOf()), new Date(dayjs(end).valueOf())]
    }
    if (rangeType === `to`) {
      // @ts-ignore
      return new Date(dayjs(end).valueOf())
    }
    // @ts-ignore
    return new Date(dayjs(start).valueOf() || Date.now())
  }

  const [date, changeDate] = useState<CalendarDateType>(getCalendarValue())

  const [calendarVisibility, changeCalendarVisibility] = useState(!!start || !!end)

  const startText = () => {
    if (date && [`from`, `range`].includes(rangeType)) {
      // @ts-ignore
      const currentDate: Date = date.length ? date[0] : date
      return `c ${dayjs(currentDate).format(`DD MMM`)}`
    }
  }
  const endText = () => {
    if (end && [`to`, `range`].includes(rangeType)) {
      // @ts-ignore
      const currentDate: Date = date.length ? date[1] : date
      return `до ${dayjs(currentDate).format(`DD MMM`)}`
    }
  }

  const formatDateToBackend = (date: Date) => dayjs(date).format(`YYYY-MM-DD`)

  const navigateWithDate = (date: CalendarDateType, range?: string | undefined) => {
    range = range || rangeType

    if (range === `range`) {
      changeDate(date)
      return addSearchPageQuery({
        // @ts-ignore
        nearest_session_date__lte: formatDateToBackend(date[0]),
        // @ts-ignore
        nearest_session_date__gte: formatDateToBackend(date[1])
      })
    }

    const query = $searchPageQuery.getState()

    if (range === `to`) {
      delete query.nearest_session_date__gte
      query.nearest_session_date__lte = formatDateToBackend(date as Date)
    }

    if (range === `from`) {
      delete query.nearest_session_date__lte
      query.nearest_session_date__gte = formatDateToBackend(date as Date)
    }

    setSearchPageQuery(query)
    navigate(`/search?${serializeQuery(query)}`)
    loadCoaches(query)
    changeDate(date)
  }

  const toggleCalendarVisibility = () => {
    changeCalendarVisibility(!calendarVisibility)
    if (!calendarVisibility) {
      changeRangeType(`from`)
      navigateWithDate(new Date())
    } else {
      removeSearchPageQuery(["nearest_session_date__gte", "nearest_session_date__lte"])
    }
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
        <Calendar value={date} selectRange={rangeType === `range`} onChange={navigateWithDate} />
      </RadioContainer>
    </>
  )

  return (
    <Container>
      <Header>
        Даты
        <Arrow onClick={toggleCalendarVisibility} />
      </Header>
      {calendarVisibility && calendar()}
    </Container>
  )
}
