import styled from "styled-components"
import { useEvent, useList } from "effector-react"
import { $toasts, toasts, ToastType } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { Icon } from "@/components/icon/Icon"
import React, { useEffect } from "react"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 264px;
  top: 84px;
  right: 24px;
  z-index: 9999;
`

const Toast = styled.div<{ type: ToastType }>`
  margin-top: 10px;
  padding: 12px;
  background: ${({ type, theme }) => (type === `info` ? theme.colors.primary : `#FF6000`)};
  border-radius: 2px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Close = styled(Icon).attrs({ name: `close` })`
  width: 17px;
  height: 17px;
  fill: #fff;
  cursor: pointer;
`

export const ToastsContainer = () => (
  <Container>
    {useList($toasts, toast => {
      const remove = useEvent(toasts.remove)

      useEffect(() => {
        const timeoutId = setTimeout(() => {
          remove(toast)
        }, 3000)

        return () => {
          timeoutId && clearTimeout(timeoutId)
        }
      }, [])

      return (
        <Toast type={toast.type}>
          {toast.text}
          <Close onClick={() => remove(toast)} />
        </Toast>
      )
    })}
  </Container>
)
