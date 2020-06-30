import * as React from "react"
import ReactDOM from "react-dom"

if (process.env.BUILD_TARGET === "client") {
  let root: HTMLDivElement = document.getElementById("root") as HTMLDivElement
  let modalRoot: HTMLDivElement = root.appendChild(document.createElement("div", {}))
  modalRoot.setAttribute("id", "modal-root")
}

export class Modal extends React.Component<{}, {}> {
  el!: HTMLDivElement
  constructor(props: {}) {
    super(props)
    this.el = document.createElement("div")
  }

  componentWillUnmount() {
    document.getElementById("modal-root")?.removeChild(this.el)
  }

  componentDidMount() {
    document.getElementById("modal-root")?.appendChild(this.el)
  }

  render() {
    if (!this.el) return null
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}
