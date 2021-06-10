import { combine, createEvent, createStore, forward, guard, restore, sample } from "effector-root"
import { SessionRequest } from "@/lib/api/coach/get-sessions-requests"
import { Coach } from "@/lib/api/coach"
import { clientSessionRequests } from "@/feature/session-request/createSessionRequestsModule"
import { DenySessionRequestProblems } from "@/lib/api/coach/deny-session-request"
import { TransActionProperties } from "@/lib/api/chats/clients/get-chats"

const reset = createEvent()

export const changeCurrentDenyCompletationRequest = createEvent<null | SessionRequest | TransActionProperties>()
const $currentDenyCompletationRequest = restore<null | SessionRequest | TransActionProperties>(
  changeCurrentDenyCompletationRequest,
  null
).reset(reset)

export const $denyCompletationDialogVisibility = $currentDenyCompletationRequest.map(request => !!request)

export const hideDenyCompletetionDialogVisibility = createEvent()

forward({
  from: hideDenyCompletetionDialogVisibility.map(() => null),
  to: changeCurrentDenyCompletationRequest,
})

export const sendDenyCompletationDialog = createEvent()

export const changeDenyCompletationProblem = createEvent<string>()
export const $denyCompletationProblem = restore(changeDenyCompletationProblem, "").reset(reset)

type Problems = {
  value: DenySessionRequestProblems
  label: string
}[]

export const changeCurrentDenyCompletationProblem = createEvent<DenySessionRequestProblems>()
export const $currentDenyCompletationProblem = restore<DenySessionRequestProblems>(
  changeCurrentDenyCompletationProblem,
  ""
).reset(reset)

export const changeDenyOptions = createEvent<"limited" | "unlimited">()
export const denyCompletationProblems = createStore<Problems>([
  {
    value: "COACH_ABSENT",
    label: "Коуч отсутствует",
  },
  {
    value: "COACH_INADEQUATE",
    label: "Некорректное поведение коуча",
  },
  {
    value: "TECHNICAL_ISSUES",
    label: "Технические проблемы",
  },
  {
    value: "CLIENT_WANTS_NEW_COACH",
    label: "Хочу выбрать другого коуча",
  },
  {
    value: "CLIENT_WANTS_DIFFERENT_WORKFLOW",
    label: "Мне нужен другой формат работы",
  },
  {
    value: "OTHER",
    label: "Другое",
  },
]).on(changeDenyOptions, (state, payload) =>
  payload === "limited" ? state.filter(element => element.value !== "CLIENT_WANTS_NEW_COACH" || "CLIENT_WANTS_DIFFERENT_WORKFLOW") : state)

sample({
  source: combine(
    $currentDenyCompletationRequest,
    $currentDenyCompletationProblem,
    $denyCompletationProblem,
    (req, problemType, problem) => {
      return {
        id: req?.id || 0,
        problem: problemType,
        problemText: problem
      }
    }
  ),
  clock: sendDenyCompletationDialog,
  target: clientSessionRequests.methods.deny,
})

export const $denyDialogRequestUser = $currentDenyCompletationRequest.map(req => {
  const user = req?.session.coach as Coach

  return {
    name: `${user?.firstName} ${user?.lastName}`,
    avatar: user?.avatar || null,
  }
})

export const $validDenyCompletationForm = combine(
  $currentDenyCompletationProblem,
  $denyCompletationProblem,
  (problemType, problem) => {
    return (!!problemType  && problemType !== "OTHER") || (problemType === "OTHER" && !!problem)
  }
)
