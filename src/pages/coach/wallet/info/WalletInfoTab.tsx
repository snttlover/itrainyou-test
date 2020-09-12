import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { $amount, $frozenAmount, $isLoading } from "./info.model"
import { useStore } from "effector-react/ssr"
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

export const WalletInfoTab = () => {
  const amount = useStore($amount)
  const frozenAmount = useStore($frozenAmount)
  const isLoading = useStore($isLoading)

  return (
    <WalletInfoContainer>
      <StyledWalletAmount title='Доступно' amount={amount} description='qweqwe asd asd Lorem ipsum trali vali' />
      <StyledWalletAmount title='Ваши тренинги забронировали на' amount={frozenAmount} description={"asdasdasd"} />
      {isLoading && <Spinner />}
    </WalletInfoContainer>
  )
}
