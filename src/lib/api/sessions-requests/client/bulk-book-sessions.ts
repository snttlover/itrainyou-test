import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

export interface BulkBookSessionsRequest {
  sessions: number[]
}
export interface BulkBookSessionsResponse {}

export const bulkBookSessions = (data: BulkBookSessionsRequest) =>
  post<BulkBookSessionsResponse, BulkBookSessionsRequest>(
    `${config.BACKEND_URL}/api/v1/web/client/session-requests/bulk-book/`,
    keysToSnake(data)
  )
    .then(response => response.data)
    .then(keysToCamel)
