import { date } from "@/lib/formatting/date"
import { newestParticipants } from "@/pages/coach/home/sessions/coach-sessions-page.model"

export const $newestParticipantsList = newestParticipants.data.$list.map(participants =>
  participants.map(participant => {
    const { client, session } = participant
    return {
      id: session.id,
      aboutLink: `/coach/sessions/${session.id}`,
      avatar: client.avatar,
      startDatetime: participant.session.startDatetime,
      endDatetime: participant.session.startDatetime,
      name: `${client.firstName} ${client.lastName}`,
    }
  })
)

export const $hasNewestParticipantsList = $newestParticipantsList.map(participantsList => !!participantsList.length)
