import { routeNames } from "#/pages/route-names"
import * as React from "react"
import { NavLink } from "react-router-dom"
import styled, { css } from "styled-components"

const TabsContainer = styled.div`
  display: flex;
`
const Tab = styled(NavLink)`
  position: relative;
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;

  &:not(:first-child) {
    margin-left: 24px;
  }

  &.active {
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 2px;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`
export const ProfileTabs = () => (
  <TabsContainer>
    <Tab exact to={routeNames.coachProfile()}>
      Профиль
    </Tab>
    <Tab exact to={routeNames.coachSessionsHistory()}>
      История сессий
    </Tab>
  </TabsContainer>
)
