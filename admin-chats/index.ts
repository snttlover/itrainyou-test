import { fork, serialize } from "effector/fork"
import { root } from "effector-root"

const scope = fork(root)

;(window as any).INITIAL_STATE = serialize(scope)

import { createSupervisorChatApp } from "./src/supervisor-chat/createSupervisorChatApp";

(window as any).createSupervisorChat = createSupervisorChatApp
