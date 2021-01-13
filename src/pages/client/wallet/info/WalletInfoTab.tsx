import { Button } from "@/components/button/normal/Button"
import { Spinner } from "@/components/spinner/Spinner"
import { changeShowFundUpDialog } from "@/feature/client-funds-up/dialog/fund-up.model"
import { MediaRange } from "@/lib/responsive/media"
import { $amount, $frozenAmount, $isLoading, $totalAmount } from "./info.model"
import { useEvent, useStore } from "effector-react"
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
  const totalAmount = useStore($totalAmount)
  const isLoading = useStore($isLoading)

  const _changeShowFundUpDialog = useEvent(changeShowFundUpDialog)

  return (
    <WalletInfoContainer>
      <StyledWalletAmount title='Доступно' amount={amount} description='Доступно для покупки сессий' />
      <StyledWalletAmount
        title='Заморожено'
        amount={frozenAmount}
        description={"Данная сумма заморожена, пока коуч не подвердит или не отклонит Ваши запросы на бронирование"}
      />
      <StyledWalletAmount
        title='Всего средств'
        amount={totalAmount}
        description={"Общая сумма средств"}
      />
      <ButtonContainer>
        <AddFundsButton onClick={() => _changeShowFundUpDialog(true)}>Пополнить кошелек</AddFundsButton>
      </ButtonContainer>
      {isLoading && <Spinner />}
    </WalletInfoContainer>
  )
}
