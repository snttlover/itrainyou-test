import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Dialog } from "@/components/dialog/Dialog"
import { Icon } from "@/components/icon/Icon"


export const NotCompatibleDialog = (props: any) => {

  const [showed,setShowed] = useState(true)

  return (
    <StyledDialog value={props.visibility && showed} onChange={(val) => setShowed(false)}>
      <ModalWrapper>
        <Container>
          <Header>
                            Браузер не поддерживает видеозвонки
          </Header>
          <Description>
                            К сожалению, браузер на вашем устройстве не поддерживает видеоконференции. Попробуйте с другого браузера.

                            Подробнее о списке поддерживаемых браузерах можно прочитать здесь
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

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
    margin-top: 8px;
    max-width: 300px;
  `}
`

const StyledLink = styled.div<{ active: string | null }>`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  text-decoration: underline;
  cursor: ${({ active }) => (active ? "pointer" : "default")};
`


const ItemText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #5B6670;
  margin-left: 8px;
`

const ItemWrapper = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  align-self: flex-start;
  justify-content: center;
  margin-top: 12px;
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const MarkerIcon = styled(Icon).attrs((props) => {
  if (props.theme.colors.primary === "#4858CC") {
    return { name: "ellipse-list-marker-client" }
  }
  else {
    return { name: "ellipse-list-marker-coach" }
  }
})`
  align-self: flex-start;
  margin-top: 7px;
  width: 8px;
  height: 8px;
  
  ${MediaRange.lessThan("mobile")`
    width: 7px;
    height: 7px;
  `}
`