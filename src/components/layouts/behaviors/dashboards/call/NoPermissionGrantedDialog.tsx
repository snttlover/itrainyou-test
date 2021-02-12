import React from "react"
import { useEvent, useList, useStore } from "effector-react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { navigatePush } from "@/feature/navigation"
import { Button } from "@/components/button/normal/Button"
import { Dialog } from "@/components/dialog/Dialog"
import { togglePermissionGrantedModal, $permissionGrantedModalVisibility, $modalInfo } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { Icon } from "@/components/icon/Icon"

type ListItemType = {
  text: string
  link: string | null
}

const StyledListItem: React.FC<ListItemType> = ({ text, link }) => {
  return (
    <ItemWrapper>
      <Item>
        <MarkerIcon />
        <ItemText>
          {text}
          {!!link && <StyledLink>{link}</StyledLink>}
        </ItemText>
      </Item>
    </ItemWrapper>
  )
}

export const NoPermissionGrantedDialog = () => {
  const visibility = useStore($permissionGrantedModalVisibility)
  const navigate = useEvent(navigatePush)
  const toggle = useEvent(togglePermissionGrantedModal)
  const info = useStore($modalInfo)

  const list = [
    {text: `запрещен доступ к ${info === "video" ? "камере" : "микрофону"} в браузере`,link: `Как включить ${info === "video" ? "камеру" : "микрофон"}`},
    {text: `запрещен доступ к ${info === "video" ? "камере" : "микрофону"} в настройках компьютера`,link: null},
    {text: `${info === "video" ? "камера" : "микрофон"} неисправ${info === "video" ? "на" : "ен"}`,link: null},
    {text: `нет ${info === "video" ? "камеры" : "микрофона"} в компьютере`,link: null},
  ]

  return (
    <StyledDialog value={visibility} onChange={toggle}>
      <ModalWrapper>
        <Container>
          <Header>
            {info === "video" ? "Нет доступа к камере" : "Нет доступа к микрофону"}
          </Header>
          <Description>
              Посмотрите на список возможных ошибок, которые могут быть:
          </Description>
          {list.map((item, index) => (
            <StyledListItem {...item} key={index} />
          ))}
          <StyledConfirmButton
            onClick={() => toggle()}
          >
              Понятно
          </StyledConfirmButton>
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

const StyledLink = styled.div`
  color: #424242;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
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

const StyledConfirmButton = styled(Button)`
  width: 100%;
  max-width: 220px;
  margin-top: 100px;
`

const MarkerIcon = styled(Icon).attrs({ name: "ellipse-list-marker" })`
  width: 8px;
  height: 8px;
`