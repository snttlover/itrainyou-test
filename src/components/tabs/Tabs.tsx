import { MediaRange } from "#/lib/responsive/media"
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
  border-radius: 2px 2px 0px 0px;
  padding: 11px 4px;
  flex: 1;
  font-family: Roboto;
  font-weight: 500;
  margin-right: 1px;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #dbdee0;
  color: #5b6670;

  &[data-active="true"] {
    background: #fff;
  }

  &:last-child {
    margin-right: 0;
  }

  ${MediaRange.lessThan("mobile")`
    font-size: 12px;
    line-height: 16px;
    text-align: center;
  `}
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
