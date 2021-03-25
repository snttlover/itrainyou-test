import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Dialog } from "@/components/dialog/Dialog"

type NotCompatibleDialogTypes = {
    visibility: boolean
    close: () => void
}
export const NotCompatibleDialog = (props: NotCompatibleDialogTypes) => {

  const handleOnClick = () => {
    window.open("https://docs.agora.io/en/All/faq/browser_support")
  }

  return (
    <StyledDialog value={props.visibility} onChange={props.close}>
      <ModalWrapper>
        <Container>
          <Header>
                            Браузер не поддерживает видеозвонки
          </Header>
          <Description>
                            К сожалению, браузер на вашем устройстве не поддерживает видеоконференции. Попробуйте с другого браузера.

                            Подробнее о списке поддерживаемых браузерах можно прочитать <a onClick={handleOnClick}>здесь</a>
          </Description>
        </Container>
      </ModalWrapper>
    </StyledDialog>
  )
}

const ModalWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 536px;
  padding: 24px 68px;
    ${MediaRange.lessThan("mobile")`
    padding: 24px 16px;
  `}
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  color: #424242;
  text-align: center;
  max-width: 500px;
  
  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 24px;
    max-width: 300px;
    margin-top: 32px;
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #5B6670;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 24px;
  max-width: 400px;

    & a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: underline;
        cursor: pointer;
    }

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
    margin-top: 8px;
    max-width: 300px;
  `}
`