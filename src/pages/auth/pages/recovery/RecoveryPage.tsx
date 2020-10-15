import * as React from "react"
import { CenterFormContainer } from "@/pages/auth/components/CenterFormContainer"
import { RecoveryForm } from "@/pages/auth/pages/recovery/content/RecoveryForm"
import { RecoveryMessage } from "@/pages/auth/pages/recovery/content/RecoveryMessage"
import { $recoverySuccessMessageVisibility } from "@/pages/auth/pages/recovery/recovery.model"
import { useStore } from "effector-react"
import {
  WhiteMobileAuthContainer,
  WhiteMobileAuthLayout,
} from "@/pages/auth/pages/reset-password/common/StyledWhiteMobileAuthLayout"

export default () => {
  const showSuccessMessage = useStore($recoverySuccessMessageVisibility)
  return (
    <WhiteMobileAuthLayout>
      <CenterFormContainer>
        <WhiteMobileAuthContainer>
          {showSuccessMessage ? <RecoveryMessage /> : <RecoveryForm />}
        </WhiteMobileAuthContainer>
      </CenterFormContainer>
    </WhiteMobileAuthLayout>
  )
}
