import * as React from "react"
import styled from "styled-components"
import { createContext } from "react"
import borderImage from "./images/border-image.svg"
import radioBoxActive from "./images/active.svg"

const TabContext = createContext<any>({})

type TabValueType = string | number | null

type TabsTypes = {
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
    onChange: props.onChange
  }

  return (
    <TabContext.Provider value={context}>
      <StyledTabs>
        {props.children}
      </StyledTabs>
    </TabContext.Provider>
  )
}

type StyledTabPropsTypes = {
  active: boolean
}

const StyledTab = styled.div<StyledTabPropsTypes>`
  background: ${({active}) => active ? `#fff` : `#DBDEE0`};
  border-radius: 2px 2px 0px 0px;
  padding: 11px 30px;
  flex: 1;
  margin-right: 1px;
  font-size: 16px;
  line-height: 22px;
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
        active={Tabs.value === props.value}
        onClick={() => Tabs.onChange(props.value)}
      >
        {props.children}
      </StyledTab>
    )}
  </TabContext.Consumer>
)
