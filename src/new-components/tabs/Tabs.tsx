import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"
import { createContext } from "react"
import borderImage from "./images/border-image.svg"
import radioBoxActive from "./images/active.svg"

const TabContext = createContext<any>({})

type TabValueType = string | number | null

type TabsTypes = {
  className?: string
  value: TabValueType
  onChange: (value: any) => void
  children: React.ReactNode | React.ReactNode[]
}

const StyledTabs = styled.div`
  display: flex;
`

export const Tabs = (props: TabsTypes) => {
  const context = {
    value: props.value,
    onChange: props.onChange,
  }

  return (
    <TabContext.Provider value={context}>
      <StyledTabs className={props.className}>{props.children}</StyledTabs>
    </TabContext.Provider>
  )
}

type StyledTabPropsTypes = {
  "data-active": boolean
}

const StyledTab = styled.div<StyledTabPropsTypes>`
  margin-right: 24px;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  color: #5b6670;
  cursor: pointer;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;

  &[data-active="true"] {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    color: #424242;
  }

  &:last-child {
    margin-right: 0;
  }
`

type TabTypes = {
  value: TabValueType
  children: React.ReactNode
  className?: string
}

export const Tab = (props: TabTypes) => (
  <TabContext.Consumer>
    {(Tabs: any) => (
      <StyledTab
        className={props.className}
        data-active={Tabs.value === props.value}
        onClick={() => Tabs.onChange(props.value)}
      >
        {props.children}
      </StyledTab>
    )}
  </TabContext.Consumer>
)
