import styled from "styled-components"
import {IndividualSessionItem} from "@/application/pages/dashboard/profile/content/sessions-list/IndividualSessionItem"

const Container = styled.div`
  width: 100%;
  max-width: 650px;
  background: #fff;
  border-radius: 2px;
  margin-top: 44px;
  padding: 11px 20px;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #5B6670;
  text-align: center;
`

const ListContainer = styled.div`
  position: relative;
  display: table;
  width: 100%;
`

const item = {
  avatar: 'string',
  name: 'string',
  price: 20,
  date: 'string'
}

export const IndividualSessions = () => (
  <Container>
    <Title>Индивидуальные сессии</Title>
    <ListContainer>
      <IndividualSessionItem data={item} />
    </ListContainer>
  </Container>
)
