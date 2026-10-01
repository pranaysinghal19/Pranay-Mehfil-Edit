export const SOCKET_EVENTS = {
  EVENT_LIVE_OPENED: 'event.live.opened',
  EVENT_LIVE_CLOSED: 'event.live.closed',
  EVENT_ANNOUNCEMENT: 'event.announcement',

  CONNECTION_REQUESTED: 'connection.requested',
  CONNECTION_CONFIRMED: 'connection.confirmed',
  CONNECTION_REMOVED: 'connection.removed',

  SAFETY_REQUEST_CREATED: 'safety.request.created',
  SAFETY_REQUEST_UPDATED: 'safety.request.updated',
  ATTENDEE_REMOVED: 'attendee.removed',
  LIVE_ACCESS_SUSPENDED: 'live.access.suspended',

  STAFF_ASSIGNMENT_UPDATED: 'staff.assignment.updated',
} as const;

export type SocketEventName =
  typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

export function eventRoom(eventId: string) {
  return 'event_' + eventId;
}

export function userRoom(userId: string) {
  return 'user_' + userId;
}

export function staffEventRoom(eventId: string) {
  return 'staff_event_' + eventId;
}
