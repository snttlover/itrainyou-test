import * as React from "react"
import ReactDOM from "react-dom"

let modalRoot!: HTMLDivElement
let nextRoot!: HTMLDivElement

export class Modal extends React.Component<{}, {}> {
  el!: HTMLDivElement
  constructor(props: {}) {
    super(props)

    if (process.env.BUILD_TARGET === "client") {
      if (!nextRoot) {
        nextRoot = document.getElementById("__next") as HTMLDivElement
        modalRoot = nextRoot.appendChild(document.createElement("div", {}))
        modalRoot && (modalRoot.className = "modal-root")
      }
      this.el = document.createElement("div")
    }
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  render() {
    if (!this.el) return null
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}
