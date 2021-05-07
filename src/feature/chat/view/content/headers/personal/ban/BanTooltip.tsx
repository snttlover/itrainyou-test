import React, { useState } from "react"
import styled from "styled-components"
import { Icon } from "@/oldcomponents/icon/Icon"
import { ClickOutside } from "@/oldcomponents/click-outside/ClickOutside"
import { BanDialog } from "@/feature/chat/view/content/headers/personal/ban/BanDialog"
import { useEvent, useStore } from "effector-react"
import { $banClientLoading, toggleClientBan, toggleClientRestrict } from "@/feature/chat/modules/ban-client"
import { Loader, Spinner } from "@/oldcomponents/spinner/Spinner"

type BanTooltipTypes = {
  blocked: boolean
  restricted: boolean
  userId: number
}

export const BanTooltip = (props: BanTooltipTypes) => {
  const banning = useStore($banClientLoading)

  const [tooltipVisibility, changeTooltipVisibility] = useState(false)
  const [banDialogVisibility, changeBanDialogVisibility] = useState(false)

  const restrictedText = props.restricted
    ? "Включить сообщения до покупки сессии"
    : "Ограничить сообщения до покупки сессии"
  const banText = props.blocked ? "Разблокировать клиента" : "Заблокировать клиента"

  const ban = useEvent(toggleClientBan)
  const restrict = useEvent(toggleClientRestrict)

  const banHandler = () => {
    if (props.blocked) {
      ban(props.userId)
    } else {
      changeBanDialogVisibility(true)
    }
  }

  const onBanSuccess = () => {
    changeBanDialogVisibility(false)
    ban(props.userId)
  }

  return (
    <ClickOutside onClickOutside={() => changeTooltipVisibility(false)}>
      <Container onClick={() => changeTooltipVisibility(true)}>
        <BanIcon />
        {tooltipVisibility && (
          <Tooltip>
            <ItemsWrapper>
              {banning && (
                <LoaderWrapper>
                  <StyledLoader />
                </LoaderWrapper>
              )}
              <Item onClick={() => restrict(props.userId)}>{restrictedText}</Item>
              <Item onClick={banHandler}>{banText}</Item>
            </ItemsWrapper>
          </Tooltip>
        )}
        <BanDialog
          onSuccess={onBanSuccess}
          visibility={banDialogVisibility}
          onChangeVisibility={changeBanDialogVisibility}
        />
      </Container>
    </ClickOutside>
  )
}

const ItemsWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const LoaderWrapper = styled.div`
  position: absolute;
  background: #fff;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%); 
`

const StyledLoader = styled(Loader)`
   width: 100px;
   height: 80px;
`

const Container = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
`

const BanIcon = styled(Icon).attrs({ name: "none" })`
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
