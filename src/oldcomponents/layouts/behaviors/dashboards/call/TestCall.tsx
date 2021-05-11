import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { Icon } from "@/oldcomponents/icon/Icon"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import { createSessionCallModule } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { useStore, useEvent } from "effector-react"
import { MediaRange } from "@/lib/responsive/media"
import { trackMouse } from "@/oldcomponents/mouse-tracking/track-mouse"
import { togglePermissionGrantedModal, changeModalInfo } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { NotCompatibleDialog } from "@/oldcomponents/layouts/behaviors/dashboards/call/NotCompatibleDialog"

export const createSessionCall = ($module: ReturnType<typeof createSessionCallModule>) => {

  return () => {
    return (
            <div></div>
    )
  }
}