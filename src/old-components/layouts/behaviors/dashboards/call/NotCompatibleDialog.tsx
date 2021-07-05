import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Dialog } from "@/old-components/dialog/Dialog"

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
      <Container>
        <Header>
                            Браузер не поддерживает видеозвонки
        </Header>
        <Description>
                            К сожалению, браузер на вашем устройстве не поддерживает видеоконференции. Попробуйте с другого браузера.

                            Подробнее о списке поддерживаемых браузерах можно прочитать <a onClick={handleOnClick}>здесь</a>
        </Description>
      </Container>
    </StyledDialog>
  )
}


const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 536px;
  padding: 24px 24px;
    ${MediaRange.lessThan("mobile")`
    padding: 24px 16px;
  `}
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 20px;
  line-height: 28px;
  color: #424242;
  text-align: left;
  
  ${MediaRange.lessThan("mobile")`
    max-width: 270px;
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #5B6670;
  margin-top: 12px;
  margin-bottom: 24px;
  text-align: left;

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