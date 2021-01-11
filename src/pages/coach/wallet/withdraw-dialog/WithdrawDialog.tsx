import { Button } from "@/components/button/normal/Button"
import { Dialog } from "@/components/dialog/Dialog"
import { FormItem } from "@/components/form-item/FormItem"
import { SelectInput } from "@/components/select-input/SelectInput"
import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { $cardsListForView } from "../cards/cards.model"
import { PriceInput } from "@/pages/coach/schedule/components/PriceInput"
import React from "react"
import styled from "styled-components"
import {
  $withdrawForm,
  $isWithdrawDialogShowed,
  changeShowWithdrawDialog,
  cardChanged,
  amountChanged,
  $withdrawErrors,
  submitFundUp,
  $canSubmit,
  $isTopUpLoading,
} from "./withdraw.model"
import { useEvent, useStore } from "effector-react"

export const WithdrawDialog = () => {
  const _changeShowFundUpDialog = useEvent(changeShowWithdrawDialog)
  const isShowed = useStore($isWithdrawDialogShowed)
  const cards = useStore($cardsListForView)
  const errors = useStore($withdrawErrors)
  const canSubmit = useStore($canSubmit)
  const isLoading = useStore($isTopUpLoading)

  const form = useStore($withdrawForm)
  const _cardChanged = useEvent(cardChanged)
  const _amountChanged = useEvent(amountChanged)
  const _submitFundUp = useEvent(submitFundUp)

  const cardsOptions = cards
    .map(card => ({
      label: `XXXX XXXX XXXX ${card.cardEnd} (${card.expireDate})`,
      value: card.id,
    }))
    .concat({ label: "Другая", value: -2 })

  return (
    <StyledDialog value={isShowed} onChange={_changeShowFundUpDialog}>
      <Title>Пополнение кошелька</Title>
      <Form
        onSubmit={e => {
          e.preventDefault()
          _submitFundUp()
        }}
      >
        <CardFormItem label='Выберите карту' required error={errors.selectedCard}>
          <SelectInput value={form.selectedCard} onChange={_cardChanged} options={cardsOptions} />
        </CardFormItem>
        {form.selectedCard !== -2 && (
          <AmountMargin>
            <FormItem label='Сумма' required error={errors.amount}>
              <PriceInput type='number' value={form.amount} onChange={_amountChanged} placeholder='50' />
            </FormItem>
          </AmountMargin>
        )}
        {form.selectedCard === -2 && (
          <AmountMargin>
            <AddNewCardAttentionText>
              Для вывода на карту вам необходимо добавить карту к себе в аккаунт. Мы спишем 1 рубль с неё и вернем вам
              обратно.
            </AddNewCardAttentionText>
          </AmountMargin>
        )}
        <SubmitButton type='submit' disabled={!canSubmit}>
          Вывести
        </SubmitButton>
        {isLoading && <Spinner />}
      </Form>
    </StyledDialog>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AmountMargin = styled.div`
  margin-top: 20px;
  width: 100%;
`

const SubmitButton = styled(Button)`
  width: 160px;
  margin: 33px auto 0;
`
const CardFormItem = styled(FormItem)`
  margin-top: 36px;
  margin-bottom: 0;
`

const AddNewCardAttentionText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 400px;
  padding: 16px;
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.primary};

  ${MediaRange.lessThan("mobile")`
    font-size: 18px;
    line-height: 22px;
  `}
`
