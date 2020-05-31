import styled from "styled-components"
import { Avatar } from "@/application/components/avatar/Avatar"
import { Icon } from "@/application/components/icon/Icon"
import { MediaRange } from "@/application/lib/responsive/media"

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #EFEFEF;
  padding: 12px 0;
  padding-right: 16px;
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-left: 16px;
  
  ${MediaRange.lessThan(`mobile`)`
    width: 24px;
    height: 24px;
  `}
`

const Name = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #5B6670;
  margin-left: 8px;
  width: 40%;
  flex: 1;
  
  
  ${MediaRange.lessThan(`mobile`)`
    font-size: 14px;
    line-height: 18px;
    margin-left: 4px;
  `}  
`

const Cancel = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #9AA0A6;
  cursor: pointer;
  ${MediaRange.lessThan(`mobile`)`
    align-self: flex-end;
    font-size: 12px;
    line-height: 16px;
  `}
`

const Ruble = styled(Icon).attrs({ name: `ruble` })`
  margin-left: 4px;
  width: 15px;
  height: 15px;
  margin-bottom: -2px;
`

const Price = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 21px;
  
  ${MediaRange.lessThan(`mobile`)`
    font-size: 12px;
    line-height: 16px;
  `}
`

const Time = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #DBDEE0;
  margin-left: 39px;
  ${MediaRange.lessThan(`mobile`)`
    display: none;
  `}
`

const Date = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #9AA0A6;
  margin-left: 8px;
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 8px;
    font-size: 12px;
    line-height: 16px;
  `}
`

const RightMobileGroup = styled.div`
  display: flex;
  align-items: center;
  ${MediaRange.lessThan(`mobile`)`
    flex-direction: column;
    align-items: flex-end;  
  `}
`


type IndividualSessionItemType = {
  data: {
    avatar: string,
    name: string,
    price: number,
    time: string,
    date: string // iso
  }
}

export const IndividualSessionItem = (props: IndividualSessionItemType) => (
  <Item>
    <StyledAvatar src={props.data.avatar} />
    <Name>{props.data.name}</Name>
    <Cancel>отмена</Cancel>
    <RightMobileGroup>
      <Price>
        {props.data.price}
        <Ruble />
      </Price>
      <Time>
        {props.data.time}
      </Time>
      <Date>
        {props.data.date}
      </Date>
    </RightMobileGroup>
  </Item>
)
