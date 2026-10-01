const { query } = require('../db/pool');

async function writeAuditLog({
  actorUserId,
  action,
  resourceType,
  resourceId = null,
  reason = null,
  requestId = null,
  metadata = {},
}) {
  const result = await query(
    `INSERT INTO audit_logs
      (actor_user_id, action, resource_type, resource_id, reason, request_id, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
     RETURNING id, created_at`,
    [
      actorUserId,
      action,
      resourceType,
      resourceId,
      reason,
      requestId,
      JSON.stringify(metadata),
    ]
  );

  return result.rows[0];
}

module.exports = { writeAuditLog };
