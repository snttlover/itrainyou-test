import styled from "styled-components"
import { Avatar } from "@/application/components/avatar/Avatar"
import { Icon } from "@/application/components/icon/Icon"

const Item = styled.div`
  display: table-row;
  height: 64px;
  & > * {
    display: table-cell;
    vertical-align: middle;
    border-bottom: 1px solid #EFEFEF;
  }
`

const StyledAvatar = styled(Avatar)`
  padding: 12px;
  width: 40px;
  height: 40px;
`

const Name = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #5B6670;
  margin-left: 8px;
  width: 40%;
`

const Cancel = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #9AA0A6;
  cursor: pointer;
`

const Ruble = styled(Icon).attrs({ name: `ruble` })`
  margin-left: 4px;
  width: 8px;
  height: 9px;
`

const Price = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 21px;
`

const Time = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #DBDEE0;
  margin-left: 39px;
`

const Date = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #9AA0A6;
  margin-left: 8px;
`

const AvatarWrapper = styled.div``

type IndividualSessionItemType = {
  data: {
    avatar: string,
    name: string,
    price: number,
    date: string // iso
  }
}

export const IndividualSessionItem = (props: IndividualSessionItemType) => (
  <Item>
    <AvatarWrapper>
      <StyledAvatar src={props.data.avatar} />
    </AvatarWrapper>
    <Name>{props.data.name}</Name>
    <Cancel>отмена</Cancel>
    <Price>
      {props.data.price}
      <Ruble />
    </Price>
    <Time>
      {props.data.date}
    </Time>
    <Date>
      {props.data.date}
    </Date>
  </Item>
)
