import { Avatar } from "@/application/components/avatar/Avatar"
import { GrayTooltip } from "@/application/components/gray-tooltip/GrayTooltip"
import { Icon } from "@/application/components/icon/Icon"
import { getCategoryColorById } from "@/application/feature/categories/categories.store"
import { ClientSession } from "@/application/lib/api/client-session"
import { date } from "@/application/lib/helpers/date"
import { MediaRange } from "@/application/lib/responsive/media"
import React from "react"
import styled from "styled-components"

const SessionCardContainer = styled.div`
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

  border: 2px solid ${props => (props.isTopCoach ? `#F6C435` : `#fff`)};

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
  `}
`

const CategoriesContainer = styled.div`
  display: flex;
`

type CategoryIconTypes = { color: string }

const CategoryIcon = styled(Icon).attrs({ name: `tabletka` })<CategoryIconTypes>`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  fill: ${props => props.color};

  ${MediaRange.greaterThan("mobile")`
    width: 24px;
    height: 24px;
  `}
`

const TopCoachIcon = styled(Icon).attrs({ name: `top-coach` })`
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

type SessionCardProps = { session: ClientSession; children?: React.ReactNode; className?: string }

export const SessionCard = ({ session, children, className }: SessionCardProps) => {
  const now = date()
  const startDate = date(session.startDatetime)
  const endDate = date(session.endDatetime)
  const isBetween = now.isBetween(startDate, endDate, "minute")

  return (
    <SessionCardContainer className={className}>
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
          {date(session.startDatetime).format("HH:mm")}-{date(session.endDatetime).format("HH:mm")}
        </SessionTime>
        {isBetween && children}
      </SessionInfo>
    </SessionCardContainer>
  )
}
