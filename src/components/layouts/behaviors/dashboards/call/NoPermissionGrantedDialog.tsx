import React, { useEffect, useState } from "react"
import { useEvent, useStore } from "effector-react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Button } from "@/components/button/normal/Button"
import { Dialog } from "@/components/dialog/Dialog"
import { togglePermissionGrantedModal, $permissionGrantedModalVisibility, $modalInfo } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { Icon } from "@/components/icon/Icon"

type ListItemType = {
  text: string
  link: string | null
  action: string | null
}

const StyledListItem: React.FC<ListItemType> = ({ text, link, action}) => {
  const [showed,setShowed] = useState(true)

  useEffect(() => {
    if (!navigator.userAgent || navigator.userAgent.indexOf("Edg") != -1 || navigator.userAgent.indexOf("YaBrowser") != -1) {
      setShowed(false) 
    }
  }, [])

  const handleOnClick = () => {
    if (!!action) {
      if ((navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf("OPR")) != -1) {
        window.open("https://help.opera.com/ru/latest/web-preferences/#Управление-доступом-к-камере")
      } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        window.open("https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DDesktop&hl=ru")
      } else if (navigator.userAgent.indexOf("Safari") != -1) {
        if (window.innerWidth >= 480) {
          window.open("https://support.apple.com/ru-ru/guide/safari/ibrw7f78f7fe/mac")
        } else {
          window.open("https://ipadstory.ru/kak-upravlyat-nastrojkami-privatnosti-v-safari-na-iphone-i-ipad.html")
        }
      } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        window.open("https://support.mozilla.org/ru/kb/upravlenie-razresheniyami-dlya-kamery-i-mikrofona-")
      }
    }
  }

  return (
    <ItemWrapper>
      <Item>
        <MarkerIcon />
        <ItemText>
          {text}
          <br/>
          {!!link && showed && <StyledLink active={action} onClick={handleOnClick}>{link}</StyledLink>}
        </ItemText>
      </Item>
    </ItemWrapper>
  )
}

export const NoPermissionGrantedDialog = () => {
  const visibility = useStore($permissionGrantedModalVisibility)
  const toggle = useEvent(togglePermissionGrantedModal)
  const info = useStore($modalInfo)

  const list = [
    {text: `запрещен доступ к ${info === "video" ? "камере" : "микрофону"} в браузере`,link: `Как включить ${info === "video" ? "камеру" : "микрофон"}`, action: "redicrect"},
    {text: `запрещен доступ к ${info === "video" ? "камере" : "микрофону"} в настройках компьютера`,link: `После разрешения доступа к ${info === "video" ? "камере" : "микрофону"} перезагрузите страницу`, action: null},
    {text: `${info === "video" ? "камера" : "микрофон"} неисправ${info === "video" ? "на" : "ен"}`,link: null, action: null},
    {text: `нет ${info === "video" ? "камеры" : "микрофона"} в компьютере`,link: null, action: null},
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

const StyledLink = styled.div<{ active: string | null }>`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  text-decoration: underline;
  cursor: ${({ active }) => (!!active ? "pointer" : "none")};
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
  
  ${MediaRange.lessThan("mobile")`
    margin-top: 40px;
  `}
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