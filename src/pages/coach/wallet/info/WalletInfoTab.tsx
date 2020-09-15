import { Button } from "@/components/button/normal/Button"
import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { changeShowWithdrawDialog } from "@/pages/coach/wallet/withdraw-dialog/withdraw.model"
import { $amount, $frozenAmount, $isLoading } from "./info.model"
import { useEvent, useStore } from "effector-react/ssr"
import { WalletAmount } from "./WalletAmount"
import React from "react"
import styled from "styled-components"

const WalletInfoContainer = styled.div`
  position: relative;
  padding: 44px 40px 44px 60px;

  ${MediaRange.lessThan("mobile")`
    padding: 25px 16px 20px;
  `}
`

const StyledWalletAmount = styled(WalletAmount)`
  &:not(:first-of-type) {
    margin-top: 32px;
  }
  ${MediaRange.lessThan("mobile")`
    &:not(:first-of-type) {
      margin-top: 16px;
    }
  `}
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const AddFundsButton = styled(Button)`
  position: absolute;
  right: 40px;
  top: 44px;
  ${MediaRange.lessThan("mobile")`
    position: unset;
    margin: 100px auto 0;
  `}
`

export const WalletInfoTab = () => {
  const amount = useStore($amount)
  const frozenAmount = useStore($frozenAmount)
  const isLoading = useStore($isLoading)

  const _changeShowWithdrawDialog = useEvent(changeShowWithdrawDialog)

  return (
    <WalletInfoContainer>
      <StyledWalletAmount title='Доступно' amount={amount} description='qweqwe asd asd Lorem ipsum trali vali' />
      <StyledWalletAmount title='Ваши тренинги забронировали на' amount={frozenAmount} description={"asdasdasd"} />
      <ButtonContainer>
        <AddFundsButton onClick={() => _changeShowWithdrawDialog(true)}>Вывести</AddFundsButton>
      </ButtonContainer>
      {isLoading && <Spinner />}
    </WalletInfoContainer>
  )
}