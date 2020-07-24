import React, { useState } from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { ClickOutside } from "@/components/click-outside/ClickOutside"

export const BanTooltip = () => {
  const [tooltipVisibility, changeTooltipVisibility] = useState(false)

  return (
    <ClickOutside onClickOutside={() => changeTooltipVisibility(false)}>
      <Container onClick={() => changeTooltipVisibility(true)}>
        <BanIcon />
        {tooltipVisibility && (
          <Tooltip>
            <Item>Ограничить сообщения до покупки сессии</Item>
            <Item>Заблокировать клиента</Item>
          </Tooltip>
        )}
      </Container>
    </ClickOutside>
  )
}

const Container = styled.div`
  cursor: pointer;
  position: relative;
`

const BanIcon = styled(Icon).attrs({ name: `none` })`
  height: 16px;
  fill: ${props => props.theme.colors.primary};
`

const Tooltip = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  top: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  width: 257px;
`

const Item = styled.div`
  padding: 8px;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`
