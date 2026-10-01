-- UP
CREATE TABLE IF NOT EXISTS live_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  join_code_hash TEXT,
  status TEXT NOT NULL DEFAULT 'CLOSED'
    CHECK (status IN ('CLOSED','OPEN','PAUSED','ENDED')),
  opened_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  opened_by UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS live_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_session_id UUID NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE','SUSPENDED','REMOVED','EXPIRED')),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(live_session_id, user_id)
);

CREATE TABLE IF NOT EXISTS connection_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_session_id UUID NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS connection_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_session_id UUID NOT NULL REFERENCES live_sessions(id),
  event_id UUID NOT NULL REFERENCES events(id),
  requester_id UUID NOT NULL REFERENCES users(id),
  recipient_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING','CONFIRMED','DECLINED','CANCELLED','EXPIRED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  CHECK (requester_id <> recipient_id),
  UNIQUE(live_session_id, requester_id, recipient_id)
);

CREATE TABLE IF NOT EXISTS connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id),
  user_a_id UUID NOT NULL REFERENCES users(id),
  user_b_id UUID NOT NULL REFERENCES users(id),
  created_from_request_id UUID REFERENCES connection_requests(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  removed_at TIMESTAMPTZ,
  CHECK (user_a_id <> user_b_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_connection_pair
ON connections (
  LEAST(user_a_id, user_b_id),
  GREATEST(user_a_id, user_b_id),
  event_id
)
WHERE removed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_connection_tokens_expiry ON connection_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_connection_requests_recipient ON connection_requests(recipient_id, status);

-- DOWN
DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS connection_requests;
DROP TABLE IF EXISTS connection_tokens;
DROP TABLE IF EXISTS live_access;
DROP TABLE IF EXISTS live_sessions;
