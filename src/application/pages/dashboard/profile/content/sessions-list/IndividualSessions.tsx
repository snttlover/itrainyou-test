import styled from "styled-components"
import dayjs from "dayjs"
import {IndividualSessionItem} from "@/application/pages/dashboard/profile/content/sessions-list/IndividualSessionItem"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  width: 100%;
  max-width: 650px;
  background: #fff;
  border-radius: 2px;
  margin-top: 44px;
  padding: 11px 20px;
  margin-bottom: 30px;

  ${MediaRange.lessThan(`mobile`)`
    margin-top: 16px;
  `}
`

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #5B6670;
  text-align: center;
  margin-bottom: 10px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 12px;
    line-height: 16px;
  `}
`

const ListContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`

const item = {
  avatar: 'https://peopletalk.ru/wp-content/uploads/2016/11/1480331127.jpg',
  name: 'Pat Black',
  price: 3600,
  time: dayjs('2020-05-31T22:06:29.561Z').format(`hh:mm`),
  date: dayjs('2020-05-31T22:06:29.561Z').format(`DD.MM.YYYY`)
}

export const IndividualSessions = () => (
  <Container>
    <Title>Индивидуальные сессии</Title>
    <ListContainer>
      <IndividualSessionItem data={item} />
    </ListContainer>
  </Container>
)
