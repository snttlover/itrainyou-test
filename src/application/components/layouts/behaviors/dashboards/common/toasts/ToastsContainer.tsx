import styled from "styled-components"
import { useList } from "effector-react"
import { $toasts, toasts, ToastType } from "@/application/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { Icon } from "@/application/components/icon/Icon"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 264px;
  top: 84px;
  right: 24px;
  z-index: 10;
`

const Toast = styled.div<{ type: ToastType }>`
  margin-top: 10px;
  padding: 12px;
  background: ${({type}) => type === `info` ? `#4858cc` : `#FF6000`};
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
    {useList($toasts, toast => (
      <Toast type={toast.type}>
        {toast.text}
        <Close onClick={() => toasts.remove(toast)} />
      </Toast>
    ))}
  </Container>
)
