import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import arrow from "./arrow.svg"

const Arrow = styled.img.attrs({ src: arrow })``

const Placeholder = styled.p`
  color: #b3b3b3;
  font-size: 16px;
  line-height: 22px;
`

const DropdownItem = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 9px 12px;
  
  &:hover {
    background-color: #eeeeee;
  }
`

const Dropdown = styled.div`
  position: absolute;
  width: calc(100% + 2px);
  max-height: 150px;
  border: 1px solid #b3b3b3;
  box-sizing: border-box;
  border-radius: 0px 0px 4px 4px;
  background: #ffffff;
  top: 100%;
  left: -1px;
  margin-bottom: 16px;
  z-index: 1;
  overflow: auto;
`

const SelectBox = styled.div<{ isOpen: boolean }>`
  position: relative;
  width: 100%;
  height: 32px;
  border: 1px solid #b3b3b3;
  box-sizing: border-box;
  border-radius: ${({ isOpen }) => (isOpen ? "4px 4px 0px 0px" : "4px")};
  display: flex;
  align-items: center;
  padding: 0 16px 0 8px;

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
}

export const SelectInput = <T extends Value = Value>({ value, placeholder, onChange, options }: SelectInputProps<T>) => {
  const [isOpen, changeOpen] = useState(false)

  const dropdownItems = options.map(item => (
    <DropdownItem key={item.value} onClick={() => onChange(item.value)}>
      {item.label}
    </DropdownItem>
  ))

  const selectedItem = options.find(item => item.value === value)

  return (
    <SelectBox isOpen={isOpen} placeholder={placeholder} onClick={() => changeOpen(!isOpen)}>
      {selectedItem ? selectedItem.label : <Placeholder>{placeholder}</Placeholder>}
      <Arrow />
      {isOpen && (
        <Dropdown>
          {dropdownItems}
        </Dropdown>
      )}
    </SelectBox>
  )
}