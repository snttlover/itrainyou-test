import { combine, createEvent, forward, guard, restore, sample } from "effector-root"
import { SessionRequest } from "@/lib/api/coach/get-sessions-requests"
import { Coach } from "@/lib/api/coach"
import { clientSessionRequests } from "@/feature/session-request/createSessionRequestsModule"
import { DenySessionRequestProblems } from "@/lib/api/coach/deny-session-request"

const reset = createEvent()

export const changeCurrentDenyCompletationRequest = createEvent<null | SessionRequest>()
const $currentDenyCompletationRequest = restore<null | SessionRequest>(
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

export const denyCompletationProblems: Problems = [
  {
    value: "COACH_ABSENT",
    label: "Коуч отсутствует",
  },
  {
    value: "COACH_INADEQUATE",
    label: "Неадекватный тренер",
  },
  {
    value: "OTHER",
    label: "Другое",
  },
]

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
    return (problemType !== null && problemType !== "OTHER") || (problemType === "OTHER" && !!problem)
  }
)
