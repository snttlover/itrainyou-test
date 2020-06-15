import { date } from "@/application/lib/formatting/date"
import { $newestParticipants } from "@/application/pages/coach/home/sessions/coach-sessions-page.model"

export const $newestParticipantsList = $newestParticipants.map(participants =>
  participants.map(participant => {
    const { client, session } = participant
    return {
      avatar: client.avatar,
      name: `${client.firstName} ${client.lastName}`,
      duration: `${session.durationType.slice(1, session.durationType.length)} мин`,
      time: date(session.startDatetime).format(`DD MMM HH:mm`),
    }
  })
)

export const $hasNewestParticipantsList = $newestParticipantsList.map(participantsList => !!participantsList.length)
