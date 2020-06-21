import { FormItem } from "@/components/form-item/FormItem"
import { MediaRange } from "@/lib/responsive/media"
import styled from "styled-components"

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;

  ${MediaRange.greaterThan("mobile")`
    align-items: flex-end;
    flex-direction: row;
    color: #424242;
    
    ${FormItem} {
      width: 140px;
      margin-left: 12px;
      &:first-of-type {
        margin-left: 0;
      }
    }
  `};
`
