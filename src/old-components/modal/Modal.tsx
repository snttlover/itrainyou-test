import * as React from "react"
import ReactDOM from "react-dom"

let modalRoot!: HTMLDivElement

const createModalRoot = () => {
  if (process.env.BUILD_TARGET === "client") {
    const root = document.getElementById("root") as HTMLDivElement
    modalRoot = root.appendChild(document.createElement("div", {}))
    modalRoot.setAttribute("id", "modal-root")
  }
}

export class Modal extends React.Component<{}, {}> {
  el!: HTMLDivElement
  constructor(props: {}) {
    super(props)
    if (process.env.BUILD_TARGET === "server") return
    createModalRoot()
    this.el = document.createElement("div")
  }

  componentWillUnmount() {
    this.el.remove()
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  render() {
    if (!this.el) return null
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}
