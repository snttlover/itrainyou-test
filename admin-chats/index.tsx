import * as React from 'react-image-crop'
import ReactDom from 'react-dom'
import {Button} from "#/components/button/normal/Button"

const createSupervisorChat = (chatId: number, token: string) => {
  const appContainer = document.createElement('div')
  appContainer.setAttribute('id', 'supervisorChat')
  document.body.appendChild(appContainer)

  ReactDom.render(<Button>hello</Button>, appContainer)
}
