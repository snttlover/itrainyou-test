import * as React from "react"
import { AuthLayout } from "@/application/components/layouts/auth/AuthLayout"
import { WhiteContainer } from "@/application/pages/auth/common-components/WhiteContainer"
import { CenterFormContainer } from "@/application/pages/auth/common-components/CenterFormContainer"
import { RecoveryForm } from "@/application/pages/auth/pages/recovery/content/RecoveryForm"
import { RecoveryMessage } from "@/application/pages/auth/pages/recovery/content/RecoveryMessage"

export const RecoveryPage = () => (
  <AuthLayout>
    <CenterFormContainer>
      <WhiteContainer>
        {/*<RecoveryMessage/>*/}
        <RecoveryForm />
      </WhiteContainer>
    </CenterFormContainer>
  </AuthLayout>
)
