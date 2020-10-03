import { date } from "#/lib/formatting/date"
import { newestParticipants } from "#/pages/coach/home/sessions/coach-sessions-page.model"

export const $newestParticipantsList = newestParticipants.data.$list.map(participants =>
  participants.map(participant => {
    const { client, session } = participant
    return {
      id: session.id,
      link: `/coach/sessions/${session.id}`,
      avatar: client.avatar,
      name: `${client.firstName} ${client.lastName}`,
      duration: `${session.durationType.slice(1, session.durationType.length)} мин`,
      time: date(session.startDatetime).format(`DD MMM HH:mm`),
    }
  })
)

export const $hasNewestParticipantsList = $newestParticipantsList.map(participantsList => !!participantsList.length)
