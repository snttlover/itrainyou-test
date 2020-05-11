import { Icon } from "@/application/components/icon/Icon"
import { useClickOutside } from "@/application/components/click-outside/use-click-outside"
import { useRef, useState } from "react"
import * as React from "react"
import styled from "styled-components"

const Arrow = styled(Icon).attrs({ name: 'arrow' })`
  fill: #919BE0;
`

const Placeholder = styled.p`
  color: #b3b3b3;
  font-size: 16px;
  line-height: 22px;
`

const DropdownItem = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 9px 12px;
  
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;

  &:hover {
    background-color: #eeeeee;
  }
`

const Dropdown = styled.div`
  position: absolute;
  width: calc(100% + 2px);
  max-height: 150px;
  border: 1px solid #919BE0;
  box-sizing: border-box;
  border-radius: 0 0 4px 4px;
  background: #ffffff;
  top: 100%;
  left: -1px;
  margin-bottom: 16px;
  z-index: 1;
  overflow: auto;
`

const SelectBox = styled.div<{ isOpen: boolean; error?: boolean }>`
  position: relative;
  width: 100%;
  height: 32px;
  background: #fff;
  border: 1px solid ${({ error, isOpen }) => (error ? "#D5584D" : isOpen ? "#919BE0" : "#D3D7F3")};
  box-sizing: border-box;
  border-radius: ${({ isOpen }) => (isOpen ? "2px 2px 0px 0px" : "2px")};
  display: flex;
  align-items: center;
  padding: 0 12px 0 8px;

  ${Arrow} {
    margin-left: auto;
    transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  }
`

type Value = string | number

type SelectInputProps<T extends Value> = {
  value: T
  placeholder?: string
  onChange: (value: T) => void
  options: {
    value: T
    label: string
  }[]
  error?: boolean
  onBlur?: () => void
  className?: string
}

export const SelectInput = <T extends Value = Value>({
  value,
  placeholder,
  onChange,
  options,
  error,
  onBlur
}: SelectInputProps<T>) => {
  const [isOpen, changeOpen] = useState(false)

  const dropdownItems = options.map(item => {
    return (
      <DropdownItem key={item.value} onClick={() => onChange(item.value)}>
        {item.label}
      </DropdownItem>
    )
  })

  const selectedItem = options.find(item => item.value === value)

  const selectBoxRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectBoxRef, () => {
    changeOpen(false)
  })

  return (
    <SelectBox
      isOpen={isOpen}
      error={error}
      ref={selectBoxRef}
      placeholder={placeholder}
      onClick={() => {
        const newValue = !isOpen
        changeOpen(newValue)
        if (!newValue && onBlur) {
          onBlur()
        }
      }}
    >
      {selectedItem ? selectedItem.label : <Placeholder>{placeholder}</Placeholder>}
      <Arrow />
      {isOpen && <Dropdown>{dropdownItems}</Dropdown>}
    </SelectBox>
  )
}
