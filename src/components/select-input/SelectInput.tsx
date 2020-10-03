import { Icon } from "#/components/icon/Icon"
import { useClickOutside } from "#/components/click-outside/use-click-outside"
import { useRef, useState } from "react"
import * as React from "react"
import styled from "styled-components"

const Arrow = styled(Icon).attrs({ name: "arrow" })`
  fill: #919be0;
`

const Placeholder = styled.p`
  color: #b3b3b3;
  font-size: 16px;
  line-height: 22px;
`

export const DropdownItem = styled.div`
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
  border: 1px solid #919be0;
  box-sizing: border-box;
  border-radius: 0 0 4px 4px;
  background: #ffffff;
  top: 100%;
  left: -1px;
  margin-bottom: 16px;
  z-index: 1;
  overflow: auto;
  overflow-x: hidden;
`

const SelectBox = styled.div<{ isOpen: boolean; error?: boolean; withoutBorder?: boolean }>`
  position: relative;
  width: 100%;
  height: 32px;
  background: #fff;
  border: 1px solid
    ${({ error, isOpen, withoutBorder }) =>
      withoutBorder ? "transparent" : error ? "#D5584D" : isOpen ? "#919BE0" : "#D3D7F3"};
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

const Label = styled.div`
  width: 100%;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

type Value = string | number

export type SelectInputProps<T extends Value> = {
  value: T | null
  placeholder?: string
  onChange: (value: T) => void
  options: {
    value: T
    label: string
  }[]
  error?: boolean
  onBlur?: () => void
  className?: string
  withoutBorder?: boolean
  onClick?: () => void
}

export const SelectInput = <T extends Value = Value>({
  value,
  placeholder,
  onChange,
  options,
  error,
  onBlur,
  className,
  withoutBorder,
  onClick
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
      className={className}
      onClick={() => {
        onClick && onClick()
        const newValue = !isOpen
        changeOpen(newValue)
        if (!newValue && onBlur) {
          onBlur()
        }
      }}
      withoutBorder={withoutBorder}
    >
      {selectedItem ? <Label>{selectedItem.label}</Label> : <Placeholder>{placeholder}</Placeholder>}
      <Arrow />
      {isOpen && <Dropdown>{dropdownItems}</Dropdown>}
    </SelectBox>
  )
}
