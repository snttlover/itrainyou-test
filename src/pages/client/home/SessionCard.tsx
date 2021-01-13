import { Avatar } from "@/components/avatar/Avatar"
import { GrayTooltip } from "@/components/gray-tooltip/GrayTooltip"
import { Icon } from "@/components/icon/Icon"
import { getCategoryColorById } from "@/feature/categories/categories.store"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const SessionCardContainer = styled(Link)`
  width: 100%;
  position: relative;
  background: #fff;

  display: flex;
  justify-content: space-between;

  padding: 12px 12px 12px 16px;
`

const CoachInfoContainer = styled.div`
  display: flex;
  align-items: center;
`
const CoachAvatar = styled(Avatar)<{ isTopCoach?: boolean }>`
  display: flex;
  align-items: center;
  width: 60px;
  height: 60px;

  border: 2px solid ${props => (props.isTopCoach ? "#F6C435" : "#fff")};

  ${MediaRange.greaterThan("mobile")`
    width: 80px;
    height: 80px;
  `}
`

const CoachInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 16px;
  height: 100%;
`

const Name = styled.p`
  margin-top: 12px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
    margin-top: 18px;
  `}
`

const CategoriesContainer = styled.div`
  display: flex;
`

type CategoryIconTypes = { color: string }

const CategoryIcon = styled(Icon).attrs({ name: "tabletka" })<CategoryIconTypes>`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  fill: ${props => props.color};

  ${MediaRange.greaterThan("mobile")`
    width: 24px;
    height: 24px;
  `}
`

const TopCoachIcon = styled(Icon).attrs({ name: "top-coach" })`
  width: 16px;
  height: 16px;
  margin-right: 8px;

  ${MediaRange.greaterThan("mobile")`
    width: 24px;
    height: 24px;
  `}
`

const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  ${MediaRange.lessThan("mobile")`
    position: absolute;
    right: 10px;
    top: 5px;
  `}
`

const SessionTime = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  text-align: right;

  color: #4858cc;

  white-space: nowrap;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

type SessionCardProps = { session: DashboardSession; children?: React.ReactNode; className?: string }

export const SessionCard = ({ session, children, className }: SessionCardProps) => {
  const now = date()
  const startDate = date(session.startDatetime)
  const endDate = date(session.endDatetime)
  const isBetween = now.isBetween(startDate, endDate, "minute")
  const isStartIsNowDay = now.isSame(startDate, "d")

  return (
    <SessionCardContainer to={`/client/sessions/${session.id}`} className={className}>
      <CoachInfoContainer>
        <CoachAvatar src={session.coach.avatar} isTopCoach={session.coach.isTopCoach} />
        <CoachInfo>
          <Name>
            {session.coach.firstName} {session.coach.lastName}
          </Name>
          <CategoriesContainer>
            {session.coach.isTopCoach && (
              <GrayTooltip text='Топ коуч'>
                <TopCoachIcon />
              </GrayTooltip>
            )}
            {session.coach?.categories?.map(category => (
              <GrayTooltip text={category.name} key={category.id}>
                <CategoryIcon color={getCategoryColorById(category.id)} />
              </GrayTooltip>
            ))}
          </CategoriesContainer>
        </CoachInfo>
      </CoachInfoContainer>
      <SessionInfo>
        <SessionTime>
          {date(session.startDatetime).format(isStartIsNowDay ? "Сегодня HH:mm" : "DD MMMM HH:mm")}-
          {date(session.endDatetime).format("HH:mm")}
        </SessionTime>
        {isBetween && children}
      </SessionInfo>
    </SessionCardContainer>
  )
}
