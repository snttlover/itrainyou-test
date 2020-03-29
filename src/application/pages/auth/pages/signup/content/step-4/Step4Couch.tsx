import { CouchHeader } from "@/application/pages/auth/pages/signup/content/step-4/couch/CouchHeader"
import { CouchInformation } from "@/application/pages/auth/pages/signup/content/step-4/couch/CouchInformation"
import { Step4CouchLayout } from "@/application/pages/auth/pages/signup/content/step-4/couch/Step4CouchLayout"
import { step4CouchMounted } from "@/application/pages/auth/pages/signup/content/step-4/step-4-couch.model"
import { $userData } from "@/application/pages/auth/pages/signup/signup.model"
import dayjs from "dayjs"
import { useStore } from "effector-react"
import { useEffect } from "react"
import * as React from "react"

export const Step4Couch = () => {
  const userData = useStore($userData)
  const years = dayjs().diff(dayjs(userData.clientData?.birthDate, "YYYY-MM-DDDD"), "year")
  const sex = { M: "мужской", F: "женский" }[userData.clientData?.sex || "M"]

  useEffect(() => step4CouchMounted(), [])

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
