import { MediaRange } from "@/application/lib/responsive/media"
import { Step, StepId, StepProps } from "@/application/pages/auth/pages/signup/components/Step"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 26px 16px 0;
  
  ${MediaRange.greaterThan("mobile")`
    justify-content: center; 
  `}
  
  ${MediaRange.greaterThan("tablet")`  
    padding: 36px;
  `}
`


type StepsContainerProps = {
  activeId: StepId
  children: React.ReactNode
  className?: string
}

const isChildrenStep = (child: React.ReactNode): child is React.ReactElement<StepProps> => {
  if (!React.isValidElement(child)) return false
  if (child.type !== StepsLayout.Step) {
    throw new Error("Steps must be contain only Step components")
  }
  return true
}

const StepsLayout = ({ activeId, children, className }: StepsContainerProps) => {
  let isActiveIndex = -1
  React.Children.forEach(children, (child, index) => {
    if (!isChildrenStep(child)) return
    const { id } = child.props

    if (activeId === id) {
      isActiveIndex = index
    }
  })

  const childCount = React.Children.count(children)

  return (
    <Container className={className}>
      {React.Children.map(children, (child, index) => {
        if (!isChildrenStep(child)) return

        return React.cloneElement(child, { active: index <= isActiveIndex, isLast: index === childCount - 1 })
      })}
    </Container>
  )
}

StepsLayout.Step = Step

export const Steps = styled(StepsLayout)``
