import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  &:first-child {
    margin-top: 0;
  }

  ${MediaRange.lessThan("mobile")`
     margin-top: 16px;
  `}
`

const Tabletka = styled(Icon).attrs({ name: "tabletka" })`
  width: 12px;
  min-width: 12px;
  height: 12px;
  min-height: 12px;
  margin-right: 4px;
  fill: #7d36a8;
`

const Text = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
  `}
`

type ItemTypes = {
  children: React.ReactChild
}

export const FeatureItem = (props: ItemTypes) => (
  <Container>
    <Tabletka />
    <Text>{props.children}</Text>
  </Container>
)
