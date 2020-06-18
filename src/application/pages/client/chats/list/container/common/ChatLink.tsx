import styled from "styled-components"
import { Avatar } from "@/application/components/avatar/Avatar"
import { Icon } from "@/application/components/icon/Icon"

const Container = styled.div`
  display: flex;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 12px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`

const Column = styled.div`
  flex: 1;
  flex-basis: 50%;
  padding: 12px;
  height: 100%;
  display: flex;
  align-items: center;
`

const MessageColumn = styled(Column)`
  display: flex;
  padding-left: 8px;
  border-right: 1px solid #d3d7f3;
`

const ActionsColumn = styled(Column)`
  padding-bottom: 8px;
`

const StyledAvatar = styled(Avatar)`
  margin-right: 12px;

  width: 52px;
  height: 52px;
`

const MessageContent = styled.div`
  flex: 1;
`

const UserName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 8px;
`

const LastMessage = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #424242;
`

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Time = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #9aa0a6;
  margin-bottom: 14px;
`

const Counter = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  background: #4858cc;
  border-radius: 16px;
  padding: 3px 4px;
`

const VideoIcon = styled(Icon).attrs({ name: `video` })`
  fill: ${props => props.theme.colors.primary};
  width: 24px;
  height: 24px;
`

const ActionsHeader = styled.div`
  display: flex;
  align-items: center;
`

const SessionStatus = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 10px;
  flex: 1;
`

export const ChatLink = () => (
  <Container>
    <MessageColumn>
      <StyledAvatar src='https://avatars.mds.yandex.net/get-ott/374297/2a000001616b87458162c9216ccd5144e94d/orig' />
      <MessageContent>
        <UserName>Ступин Владислав</UserName>
        <LastMessage>Да, заходите в сессию</LastMessage>
      </MessageContent>
      <MessageInfo>
        <Time>12:25</Time>
        <Counter>12</Counter>
      </MessageInfo>
    </MessageColumn>
    <ActionsColumn>
      <ActionsHeader>
        <VideoIcon />
        <SessionStatus>Сессия началась</SessionStatus>
      </ActionsHeader>
    </ActionsColumn>
  </Container>
)
