import { ContentContainer } from "@/components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "@/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/feature/coach-placeholder/right-images/PhoneWithGirl"
import * as React from "react"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { useStore } from "effector-react/ssr"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { $coachHomeState } from "@/pages/coach/home/coach-home.model"
import { Loader } from "@/components/spinner/Spinner"
import { createSupportChatModel } from "@/pages/coach/support/support/create-support-chat.model"
import { getCoachChatMessages } from "@/lib/api/chats/coach/get-messages"
import { coachChatsSocket } from "@/feature/socket/chats-socket"
import { createSupportChat } from "@/pages/coach/support/support/SupportChat"
import { getCoachChat } from "@/lib/api/chats/coach/get-chat"

const features = ["Начать онлайн чат с агентом поддержки", "Решить возникшую проблему или уточнить интересующий вопрос"]

const coachSupportChatModel = createSupportChatModel({
  fetchMessages: getCoachChatMessages,
  socket: coachChatsSocket,
  fetchChat: () => getCoachChat('support'),
  type: "coach",
})

const SupportChat = createSupportChat(coachSupportChatModel)

export const CoachSupportPage = () => {
  const isUserDataLoading = useStore(getMyUserFx.pending)
  const state = useStore($coachHomeState)

  const showPlaceholder = !isUserDataLoading && state !== "approved"

  return (
    <CoachDashboardLayout>
      {!showPlaceholder && <SupportChat />}
      <ContentContainer>
        {isUserDataLoading && <Loader />}

        {showPlaceholder && <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />}
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachSupportPage
