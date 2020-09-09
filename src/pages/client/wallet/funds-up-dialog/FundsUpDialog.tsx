import { Button } from "@/components/button/normal/Button"
import { Dialog } from "@/components/dialog/Dialog"
import { FormItem } from "@/components/form-item/FormItem"
import { RadioGroup, RadioOption } from "@/components/radio/Radio"
import { SelectInput } from "@/components/select-input/SelectInput"
import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { $userHasCoach } from "@/pages/client/profile/content/coach-button/profile-coach-button"
import { $cardsListForView } from "../cards/cards.model"
import { PriceInput } from "@/pages/coach/schedule/components/PriceInput"
import React from "react"
import styled from "styled-components"
import {
  $fundUpForm,
  $isFundUpDialogShowed,
  changeShowFundUpDialog,
  cardChanged,
  amountChanged,
  $fundUpErrors,
  changeType,
  submitFundUp,
  $canSubmit,
  saveCardChanged,
  $isTopUpLoading,
} from "./fund-up.model"
import { useEvent, useStore } from "effector-react/ssr"
import { Checkbox } from "@/components/checkbox/Checkbox"

export const FundsUpDialog = () => {
  const _changeShowFundUpDialog = useEvent(changeShowFundUpDialog)
  const isShowed = useStore($isFundUpDialogShowed)
  const cards = useStore($cardsListForView)
  const errors = useStore($fundUpErrors)
  const canSubmit = useStore($canSubmit)
  const isLoading = useStore($isTopUpLoading)

  const userHasCoach = useStore($userHasCoach)

  const form = useStore($fundUpForm)
  const _cardChanged = useEvent(cardChanged)
  const _saveCardChanged = useEvent(saveCardChanged)
  const _amountChanged = useEvent(amountChanged)
  const _changeType = useEvent(changeType)
  const _submitFundUp = useEvent(submitFundUp)

  const cardsOptions = cards
    .map(card => ({
      label: `XXXX XXXX XXXX ${card.cardEnd} (${card.expireDate})`,
      value: card.id,
    }))
    .concat({ label: "Другая", value: -1 })

  return (
    <StyledDialog value={isShowed} onChange={_changeShowFundUpDialog}>
      <Title>Пополнение кошелька</Title>
      <Form
        onSubmit={e => {
          e.preventDefault()
          _submitFundUp()
        }}
      >
        {userHasCoach && (
          <RadioGroup value={form.type} name='type' onChange={_changeType}>
            <InlineRadio>
              <RadioOption value='coach'>
                <RadioLabel>Со счета коуча</RadioLabel>
              </RadioOption>
              <RadioOption value='card'>
                <RadioLabel>С карты</RadioLabel>
              </RadioOption>
            </InlineRadio>
          </RadioGroup>
        )}
        {form.type === "card" && cardsOptions.length > 0 && (
          <CardFormItem label='Выберите карту' required error={errors.selectedCard}>
            <SelectInput value={form.selectedCard} onChange={_cardChanged} options={cardsOptions} />
          </CardFormItem>
        )}
        <AmountMargin>
          <FormItem label='Сумма' required error={errors.amount}>
            <PriceInput type='number' value={form.amount} onChange={_amountChanged} placeholder='50' />
          </FormItem>
        </AmountMargin>
        <MinimalFundsUpText>Минимальная сумма - 50 ₽</MinimalFundsUpText>
        {form.selectedCard === -1 && (
          <div style={{ width: "100%", marginTop: "20px" }}>
            <Checkbox value={form.saveCard} onChange={_saveCardChanged}>
              Сохранить карту
            </Checkbox>
          </div>
        )}
        <SubmitButton type='submit' disabled={!canSubmit}>
          Пополнить
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

const InlineRadio = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  width: 290px;
  margin-top: 25px;

  ${MediaRange.lessThan("mobile")`
    display: block;
  `}
`

const RadioLabel = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
`

const SubmitButton = styled(Button)`
  width: 160px;
  margin: 33px auto 0;
`

const MinimalFundsUpText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #4858cc;
  text-align: center;
  margin-top: -7px;
`

const CardFormItem = styled(FormItem)`
  margin-top: 36px;
  margin-bottom: 0;
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
  color: #4858cc;

  ${MediaRange.lessThan("mobile")`
    font-size: 18px;
    line-height: 22px;
  `}
`
