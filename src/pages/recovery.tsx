import dynamic from "next/dynamic"
import React from "react"

const Recovery = dynamic(() => import("@/application/pages/auth/pages/recovery/RecoveryPage"), {ssr: false})

export default () => <Recovery />
