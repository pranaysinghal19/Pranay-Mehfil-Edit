-- UP
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID NOT NULL REFERENCES cities(id),
  name TEXT NOT NULL,
  address TEXT,
  accessibility_notes TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID NOT NULL REFERENCES cities(id),
  venue_id UUID REFERENCES venues(id),
  title TEXT NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('SOCIAL','SINGLES','TABLE','SUNDAYS','AFTER_DARK')),
  description TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  status TEXT NOT NULL DEFAULT 'DRAFT'
    CHECK (status IN ('DRAFT','PUBLISHED','LIVE','ENDED','CANCELLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at)
);

ALTER TABLE mehfil_cards
  DROP CONSTRAINT IF EXISTS fk_mehfil_cards_city;
ALTER TABLE mehfil_cards
  ADD CONSTRAINT fk_mehfil_cards_city FOREIGN KEY (city_id) REFERENCES cities(id);

CREATE TABLE IF NOT EXISTS staff_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  org_role TEXT NOT NULL
    CHECK (org_role IN ('ORG_ADMIN','TECH_ADMIN','OPS_FINANCE','CX_RESEARCH','CITY_OPS','STAFF')),
  status TEXT NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('INVITED','ACTIVE','SUSPENDED','REVOKED')),
  invited_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  invite_token_hash TEXT NOT NULL UNIQUE,
  org_role TEXT NOT NULL
    CHECK (org_role IN ('ORG_ADMIN','TECH_ADMIN','OPS_FINANCE','CX_RESEARCH','CITY_OPS','STAFF')),
  invited_by UUID NOT NULL REFERENCES users(id),
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_user_id UUID NOT NULL REFERENCES staff_profiles(user_id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  event_role TEXT NOT NULL
    CHECK (event_role IN ('EVENT_LEAD','MARSHAL','VOLUNTEER','HOST')),
  shift_start TIMESTAMPTZ NOT NULL,
  shift_end TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE','CANCELLED','COMPLETED')),
  UNIQUE(staff_user_id, event_id, event_role, shift_start),
  CHECK (shift_end > shift_start)
);

CREATE INDEX IF NOT EXISTS idx_events_city_start ON events(city_id, starts_at);
CREATE INDEX IF NOT EXISTS idx_staff_assignments_event ON staff_assignments(event_id);

-- DOWN
DROP TABLE IF EXISTS staff_assignments;
DROP TABLE IF EXISTS staff_invites;
DROP TABLE IF EXISTS staff_profiles;
ALTER TABLE mehfil_cards DROP CONSTRAINT IF EXISTS fk_mehfil_cards_city;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS cities;
