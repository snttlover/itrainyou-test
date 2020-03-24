import { CouchHeader } from "@app/pages/auth/pages/signup/content/step-4/couch/CouchHeader"
import { CouchInformation } from "@app/pages/auth/pages/signup/content/step-4/couch/CouchInformation"
import { Step4CouchLayout } from "@app/pages/auth/pages/signup/content/step-4/couch/Step4CouchLayout"
import { $userData } from "@app/pages/auth/pages/signup/signup.model"
import * as dayjs from "dayjs"
import { useStore } from "effector-react"
import * as React from "react"

export const Step4Couch = () => {
  const userData = useStore($userData)
  const years = dayjs().diff(dayjs(userData.clientData?.birthDate, "YYYY-MM-DDDD"), "year")
  const sex = { M: "мужской", F: "женский" }[userData.clientData?.sex!]

  return (
    <Step4CouchLayout
      renderHeader={() => (
        <CouchHeader
          avatar={userData.clientData?.avatar!}
          fullName={`${userData.clientData?.firstName} ${userData.clientData?.lastName}`}
          years={years}
          sex={sex}
        />
      )}
    >
      <CouchInformation />
    </Step4CouchLayout>
  )
}
