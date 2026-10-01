const test = require('node:test');
const assert = require('node:assert/strict');

const { STAFF_PERMISSIONS } = require('../src/constants/roles');
const {
  canActOnEvent,
  roleHasPermission,
} = require('../src/authz/staffPermissions');

test('HOST is not an operational administrator', () => {
  assert.equal(
    roleHasPermission('HOST', STAFF_PERMISSIONS.LIVE_OPEN_CLOSE),
    false
  );
});

test('EVENT_LEAD can manage Live during assigned shift', () => {
  const assignment = {
    event_id: 'event-1',
    event_role: 'EVENT_LEAD',
    status: 'ACTIVE',
    shift_start: '2026-10-01T18:00:00.000Z',
    shift_end: '2026-10-02T02:00:00.000Z',
  };

  assert.equal(
    canActOnEvent({
      assignment,
      eventId: 'event-1',
      permission: STAFF_PERMISSIONS.LIVE_OPEN_CLOSE,
      now: new Date('2026-10-01T20:00:00.000Z'),
    }),
    true
  );
});

test('assignment does not grant access outside its event', () => {
  const assignment = {
    event_id: 'event-1',
    event_role: 'EVENT_LEAD',
    status: 'ACTIVE',
    shift_start: '2026-10-01T18:00:00.000Z',
    shift_end: '2026-10-02T02:00:00.000Z',
  };

  assert.equal(
    canActOnEvent({
      assignment,
      eventId: 'event-2',
      permission: STAFF_PERMISSIONS.EVENT_MANAGE,
      now: new Date('2026-10-01T20:00:00.000Z'),
    }),
    false
  );
});
