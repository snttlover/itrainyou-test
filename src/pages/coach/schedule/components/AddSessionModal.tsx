import { DashedButton } from "@/components/button/dashed/DashedButton"
import { Icon } from "@/components/icon/Icon"
import { Modal } from "@/components/modal/Modal"
import { SelectInput } from "@/components/select-input/SelectInput"
import React from "react"
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
`

type AddSessionModalProps = {
  onCrossClick: () => void
}

const types = [
  { label: "30 минут", value: "30" },
  { label: "45 минут", value: "45" },
  { label: "60 минут", value: "60" },
  { label: "90 минут", value: "90" },
]

const startOptions = [
  { label: "30 минут", value: "30" },
  { label: "45 минут", value: "45" },
  { label: "60 минут", value: "60" },
  { label: "90 минут", value: "90" },
]

const StyledSelectInput = styled(SelectInput)`
  margin-top: 20px;
`

const StyledDashedButton = styled(DashedButton)`
  margin-top: 16px;
`

export const AddSessionModal: React.FC<AddSessionModalProps> = ({ onCrossClick }) => (
  <Modal>
    <Background>
      <Block>
        <CrossIcon onClick={onCrossClick} />
        <Title>Добавить сессию</Title>
        <StyledSelectInput value='' onChange={() => {}} options={startOptions} placeholder='Начало' />
        <StyledSelectInput value='' onChange={() => {}} options={types} placeholder='Тип' />
        <StyledDashedButton>Добавить сессию</StyledDashedButton>
      </Block>
    </Background>
  </Modal>
)
