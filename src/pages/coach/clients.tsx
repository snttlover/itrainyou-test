import dynamic from "next/dynamic"

const CoachClientsPage = dynamic(() => import("@/application/pages/coach/clients/CoachClientsPage"), {
  ssr: false,
})

export default CoachClientsPage
