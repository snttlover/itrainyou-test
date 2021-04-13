import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { useClickOutside } from "@/oldcomponents/click-outside/use-click-outside"
import { Icon } from "@/oldcomponents/icon/Icon"
import { Modal } from "@/oldcomponents/modal/Modal"
import { useSelectInput } from "@/oldcomponents/select-input/SelectInput"
import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { DurationType } from "@/lib/api/coach-sessions"
import { MediaRange } from "@/lib/responsive/media"
import {
  $durationOptions,
  $form,
  $isCreateButtonDisabled,
  $startDatetimeOptions,
  addSession,
  createSessionsFx,
  durationChanged,
  startDatetimeChanged,
} from "@/pages/coach/schedule/models/add-session.model"
import { useStore, useEvent } from "effector-react"
import React, { useRef } from "react"
import styled from "styled-components"

const Background = styled.div`
  position: fixed;
  background: rgba(42, 42, 42, 0.6);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Block = styled.div`
  width: 296px;
  background: #ffffff;
  border-radius: 2px;
  position: relative;
  padding: 40px 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${MediaRange.greaterThan("mobile")`
    width: 400px;
  `}
`

const CrossIcon = styled(Icon).attrs({ name: "cross" })`
  fill: ${({ theme }) => theme.colors.primary};
  position: absolute;
  right: 16px;
  top: 12px;
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #424242;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

type AddSessionModalProps = {
  onCrossClick: () => void
}


const StyledDashedButton = styled(DashedButton)`
  margin-top: 16px;

  ${MediaRange.greaterThan("mobile")`
    height: 26px;
    padding-top: 0;
    padding-bottom: 0;
  `}
`

export const AddSessionModal: React.FC<AddSessionModalProps> = ({ onCrossClick }) => {
  const { SelectInput: StartSelectInput } = useSelectInput()
  const { SelectInput: TypeSelectInput } = useSelectInput()

  const StyledStartSelectInput = styled(StartSelectInput)`
    margin-top: 20px;
  `

  const StyledTypeSelectInput = styled(TypeSelectInput)`
    margin-top: 20px;
  `

  const formData = useStore($form)
  const durationOptions = useStore($durationOptions)
  const startDatetimeOptions = useStore($startDatetimeOptions)
  const isLoading = useStore(createSessionsFx.pending)
  const isCreateButtonDisabled = useStore($isCreateButtonDisabled)

  const _startDatetimeChanged = useEvent(startDatetimeChanged)
  const _durationChanged = useEvent(durationChanged)
  const _addSession = useEvent(addSession)

  const blockRef = useRef(null)

  useClickOutside(blockRef, onCrossClick)
  return (
    <Modal>
      <Background>
        <Block ref={blockRef}>
          <CrossIcon onClick={onCrossClick} />
          <Title>Добавить сессию</Title>
          <StyledStartSelectInput
            value={formData.startDatetime}
            onChange={value => _startDatetimeChanged(value as string)}
            options={startDatetimeOptions}
            placeholder='Начало'
          />
          <StyledTypeSelectInput
            value={formData.durationType}
            onChange={value => _durationChanged(value as DurationType)}
            options={durationOptions}
            placeholder='Тип'
          />
          <StyledDashedButton disabled={isCreateButtonDisabled} onClick={() => _addSession()}>
            Добавить сессию
          </StyledDashedButton>
          {isLoading && <Spinner />}
        </Block>
      </Background>
    </Modal>
  )
}
