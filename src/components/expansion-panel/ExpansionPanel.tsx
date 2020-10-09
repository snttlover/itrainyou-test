import { Icon } from "@/components/icon/Icon"
import * as React from "react"
import { useState } from "react"
import styled, { css } from "styled-components"

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #424242;

  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 18px;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const Arrow = styled(Icon).attrs({ name: "arrow" })`
  fill: #4858cc;
`

const Container = styled.div`
  margin-top: 13px;
  font-size: 16px;
  line-height: 22px;
  display: none;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 18px;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
    margin-top: 8px;
  }
`

interface PanelTypes {
  readonly expanded: boolean
}

const expandedStyles = css`
  ${Container} {
    display: block;
  }
  ${Arrow} {
    transform: rotate(-180deg);
  }
`

const Panel = styled.div<PanelTypes>`
  padding: 13px 20px;
  width: 100%;
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  ${props => props.expanded && expandedStyles}
  @media screen and (max-width: 480px) {
    padding: 8px 24px 8px 8px;
  }
`

type ExpansionPanelProps = {
  title: string
  children: React.ReactNode
  className?: string
}

export const ExpansionPanel = (props: ExpansionPanelProps) => {
  const [expanded, changeExpand] = useState(false)

  return (
    <Panel className={props.className} expanded={expanded}>
      <Title onClick={() => changeExpand(!expanded)}>
        {props.title}
        <Arrow />
      </Title>
      <Container>{props.children}</Container>
    </Panel>
  )
}
