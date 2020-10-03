import { fork, serialize } from "effector/fork"
import { root } from "effector-root"

const scope = fork(root)

;(window as any).INITIAL_STATE = serialize(scope)

import { createSupervisorChatApp } from "./src/supervisor-chat/createSupervisorChatApp";

(window as any).createSupervisorChat = createSupervisorChatApp

createSupervisorChatApp(
  205,
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmFkbWluIiwiZXhwIjoxNjAxNTg1MzkyLCJlbWFpbCI6ImFkbWluQGFkbWluLmFkbWluIiwicGFzc3dvcmRfY2hlY2siOiI0YjMxZTczOWQ2ZDM0NDVkZGQwMDhlYmMwMDkxNzcxNzgzOThlNjBlNzhlNjYzMjYxYjUyN2QxMmI3YjE2OTQ4In0.OpomupR6D6x1QJHB378X6g2FXTkWL5oUuvV3gK7K2po"
)
