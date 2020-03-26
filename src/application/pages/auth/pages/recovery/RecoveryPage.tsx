import * as React from "react"
import { AuthLayout } from "@/application/components/layouts/auth/AuthLayout"
import { WhiteContainer } from "@/application/pages/auth/components/WhiteContainer"
import { CenterFormContainer } from "@/application/pages/auth/components/CenterFormContainer"
import { RecoveryForm } from "@/application/pages/auth/pages/recovery/content/RecoveryForm"
import { RecoveryMessage } from "@/application/pages/auth/pages/recovery/content/RecoveryMessage"
import { $recoverySuccessMessageVisibility } from "@/application/pages/auth/pages/recovery/recovery.model"
import { useStore } from "effector-react"

export const RecoveryPage = () => {
  const showSuccessMessage = useStore($recoverySuccessMessageVisibility)
  return (
    <AuthLayout>
      <CenterFormContainer>
        <WhiteContainer>
          { showSuccessMessage ? <RecoveryMessage/> : <RecoveryForm /> }
        </WhiteContainer>
      </CenterFormContainer>
    </AuthLayout>
  )
}
