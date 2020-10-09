
export const ContainerId = ((i) => () => i++)(0)
export const createAdminChatContainer = () => {
  const appContainer = document.createElement("div")
  appContainer.setAttribute("id", `admin-chat-${ContainerId()}`)
  document.body.appendChild(appContainer)
  return appContainer
}
