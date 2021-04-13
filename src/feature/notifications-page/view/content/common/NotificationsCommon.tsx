import styled from "styled-components"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"

export const Card = styled.div`
  background: #ffffff;
  border-radius: 2px;
  padding: 14px 16px;
  margin-bottom: 26px;
  ${MediaRange.lessThan("mobile")`
      padding: 16px 12px;
      margin-bottom: 16px;
  `}
`

export const NotificationAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  ${MediaRange.lessThan("mobile")`
      width: 40px;
      height: 40px;
  `}
`

export const Title = styled.div`
  font-family: Roboto;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 13px;
  margin-top: 20px;
  flex: 1;
  ${MediaRange.lessThan("mobile")`
    margin-left: 8px;  
    font-size: 14px;
    line-height: 18px;
    margin-top: 14px;
  `}
`

export const Bold = styled.span`
  color: #424242;
  font-weight: 500;
`

export const SessionTime = styled.span`
  color: ${props => props.theme.colors.primary};
  white-space: nowrap;
`

export const Time = styled.span`
  color: #9aa0a6;
  font-size: 14px;
  line-height: 18px;
  ${MediaRange.lessThan("mobile")`  
    font-size: 12px;
    line-height: 16px;
  `}
`

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`
