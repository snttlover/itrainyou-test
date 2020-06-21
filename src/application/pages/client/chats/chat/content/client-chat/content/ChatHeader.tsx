import styled from "styled-components"
import { Avatar } from "@/application/components/avatar/Avatar"

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 12px;
  border-bottom: 1px solid #E5E5E5;
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  flex: 1;
`

export const ChatHeader = () => (
  <Container>
    <StyledAvatar src='https://avatars.mds.yandex.net/get-ott/374297/2a000001616b87458162c9216ccd5144e94d/orig' />
    <Title>Константин Константинович</Title>
  </Container>
)
