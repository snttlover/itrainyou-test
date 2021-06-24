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

  return () => {
    neighbour?.parentNode?.removeChild(script)
  }
}

export const JivoWidget: React.FunctionComponent<JivoWidgetProps> = ({ id }: JivoWidgetProps) => {
  const isLoggedIn = useStore($isLoggedIn)

  React.useEffect(() => {

    let unmount: (() => void) | undefined
    const onLoad = () => {
      unmount = mount(id)
    }

    if(!isLoggedIn) {
      const jivoTags = Array.from(document.getElementsByTagName("jdiv") as HTMLCollectionOf<HTMLElement>)
      if (jivoTags.length > 0) {
        jivoTags[0].style.display = "inherit"
      }

      if (document.readyState === "complete") {
        return mount(id)
      }

      window.addEventListener("load", onLoad)
    }

    if (isLoggedIn) {
      document.removeEventListener("load", onLoad)
      if (unmount) {
        unmount()
      }

      const jivoTags = Array.from(document.getElementsByTagName("jdiv") as HTMLCollectionOf<HTMLElement>)
      if (jivoTags.length > 0) jivoTags[0].style.display = "none"
    }

    return () => {
    }
  }, [isLoggedIn])

  return null
}

JivoWidget.displayName = "JivoWidget"
