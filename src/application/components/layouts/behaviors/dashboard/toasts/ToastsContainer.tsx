import styled from "styled-components"
import { useList } from "effector-react"
import { $toasts, toasts } from "@/application/components/layouts/behaviors/dashboard/toasts/toasts"
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

const Toast = styled.div`
  margin-top: 10px;
  padding: 12px;
  background: #4858cc;
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
      <Toast>
        {toast.text}
        <Close onClick={() => toasts.remove(toast)} />
      </Toast>
    ))}
  </Container>
)
