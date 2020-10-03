import { ContentContainer } from "#/components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "#/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "#/feature/coach-placeholder/right-images/PhoneWithGirl"
import { $coachAccess } from "#/feature/user/user.model"
import { Wallet } from "#/pages/coach/wallet/Wallet"
import { useStore } from "effector-react/ssr"
import * as React from "react"
import { CoachDashboardLayout } from "#/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

const features = [
  "Смотреть историю изменения баланса кошелька",
  "Выводить заработанные деньги на банковскую карту",
  "Пополнять свой кошелек клиента",
]

export const CoachWalletPage = () => {
  const coachAccess = useStore($coachAccess)
  return (
    <CoachDashboardLayout>
      <ContentContainer>
        {coachAccess.isApproved ? (
          <Wallet />
        ) : (
          <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
        )}
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachWalletPage
