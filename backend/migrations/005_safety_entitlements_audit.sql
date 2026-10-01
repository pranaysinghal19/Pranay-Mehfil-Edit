-- UP
CREATE TABLE IF NOT EXISTS safety_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id),
  reporter_id UUID REFERENCES users(id),
  subject_user_id UUID REFERENCES users(id),
  category TEXT NOT NULL,
  details TEXT,
  marshal_requested BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'OPEN'
    CHECK (status IN ('OPEN','ACKNOWLEDGED','RESOLVED','CLOSED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL
    CHECK (status IN ('ACTIVE','CANCEL_AT_PERIOD_END','CANCELLED','EXPIRED')),
  started_at TIMESTAMPTZ NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancelled_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_active_membership
ON memberships(user_id)
WHERE status IN ('ACTIVE','CANCEL_AT_PERIOD_END');

CREATE TABLE IF NOT EXISTS entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  membership_id UUID REFERENCES memberships(id),
  order_id UUID REFERENCES orders(id),
  event_id UUID REFERENCES events(id),
  type TEXT NOT NULL
    CHECK (type IN ('MONTHLY_EVENT','DRINK_TOKEN','PRIORITY_BOOKING','MEMBER_PRICING','INVITE_ONLY_ACCESS','EVENT_CREDIT')),
  status TEXT NOT NULL DEFAULT 'ISSUED'
    CHECK (status IN ('ISSUED','RESERVED','REDEEMED','RELEASED','EXPIRED','REFUNDED')),
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  reserved_at TIMESTAMPTZ,
  redeemed_at TIMESTAMPTZ,
  redemption_key TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id),
  user_id UUID NOT NULL REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  response JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

CREATE TABLE IF NOT EXISTS research_consents (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  email_followup BOOLEAN NOT NULL DEFAULT FALSE,
  phone_interview BOOLEAN NOT NULL DEFAULT FALSE,
  product_research BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  reason TEXT,
  request_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_actor_created ON audit_logs(actor_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_safety_event_status ON safety_requests(event_id, status);

-- DOWN
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS research_consents;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS entitlements;
DROP INDEX IF EXISTS uq_active_membership;
DROP TABLE IF EXISTS memberships;
DROP TABLE IF EXISTS safety_requests;
