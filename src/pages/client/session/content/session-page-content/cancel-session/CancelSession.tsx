import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const CancelSession = ({ className }: { className?: string }) => (
  <Button className={className}>Перенести сессию</Button>
)

const Button = styled.div`
  display: flex;
  width: 100%;
  padding: 13px 0;
  align-items: center;
  justify-content: center;
  color: #424242;

  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  background: #fff;
  border-radius: 2px;
  margin-top: 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  ${MediaRange.lessThan(`mobile`)`
    font-size: 14px;
    line-height: 18px;
    margin-top: 12px;
    padding: 10px 0;
  `}
`
