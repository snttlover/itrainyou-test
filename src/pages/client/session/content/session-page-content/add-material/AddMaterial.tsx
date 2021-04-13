import React from "react"
import styled from "styled-components"
import { Icon } from "@/oldcomponents/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

export const AddMaterial = ({ className }: { className?: string }) => (
  <Button className={className}>
    <AddIcon />
    Добавить материал
  </Button>
)

const Button = styled.div`
  display: flex;
  width: 100%;
  padding: 13px 0;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #783D9D;
  background: #fff;
  border-radius: 2px;
  margin-top: 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
    margin-top: 12px;
    padding: 10px 0;
  `}
`

const AddIcon = styled(Icon).attrs({ name: "plus" })`
  fill: #783D9D;
  height: 14px;
  ${MediaRange.lessThan("mobile")`
    height: 12px;
  `}
`
