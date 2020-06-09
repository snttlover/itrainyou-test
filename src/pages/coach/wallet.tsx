import dynamic from "next/dynamic"

const CoachWalletPage = dynamic(() => import("@/application/pages/coach/wallet/CoachWalletPage"), {
  ssr: false,
})

export default CoachWalletPage
