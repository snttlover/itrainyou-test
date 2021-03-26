import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent } from "effector-react"
import React from "react"
import styled from "styled-components"
import MasterCard from "@/pages/client/wallet/img/MasterCard.svg"
import Visa from "@/pages/client/wallet/img/Visa.svg"
import { Button } from "@/components/button/normal/Button"
import {toggleAddTinkoffCardModal} from "@/pages/coach/home/coach-home.model"


const PlusIcon = styled(Icon).attrs({ name: "plus" })`
  width: 10px;
  height: 10px;
  fill: ${({ theme }) => theme.colors.primary};
`
const MirLogo = styled(Icon).attrs({name: "mir-logo-card"})`
  margin-left: 8px;
  width: 32px;
  height: 22px;
`

const Maestro = styled(Icon).attrs({name: "maestro"})`
  margin-left: 8px;
  width: 32px;
  height: 22px;
`

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  ${MediaRange.lessThan("mobile")`
    
  `}
`

const Item = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    align-items: flex-start;
  `}
`

const VisaImg = styled.img`
  margin-left: 8px;
  width: 32px;
  height: 22px;
`

const MasterCardImg = styled.img`
  width: 32px;
  height: 22px;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-right: 12px;
`

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`
const MobileGroup = styled.div`

  ${MediaRange.lessThan("mobile")`
    display:flex;
    width: 100%;
    justify-content: flex-end;
  `}
`
const StyledButton = styled(Button)`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.primary};

    ${MediaRange.lessThan("mobile")`
     padding: 2px 16px; 
    `}
`

export const WalletAddCard = () => {
  const toggle = useEvent(toggleAddTinkoffCardModal)

  const handleAddCard = (e: React.SyntheticEvent) => {
    toggle(true)
  }

  return (
    <Item>
      <BottomRow>
        <LogosContainer>
          <Title> Новая карта </Title>
          <MasterCardImg src={MasterCard} />
          <Maestro />
          <VisaImg src={Visa} />
          <MirLogo />
        </LogosContainer>
        <MobileGroup>
          <StyledButton onClick={handleAddCard}><Text>Добавить карту</Text></StyledButton>
        </MobileGroup>
      </BottomRow>
    </Item>
  )
}