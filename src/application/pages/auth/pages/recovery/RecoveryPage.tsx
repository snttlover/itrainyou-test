import * as React from "react"
import { CenterFormContainer } from "@/application/pages/auth/components/CenterFormContainer"
import { RecoveryForm } from "@/application/pages/auth/pages/recovery/content/RecoveryForm"
import { RecoveryMessage } from "@/application/pages/auth/pages/recovery/content/RecoveryMessage"
import { $recoverySuccessMessageVisibility } from "@/application/pages/auth/pages/recovery/recovery.model"
import { useStore } from "effector-react"
import {WhiteMobileAuthContainer, WhiteMobileAuthLayout} from "@/application/pages/auth/pages/reset-password/common/StyledWhiteMobileAuthLayout"

export default () => {
  const showSuccessMessage = useStore($recoverySuccessMessageVisibility)
  return (
    <WhiteMobileAuthLayout>
      <CenterFormContainer>
        <WhiteMobileAuthContainer>
          { showSuccessMessage ? <RecoveryMessage/> : <RecoveryForm /> }
        </WhiteMobileAuthContainer>
      </CenterFormContainer>
    </WhiteMobileAuthLayout>
  )
}
