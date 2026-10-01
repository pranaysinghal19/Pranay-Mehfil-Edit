const { EVENT_ROLES, STAFF_PERMISSIONS } = require('../constants/roles');

const ROLE_PERMISSIONS = Object.freeze({
  [EVENT_ROLES.HOST]: [
    STAFF_PERMISSIONS.EVENT_READ,
  ],
  [EVENT_ROLES.VOLUNTEER]: [
    STAFF_PERMISSIONS.EVENT_READ,
    STAFF_PERMISSIONS.CHECKIN_SCAN,
  ],
  [EVENT_ROLES.MARSHAL]: [
    STAFF_PERMISSIONS.EVENT_READ,
    STAFF_PERMISSIONS.SAFETY_READ,
    STAFF_PERMISSIONS.SAFETY_RESPOND,
    STAFF_PERMISSIONS.LIVE_SUSPEND_USER,
    STAFF_PERMISSIONS.ATTENDEE_REMOVE,
  ],
  [EVENT_ROLES.EVENT_LEAD]: Object.values(STAFF_PERMISSIONS),
});

function isShiftActive(assignment, now = new Date()) {
  if (!assignment || assignment.status !== 'ACTIVE') return false;
  const time = new Date(now).getTime();
  return (
    time >= new Date(assignment.shift_start).getTime() &&
    time <= new Date(assignment.shift_end).getTime()
  );
}

function roleHasPermission(eventRole, permission) {
  return (ROLE_PERMISSIONS[eventRole] || []).includes(permission);
}

function canActOnEvent({ assignment, eventId, permission, now = new Date() }) {
  if (!assignment) return false;
  if (String(assignment.event_id) !== String(eventId)) return false;
  if (!isShiftActive(assignment, now)) return false;
  return roleHasPermission(assignment.event_role, permission);
}

module.exports = {
  ROLE_PERMISSIONS,
  isShiftActive,
  roleHasPermission,
  canActOnEvent,
};
