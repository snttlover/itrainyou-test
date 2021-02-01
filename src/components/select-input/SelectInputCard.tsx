import { Icon } from "@/components/icon/Icon"
import { useClickOutside } from "@/components/click-outside/use-click-outside"
import { useRef, useState } from "react"
import * as React from "react"
import styled from "styled-components"
import { keysToSnake } from "@/lib/network/casing"
import { MediaRange } from "@/lib/responsive/media"

const Arrow = styled(Icon).attrs({ name: "arrow" })`
  fill: #919be0;
`
const NoShowMobile = styled.div`
  ${MediaRange.lessThan("mobile")`
    display: none;
  `}
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

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Label = styled.div`
  width: 100%;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

type Value = {
    id: number | string
    type: string | null
    cardEnd: string | null
    expireDate: string | null
    isPrimary: boolean | null
}

export type SelectInputProps<T extends Value> = {
  value: Value
  placeholder?: string
  onChange: (value: T) => void
  options: T[]
  error?: boolean
  onBlur?: () => void
  className?: string
  withoutBorder?: boolean
  onClick?: () => void
}

type CardIconTypes = {
  cardtype: "MasterCard" | "Visa"
}

const CardIcon = styled(Icon).attrs((props: any) => ({
  name: props.cardtype,
  ...props
}))`
    width: 32px;
    height: 22px;
  `

export const SelectInputCard = <T extends Value = Value>({
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
    if ( item.id !== "other") {
      return (
        <DropdownItem key={item.id} onClick={() => onChange(item)}>
          <LabelContainer>
            <div>{`ХХХХ ХХХХ ХХХХ ${item.cardEnd} (${item.expireDate})`}</div>
            {item.type && <CardIcon cardtype={item.type} />}
          </LabelContainer>
        </DropdownItem>
      )}
    else {
      return (
        <DropdownItem key={"other"} onClick={() => onChange(item)}>
          <LabelContainer>
            <div>Новая карта</div>
          </LabelContainer>
        </DropdownItem>
      )
    }
  })

  const selectedItem = options.find(item => item.id === value.id)

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
      {<LabelContainer>
        <Label>{selectedItem?.id !== "other" ?
          `ХХХХ ХХХХ ХХХХ ${selectedItem?.cardEnd} (${selectedItem?.expireDate})`
          : "Новая карта"}
        </Label>
        {selectedItem?.id !== "other" && (selectedItem?.type &&
                (<NoShowMobile>
                  <CardIcon cardtype={selectedItem.type} />
                </NoShowMobile>
                ))}
      </LabelContainer>}
      <Arrow />
      {isOpen && <Dropdown>{dropdownItems}</Dropdown>}
    </SelectBox>
  )
}