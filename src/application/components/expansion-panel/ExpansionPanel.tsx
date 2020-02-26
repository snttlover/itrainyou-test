import * as React from "react"
import {useState} from "react"
import styled, {css} from "styled-components"
import arrowImage from './arrow.svg'

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #544274;
  position: relative;
  display: flex;
  justify-content: space-between;
`

const Arrow = styled.img.attrs({src: arrowImage})`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #544274;
`

const Container = styled.div`
  margin-top: 13px;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  display: none;
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
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  padding: 13px 20px;
  width: 100%;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  ${props => props.expanded && expandedStyles}
`

type ExpansionPanelProps = {
  title: string,
  children: React.ReactNode,
  className?: string
}

export const ExpansionPanel = (props: ExpansionPanelProps) => {
  const [expanded, changeExpand] = useState(false);

  return (
    <Panel className={props.className} expanded={expanded} onClick={() => changeExpand(!expanded)}>
      <Title>
        {props.title}
        <Arrow />
      </Title>
      <Container>{props.children}</Container>
    </Panel>
  )
}
