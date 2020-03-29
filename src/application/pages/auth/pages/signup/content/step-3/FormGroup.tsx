import { FormItem } from "@/application/components/form-item/FormItem"
import { MediaRange } from "@/application/lib/responsive/media"
import styled from "styled-components"

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${MediaRange.greaterThan("mobile")`
    align-items: flex-end;
    flex-direction: row;
    
    ${FormItem} {
      width: 140px;
      margin-left: 12px;
      &:first-of-type {
        margin-left: 0;
      }
    }
  `};
`
