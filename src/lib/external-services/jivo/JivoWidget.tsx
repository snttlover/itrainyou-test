import * as React from "react"
import { $isLoggedIn } from "@/feature/user/user.model"
import { useStore } from "effector-react"

export interface JivoWidgetProps {
  id: string;
}

const mount = (id: string) => {
  const script = document.createElement("script")

  script.type = "text/javascript"
  script.async = true
  script.src = `//code.jivosite.com/script/widget/${id}}`

  const neighbour = document.getElementsByTagName("script")[ 0 ]
  neighbour?.parentNode?.insertBefore(script, neighbour)

  return () => neighbour?.parentNode?.removeChild(script)
}

export const JivoWidget: React.FunctionComponent<JivoWidgetProps> = ({ id }: JivoWidgetProps) => {
  const isLoggedIn = useStore($isLoggedIn)

  React.useEffect(() => {
    let unmount: (() => void) | undefined
    const onLoad = () => unmount = mount(id)
    if(!isLoggedIn) {
      const jdiv = document.querySelector("body > jdiv")
      if (!!jdiv) jdiv.style.display = "block"
      if (document.readyState === "complete") mount(id)
      window.addEventListener("load", onLoad)
    } else {
      document.removeEventListener("load", onLoad)
      if (unmount) unmount()
      const jdiv = document.querySelector("body > jdiv")
      if (!!jdiv) jdiv.style.display = "none"
    }
  }, [isLoggedIn])

  return null
}

JivoWidget.displayName = "JivoWidget"
